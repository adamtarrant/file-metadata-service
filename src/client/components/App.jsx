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
        this.handleFileChange = this.handleFileChange.bind(this);
      }
      
      handleFileChange(event) {         
          this.setState({
                fileOutput: this.state.fileOutput,
                fileToUpload: event.target.value.split('\\').pop()
          });
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
        let relUrl = '/uploadfile';

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
        <div className="main-container">
          <div className="form-output-container">
            <form className="upload-form" type="multipart/form-data" onSubmit={this.handleFileUpload}>
                <input type="file" id="fileInput" onChange={this.handleFileChange}/>
                <label className={this.state.fileToUpload !== null ? "expanded-button" : ""} for="fileInput"><i class="fas fa-file"></i>Choose file</label>
                <p className={this.state.fileToUpload !== null ? "expanded" : ""}>{this.state.fileToUpload}</p>
                <button className={this.state.fileToUpload == null ? "button-disabled" : "expanded-button"} type="submit"><i class="fas fa-upload"></i>Upload</button>
            </form>
            </div>
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
           <div className={this.props.fileOutput !== null ? "output output-expanded" : "output"}> 
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
      <div className="main-container">
          <h1>File Metadata Service</h1>
          <FileUploader />
          <Footer />
      </div>
      );
  }
}