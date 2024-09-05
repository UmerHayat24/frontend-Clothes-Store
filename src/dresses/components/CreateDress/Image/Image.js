import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Image as ImageRB } from 'react-bootstrap';
import "./Image.css";

let downloadedImg
function imageReceived() {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
  
    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;
  
    context.drawImage(downloadedImg, 0, 0);
  
    try {
      localStorage.setItem("saved-image-example", canvas.toDataURL("image/png"));
    }
    catch(err) {
      console.log("Error: " + err);
    }
  }
function startDownload(imageURL) {
  
    downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", imageReceived, false);
    downloadedImg.src = imageURL;
  }
const Imager = (props) => {
    startDownload(props.uri)
    let image
    try {
        image = localStorage.getItem("saved-image-example")
    } catch (error) {
        
    }
    return (
        <Fragment>
            <Col className="image__choice" onClick={props.clicked} xs={3}>
                <ImageRB className="d-block w-100"  value={image} src={image} alt={props.name} thumbnail/>
                    <p>{props.name}</p>
                    <p>Rs. {props.price}</p>
            </Col>
        </Fragment>
    );
};

export default Imager;