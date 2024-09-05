import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth=()=>{
    const [token, setToken] = useState();     //Will be changed to false
const [tokenExpire,setTokenExpire]=useState();
const [userId,setUserId]=useState(null);
const [imgId,setImgId]=useState(null);



const login = useCallback((uId,imgId,token,expireTime) => {
  setToken(token);
  setUserId(uId);
  setImgId(imgId);
  const tokenExpireTime=expireTime || new Date(new Date().getTime()+1000*60*60);
  setTokenExpire(tokenExpireTime);
  localStorage.setItem(
    'userData',
    JSON.stringify({userId:uId,imgId:imgId,token:token,expires:tokenExpireTime.toISOString()})
  );
}, []);

const logout = useCallback(() => {
  setToken(null);
  setTokenExpire(null);
  setUserId(null);
  setImgId(null);
  localStorage.removeItem('userData');

}, []);
useEffect(()=>{
  if(token && tokenExpire){
    const remainingTime=tokenExpire.getTime()-new Date().getTime();
    logoutTimer=setTimeout(logout,remainingTime);
  }else{
    clearTimeout(logoutTimer);
  }
},[token,logout,tokenExpire]);


useEffect(()=>{
  const storedData=JSON.parse(localStorage.getItem('userData'));
  if(storedData && storedData.token && new Date(storedData.expires) > new Date()){
    login(storedData.userId,storedData.imgId,storedData.token,new Date(storedData.expires))
  }
},[login]);
    return {token,login,logout,userId,imgId};
}
