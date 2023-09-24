import React from 'react'
import './Companies.css'
import pic1 from '../assests/Ebay.png'
import pic2 from '../assests/amazon.png'
import pic3 from '../assests/google.png'
import pic4 from '../assests/system.png'
import pic5 from '../assests/folio3.png'
import pic6 from '../assests/10pearls.png'
import pic7 from '../assests/tesla.png'
import pic8 from '../assests/gateway.png'

const Companies = () => {
  return (
    <section className='featured' id='companies'>
        <h1 className='section-title'>Featured Companies</h1>
        <p>lorem10</p>
        <div className='featured-wrapper'>
            <div className='featured-card'>
                <img className='featured-image' src={pic1}></img>
                <p>Ebay</p>
            </div>
            <div className='featured-card'>
                <img className='featured-image' src={pic2}></img>
                <p>Amazon</p>
            </div>
            <div className='featured-card'>
                <img className='featured-image' src={pic3}></img>
                <p>Google</p>
            </div>
            <div className='featured-card'>
                <img className='featured-image' src={pic4}></img>
                <p>Systems</p>
            </div>
            <div className='featured-card'>
                <img className='featured-image' src={pic5}></img>
                <p>Folio3</p>
            </div>
            <div className='featured-card'>
                <img className='featured-image' src={pic6}></img>
                <p>10Pearls</p>
            </div>
            <div className='featured-card'>
                <img className='featured-image' src={pic7}></img>
                <p>Tesla</p>
            </div>
            <div className='featured-card'>
                <img className='featured-image' src={pic8}></img>
                <p>Gateway</p>
            </div>
        </div>
    </section>
  )
}

export default Companies