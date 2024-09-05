import React, { useContext, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DressList from '../components/DressList';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Spinner from '../../shared/components/UIElements/Spinner';
const DUMMY_DRESS=[
    {
        id:"d1",
        name:"Kurti Froc",
        image:"",
        userId:"u1",

    },
    {
        id:"d2",
        name:"Kurti Froc",
        image:"",
        userId:"5eee2133c54b725edb7daa6c",

    }
]
const UserDress =(props) => {
    
    const userId = useParams().userId;
    const auth = useContext(AuthContext);
    const [dress,setDressList]=useState([])
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    let response,loadeddresss;

    useEffect(()=>{

      const fetchDresses=async()=>{
        try {
            const responseData=await sendRequest(`dress/dresses/${userId}`)

            setDressList(responseData.dresses)
        } catch (err) {

        }

    };
    fetchDresses();

    },[])


  //if(response)
  //console.log(response)
  let component;
  if(isLoading){
    component=<Spinner asOverlay/>
  }else{
    component=<DressList items={dress} />
  }
  return (
    <Fragment>
<ErrorModal error={error} onClear={clearError}/>
{component}

    </Fragment>  
  );
};

export default UserDress;