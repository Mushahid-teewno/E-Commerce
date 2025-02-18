import React from 'react'
import '../pages/css/LoginSingup.css'
import loginimg from '../assets/download.jpg'
import { useState } from 'react'

const LoginSignup = () => {
  const [page, setPage] = useState('Sign Up')
  const [fieldData, setFieldData] = useState({
    name:"",
    email:"",
    password:""
  });

  const signUp =async ()=>{
    let response;
    await fetch('http://localhost:3000/signup',{
      method:'POST',
      headers:{
        accept:'application/json',
        'content-type':'application/json'
      },
      body:JSON.stringify(fieldData),
    }).then(res => res.json())
    .then(res=>response= res)
    if (response.success && response.token) {
      localStorage.setItem('authToken', response.token);
      alert(response.message)
      window.location.replace('/');
    } 

  }
  const logIn =async ()=>{
    let response;
    console.log(fieldData)
    await fetch('http://localhost:3000/signin',{
      method:'POST',
      headers:{
        accept:'application/json',
        'content-type':'application/json'
      },
      body:JSON.stringify(fieldData),
    }).then(res => res.json())
    .then(res=>response=res)
    .catch(err=>console.log(err))
    
    
    if (response.success && response.token) {
      localStorage.setItem('authToken', response.token);
      alert(response.message)
      window.location.replace('/');
    } 

  }

  const handleChange = (event) => {
    setFieldData({ ...fieldData, [event.target.name]: event.target.value })
  }

  return (
    <div className='loginSignup'>
      <div className='login-page'>
        <div className="image">

        </div>
        <div className="form">
          <h1>{page}</h1>
          {page === 'Sign Up' ? <input onChange={handleChange} value={fieldData.name} type="text" name="name" id="" placeholder='username' /> : <></>}

          <input value={fieldData.email} onChange={handleChange}  type="email" name="email" id="" placeholder='email' />
          <input value={fieldData.password} onChange={handleChange} name='password'  type="password" placeholder='password' />
          <button onClick={() => { page === "Sign Up" ? signUp() : logIn() }}>Continue</button>
          {page === "Sign Up" ? <p>Already have an account? <span style={{cursor:"pointer"}} onClick={() => { setPage("login") }} >login here</span></p>
            : <p>Don't have an account? <span style={{cursor:"pointer"}} onClick={()=>{setPage("Sign Up")}}>create here</span></p>}


          <div className="checkbox">
            <input className='check' type="checkbox" />
            <p>By continuing,I agree to the terms of use and privacy policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup