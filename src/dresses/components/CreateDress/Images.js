import React, { Fragment, useEffect, useState } from 'react';
import Imager from './Image/Image';
import { Container, Row } from 'react-bootstrap';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import Spinner from '../../../shared/components/UIElements/Spinner';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import "./Images.css";


const Images =(props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

        const [imageList,setImageList]=useState()

        useEffect(()=>{
            const fetchImages=async()=>{
                try {
                    const responseData=await sendRequest('dress/getAllCloths')

                    setImageList(responseData.clothes)
                } catch (err) {

                }

            };
            fetchImages();
        },[sendRequest]);
    

        //console.log(imageList)
    const image=(
        
        <Fragment>
            
            {imageList && imageList.map((ele,i)=>{
                return <Imager clicked={()=>props.clicked(ele.cloth.image)} uri={ele.cloth.image} price={ele.cloth.price} name={ele.cloth.name} key={i}/>
        })}

        </Fragment>

        
    )
    return (
        <Fragment>
        <ErrorModal error={error} onClear={clearError}/>


            <Container fluid className="images_container">
        {isLoading && <Spinner asOverlay/>}

            <Row>
            {image}

            </Row>
        </Container>

        </Fragment>


    );
};

export default Images;