import React from 'react'
import '../pages/css/LoginSingup.css'
import loginimg from '../assets/download.jpg'

const LoginSignup = () => {
  return (
    <div className='loginSignup'>
      <div className='login-page'>
        <div className="image">

        </div>
        <div className="form">
          <h1>Login</h1>
          <input type="email" name="" id="" placeholder='email' />
          <input type="password" placeholder='password' />
          <button>Continue</button>
          <p>Don't have an account? <span>create here</span></p>
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