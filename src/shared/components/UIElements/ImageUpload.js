import React, { useRef,useState, useEffect } from 'react';
import Button from "../FormElements/Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
    const [file,setFile]=useState(null);
    const [preview,setPreview]=useState();
    const [isValid,setIsValid]=useState()

    const filePickerRef=useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader=new FileReader();
        fileReader.onload=()=>{
            setPreview(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file])

    const pickedHandler=(event)=>{
        let pickedFile;
        let fileIsValid=isValid;
        if(event.target.files || event.target.files.length ===1){
            pickedFile=event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid=true;
        }else{
            setIsValid(false);
            fileIsValid=false;

        }
        props.onInput(props.id,pickedFile,fileIsValid)
        // console.log(event.target);
    }

    const pickImageHandler=()=>{
        filePickerRef.current.click();
    };
    return (
        <div className="form-style">
            <input 
                ref={filePickerRef}
                id={props.id} 
                style={{display:"none"}} 
                type="file" 
                accept=".jpg,.jpeg,.png"
                onChange={pickedHandler}
                />
            <div className={`imag-upload ${props.center && 'center'}`}>
                <div className="imag-upload__preview">
                    {preview && <img src={preview} alt="Preview"/>}
                    {!preview && <p>Please pick an image</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>{props.name}</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
            
        </div>
    );
};

export default ImageUpload;