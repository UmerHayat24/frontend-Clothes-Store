import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { Redirect } from 'react-router';

const Home = (props) => {
    const auth = useContext(AuthContext);
    let home;
    if(auth.isLoggedIn && auth.userId){
        home=<Redirect to={`/${auth.userId}/dresses`}></Redirect>
    }else{
        home=<h1>Home Page</h1>
    }

    return (
        <div>
            {home}
        </div>
    );
};

export default Home;