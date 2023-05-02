import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { getUserID } from '../helper/helper'


import styles from '../styles/Username.module.css';

export default function Signup() {

  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const response = await getUserID();
      console.log(response);
    } catch (error) {
      
    }
  };

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: "45%", paddingTop: '3em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Sign Up</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Happy to join you!
            </span>
          </div>

          <form className='py-1'>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={avatar} className={styles.profile_img} alt="avatar" />
                  </label>
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input className={styles.textbox} type="text" placeholder='Firstname*' />
                  <input className={styles.textbox} type="text" placeholder='Lastname*' />
                  <input className={styles.textbox} type="text" placeholder='Telephone*' />
                  <input className={styles.textbox} type="text" placeholder='ID Card' />
                  <button className={styles.btn} type='submit' onClick={handleClick}>Signup</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Already Signup? <Link className='text-red-500' to="/">Signin Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}

