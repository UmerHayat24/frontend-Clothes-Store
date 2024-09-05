import React, { useEffect, Fragment } from 'react';

import Card from '../../shared/components/UIElements/Card';
import DressItem from './DressItem';
import Button from '../../shared/components/FormElements/Button';
import './DressList.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Spinner from '../../shared/components/UIElements/Spinner';

const DressList = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();




  if (props.items.length === 0) {
    return (
      <div className="dress-list center">
        <Card>
          <h2>No dresss found. Maybe create one?</h2>
          <Button to="/dresses/new">Create dress</Button>
        </Card>
      </div>
    );
  }
  const deleteHandler=async (dressId)=>{
    console.log('DELETING...');
    console.log(dressId)
    try{
      const response=await sendRequest(`dress/user/delete/${dressId}`,'DELETE')
      console.log(response)
    }catch(error){

    }

    // console.log("Deleted Successfully")

  }
  let component;
  if(isLoading){
    component=<Spinner asOverlay/>
  }else{
    component=(
      <ul className="dress-list">
      {props.items.map(dress => (
        <DressItem
          key={dress.id}
          id={dress.id}
          image={dress.image}
          title={dress.name}
          creatorId={dress.creator}
          delete={(id)=>deleteHandler(id)}
        />
      ))}
    </ul>
      )
  }

  return (
    <Fragment>
<ErrorModal error={error} onClear={clearError}/>
{component}


    </Fragment>

  );
};

export default DressList;
