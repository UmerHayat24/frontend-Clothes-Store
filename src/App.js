import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

// import Home from './User/pages/Home';
// import CreateDress from './dresses/pages/CreateDress';
// import UserDress from './dresses/pages/UserDress';
// import UpdateDress from './dresses/pages/UpdateDress';
// import Auth from './User/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Spinner from './shared/components/UIElements/Spinner';



const Home=React.lazy(()=>import('./User/pages/Home'));
const Auth=React.lazy(()=>import('./User/pages/Auth'));
const UpdateDress=React.lazy(()=>import('./dresses/pages/UpdateDress'));
const UserDress=React.lazy(()=>import('./dresses/pages/UserDress'));
const CreateDress=React.lazy(()=>import('./dresses/pages/CreateDress'));


const App = () => {
  const {token,login,logout,userId,imgId}= useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/:userId/dresses" exact>
          <UserDress />
        </Route>
        <Route path="/dresses/new" exact>
          <CreateDress />
        </Route>
        <Route path="/dresses/:dressId">
          <UpdateDress />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ 
        isLoggedIn: !!token,
        token:token,
        userId:userId,
        imgId:imgId, 
        login: login, 
        logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main><Suspense fallback={<div className="center">{<Spinner/>} </div>}>{routes}</Suspense></main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
