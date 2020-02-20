import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import logo from '../img/logo.png';
import android from '../img/android.png';
import ios from '../img/ios.png';


function Home() {
    return (
        <div className="box">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>

            <div className="choice">
                <Link to="/login" className="btn btn-custom btn-login"> تسجيل الدخول </Link>
                <Link to="/signup" className="btn btn-custom btn-signup"> إنشاء حساب جديد </Link>
            </div>

            <p className="find">احصل على التطبيق</p>
            <div className="applications">
                <a href="#" className="App-link app-icon"><img src={android} alt=""/> </a>
                <a href="#" className="App-link app-icon"><img src={ios} alt=""/> </a>
            </div>
        </div>
    );
}


export default Home;