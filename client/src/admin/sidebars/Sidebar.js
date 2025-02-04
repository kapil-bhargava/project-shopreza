import React, { useEffect, useState } from 'react'
import Adminsidebar from './Adminsidebar'
import Managersidebar from './Managersidebar'
import Deliveryboysidebar from './Deliveryboysidebar'
import Distributorsidebar from './Distributorsidebar'
import { useCookies } from 'react-cookie'
import Validate from '../../Validate'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const [cookie, createcookie, removecookie] = useCookies();
  const [pdata,setpdata]=useState([]);
  const [ename,setename]=useState();
  const [storename,setstorename]=useState();
  const jump = useNavigate();

  const GetProfile=async()=>{
    const response = await fetch(process.env.REACT_APP_URL+"/empsignupapi.php", {
      method: 'PATCH',
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        mobileno: cookie.empCookie
      })
    });
    const data = await response.json();
    setename(data[0].name);
    setstorename(data[0].storename);
  }

  useEffect(()=>{
    if(cookie["utype"]==null || cookie["utype"]=="undefined"){
      jump("/emplogin");
  }
  },[])
    
  
    if (cookie["utype"] == "admin") {
      return <Adminsidebar />;
    }
    else if (cookie["utype"] == "manager") {
      return <Managersidebar name={ename} storename={storename} />;
    }
    else if (cookie["utype"] == "distributor") {
      return <Distributorsidebar name={ename} storename={storename} />;
    }
    else{
      return <Deliveryboysidebar name={ename} storename={storename} />;
    }

}

export default Sidebar