import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div className='contact'>
        <div className="contact-left">
            <h1>Get in touch</h1>
            <p>Subscribte to stay updated</p>
            <p>contact@gmail.com</p>
        </div>
        <div className="contact-right">
            {/* <h3>Subscribe</h3> */}
            <input type="text" placeholder='your email here'/>
            <button>Subscribe</button>
        </div>
        
    </div>
  )
}

export default Contact