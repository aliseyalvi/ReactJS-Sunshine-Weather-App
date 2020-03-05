import React, { Component } from 'react';
import Autocomplete from "./Autocomplete";
import './header.css';
import Logo from '../imgs/sunshine_app_logo.png';
import './autocomplete.css'
import { Grid,AppBar,Toolbar,IconButton,Typography } from '@material-ui/core';
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";
import {muiBaseTheme,theme} from './themes'

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
        console.log(data);
        this.setState({
          fetchedSuggestions:[...data],
          isSearched:true
        })

        this.props.handleLatLng(data[0].lat,data[0].lng,data[0].location,data[0].country)
      }
    render() {
        
        return (
            <MuiThemeProvider theme={createMuiTheme(theme)}>
            <AppBar position="static" className="root" color="primary" >
                <Toolbar >
                <IconButton edge="start" className="logo-container">
                    <img src={Logo} alt="logo" className="logo-img"/>
                    
                </IconButton>
                {/**
                <Typography variant="h6" className="MuiTypography--01">Sunshine</Typography>
                 */}
                 <h6 className="logo-name">
                 Sunshine
                 </h6>
                <div className="spacer1">

                </div>
                 
                <div className="setting-container">
                <Autocomplete
                getLatLong={this.getLatLng}
                />
                    
                </div>
                <div className="spacer2">

                </div>
                </Toolbar>
            </AppBar>
            </MuiThemeProvider>
        );
    }
}

export default Header;