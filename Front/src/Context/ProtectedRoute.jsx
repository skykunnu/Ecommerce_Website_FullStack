/* eslint-disable react/prop-types */
import {useEffect, useState} from "react"
import instance from "../axiosConfig"
import Loader from "../Components/Loader";
import {Navigate} from "react-router-dom"


function ProtectedRoute({children}) {
const [allowed, setAllowed]=useState(false);
const [loading, setLoading]=useState(true);


useEffect(()=>{
  fetchAllowedStatus();  
}, [])

async function fetchAllowedStatus(){
  try{
    setLoading(true)
    if(children.props.destination.startsWith("user/"))
    await instance.get('/auth/check',{withCredentials: true});
  else await instance.get('/admin/check',{withCredentials: true});
    setAllowed(true)
  }catch(error){
    console.log(error)
    setLoading(false)
    setAllowed(false)
  }finally{
    setLoading(false)
  }
}
if(loading) return <Loader />

  return allowed ? (children) : (<Navigate to={"/"+children.props.destination} replace  />);
}

export default ProtectedRoute;