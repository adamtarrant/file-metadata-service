import React, { Component } from 'react';

export default class Footer extends Component {
    constructor(props){
        super(props)
    }
    

    
    render(){
    const styles = {
        position: "fixed",
        bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "10vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "#fff",
            fontSize: "1.2em"
            };
            
        return (
            <footer className="footer" style={styles}>
                API developed by Adam Tarrant - {'\u00A9'} 2018
            </footer>
            
            );
    }
}