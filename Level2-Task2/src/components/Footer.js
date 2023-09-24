import React from 'react'
import './Footer.css'
import {FaFacebookF} from 'react-icons/fa'
import {RiInstagramFill} from 'react-icons/ri'
import {ImLinkedin2} from 'react-icons/im'
import {FaTwitter} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <div className='footer-wrapper'>
        <h3>JOB BOARD</h3>
        <p>lorem10</p>
        <div className='social-media'>
          <a href='#'><FaFacebookF/></a>
          <a href='#'><RiInstagramFill/></a>
          <a href='#'><ImLinkedin2/></a>
          <a href='#'><FaTwitter/></a>
        </div>
      </div>
      <div className='footer-wrapper'>
        <h4>Explore</h4>
        <a href='#'>Top Companies</a>
        <a href='#'>Terms of Services</a>
        <a href='#'>Careers</a>
      </div>
      <div className='footer-wrapper'>
        <h4>About</h4>
        <a href='#'>FAQ</a>
        <a href='#'>Get Inspired</a>
        <a href='#'>Blog</a>
      </div>
      <div className='footer-wrapper'>
        <h4>Support</h4>
        <a href='#'>Customer Services</a>
        <a href='#'>Trust & Safety</a>
        <a href='#'>Partnership</a>
      </div>
      <div className='footer-wrapper'>
        <h4>Community</h4>
        <a href='#'>Community</a>
        <a href='#'>Invite a Friend</a>
        <a href='#'>Event</a>
      </div>
    </footer>
  )
}

export default Footer