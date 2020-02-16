import React, { Component } from 'react';
import Autocomplete from "./Autocomplete";
import './header.css';
import Logo from '../imgs/sunshine_app_logo.png';
import './autocomplete.css'
import { Grid,AppBar,Toolbar,IconButton,Typography } from '@material-ui/core';


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
            <AppBar position="static" className="root">
                <Toolbar >
                <IconButton edge="start" className="logo-container">
                    <img src={Logo} alt="logo" className="logo-img"/>
                    
                </IconButton>
                <Typography variant="h6" className="logo-name">Sunshine</Typography>
                <div className="spacer">

                </div>
                <div className="setting-container">
                <Autocomplete
                getLatLong={this.getLatLng}
                />
                    
                </div>
                </Toolbar>
            </AppBar>
            
        );
    }
}

export default Header;