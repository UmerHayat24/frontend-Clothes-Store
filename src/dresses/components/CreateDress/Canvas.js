import React, { Fragment, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "./Canvas.css";

const Canvas = (props) => {
    const fileInput=useRef();
    const fileSelectHandler=()=>{
        fileInput.current.click();
    }
    return (
        <Fragment>
            <Container className="canva__container" fluid >
            <Row style={{marginBottom:"1rem"}}>
                <Col>
                    <div className="canva" >
                        <canvas id='c'/>
                    </div>
                </Col>
            </Row>
            <Row>
                
            </Row>
            <Row>
                <Col>
                <Button disabled={props.disabled} variant="danger" onClick={props.removeFile}>Remove</Button>
                </Col>
                <Col>


                <input
                type="file"
                style={{display:"none"}} 
                ref={fileInput}
                onChange={props.openFile}
                accept=".jpg,.jpeg,.png"
                />
                <div 
                    className="canva-input-btn"
                    >
                    <Button 
                    variant="primary" onClick={fileSelectHandler}>Choose File</Button>

                </div>
                

                </Col>
            </Row>

        </Container>
        </Fragment>
    );
};

export default Canvas;