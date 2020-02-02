import React, { Component } from 'react';
import './header.css';
import Logo from '../imgs/sunshine_app_logo.png';
//import {FaEllipsisV} from "react-icons/fa";
class Header extends Component {
    render() {
        return (
            <div className="head-container">
                <div className="logo-container">
                    <img src={Logo} alt="logo" className="logo-img"/>
                    <span>Sunshine</span>
                </div>
                <div className="setting-container">
                    
                    {/*<FaEllipsisV /> */}
                </div>
            </div>
        );
    }
}

export default Header;