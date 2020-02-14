import React, { Component } from 'react';
import Autocomplete from "./Autocomplete";
import './header.css';
import Logo from '../imgs/sunshine_app_logo.png';
import './autocomplete.css'
//import {FaEllipsisV} from "react-icons/fa";
class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            lat:'',
            lng:'',
            fetchedSuggestions:[],
            isSearched:false
           }
    }
    getLatLng=(data)=>{
        console.log("getLatLng: ");
        //console.log(data);
        this.setState({
          fetchedSuggestions:[...data],
          isSearched:true
        })

        this.props.handleLatLng(data[0].lat,data[0].lng,)
      }
    render() {
        return (
            <div className="head-container">
                <div className="logo-container">
                    <img src={Logo} alt="logo" className="logo-img"/>
                    <span>Sunshine</span>
                </div>
                <div className="setting-container">
                <Autocomplete
                getLatLong={this.getLatLng}
                />
                    {/*<FaEllipsisV /> */}
                </div>
            </div>
        );
    }
}

export default Header;