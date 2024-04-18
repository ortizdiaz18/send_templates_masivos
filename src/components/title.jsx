import React from "react";
import '../styles/title.css'

function Title(){
    return(
        <div className="container-title">
            <img className="image-logo" src={require("../img/logo.jpeg")} alt="logo.jpg"/>
            <h1 className="title">ENVIO MASIVO</h1>
        </div>
    )
}

export default Title