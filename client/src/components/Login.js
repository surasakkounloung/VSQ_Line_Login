import React, { useEffect } from 'react';
import liff from '@line/liff';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';

export default function Login() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: "1660854325-Y1Lb08Oo" });
        if (liff.isLoggedIn()) {
          // กรณีผู้ใช้งานล็อคอินแล้ว ให้เรียก API เพื่อตรวจสอบความถูกต้องของข้อมูลผู้ใช้
          const profile = await liff.getProfile();
          console.log(profile);
        } else {
          // กรณีผู้ใช้งานยังไม่ได้ล็อคอิน ให้เรียก LIFF ในโหมด Login
          liff.login();
        }
      } catch (error) {
        console.error(error);
      }
    };
    initializeLiff();
  }, []);

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello Again!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1'>
              <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input className={styles.textbox} type="text" placeholder='Username' />
                  <button className={styles.btn} type='submit'>Let's Go</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
