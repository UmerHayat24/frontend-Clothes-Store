import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import "./Utility.css";

const Utility = (props) => {
    //console.log(props.download)
    return (
        <Fragment>
            <div className="util__container">
            <ul className="util__item">
                <li><Button 
                        
                        href={props.download}
                                    //color="transparent"
                        target="_blank"
                        variant="success" 
                        disabled={props.downDis} 
                        download>DOWNLOAD</Button></li>
                <li><Button 
                         
                        onClick={props.save}  
                        disabled={props.disabled}
                        >SAVE</Button></li>
            </ul>

            </div>
            
        </Fragment>
    );
};

export default Utility;