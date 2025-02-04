import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

const Validate = () => {
    const [cookie,createcookie,removecookie]=useCookies();
    const jump=useNavigate();
    
}

export default Validate