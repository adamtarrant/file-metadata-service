import React, { Component } from 'react';
import Footer from './Footer.jsx';


class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileOutput: null,
            fileToUpload: null
        };
        this.handleFileUpload = this.handleFileUpload.bind(this);
      }
      
      handleFileUpload(event) {
        event.preventDefault();
        const fileInput = document.getElementById('fileInput');
        console.log(fileInput.files[0]);

        let formData = new FormData();
        formData.append('file', fileInput.files[0]);

        let options = {
            method: 'post',
            body: formData
        };
        let relUrl = 'http://localhost:8080/uploadfile'

        fetch(relUrl, options)
        .then(response => response.text())
        .then(data => {
            this.setState({
                fileOutput: JSON.parse(data),
                fileToUpload: this.state.fileToUpload
            });
            
        })
        .catch(error => console.log('error is', error));
      }
      
      render() {
        return (
          <div>
            <form type="multipart/form-data" onSubmit={this.handleFileUpload}>
                <input type="file" id="fileInput" />
                <button type="submit">Upload</button>
            </form>
            <FileOutput fileOutput={this.state.fileOutput}/>
          </div>
          );
      }
}



class FileOutput extends Component {
    constructor(props) {
        super(props);
      }

      render() {
        return (
           <div> 
          {this.props.fileOutput !== null && <pre>{JSON.stringify(this.props.fileOutput, null, '\t')}</pre>}
          </div>
          );
      }

}



export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
          <h1>File Metadata Service</h1>
          <FileUploader />
          <Footer />
      </div>
      );
  }
}