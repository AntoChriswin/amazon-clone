import React, { useState } from 'react'
import { Link , useNavigate  } from 'react-router-dom';
import './Login.css';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
    const navigate = useNavigate();
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const signin =(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
            .then(()=> {
                navigate('/');
            })
            .catch(error => alert(error.message));
    }

    const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/"); // redirect after registration
      })
      .catch((error) => alert(error.message));

    }

  return (
    <div className='login'>
        <Link to = '/'>
            <img className='login_logo' src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt=""></img>
        </Link>
        
        <div className='login_container'>
            <h1>Sign in</h1>
            <form className='login_form'>
                <h5>E-mail</h5>
                <input type='text' value = {email} onChange={e => setEmail(e.target.value)}></input>

                <h5>password</h5>
                <input type='password' value = {password} onChange={e => setPassword(e.target.value)}></input>

                <button className='login_siginbutton' onClick={signin}>Sign In</button>
            </form>
            <p>By continuing, you agree to Amazon's Clone Conditions of Use and Privacy Notice.</p>

            <button className='login_registerbutton' onClick={register}>Create your Amazon Account</button>
        </div>
    </div>
  )
}

export default Login