import React from 'react';
import Header from './Components/Header'
import TodayInfo from './Components/TodayInfo'
import DaysList from './Components/DaysList'
import './App.css'
import { Grid,Paper,Container,Card,CardContent} from '@material-ui/core';
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";
const muiBaseTheme = createMuiTheme();

const theme = {
    overrides: {
        MuiPaper: {
        root: {
          "&.MuiPaper--01": {
            backgroundColor:"#eceff1",
            
          }
        }
      },
      MuiContainer: {
        root: {
          "&.MuiContainer--01": {
            margin:"0px",
            backgroundColor:"#eceff1",
            padding:"0px"
          }
        }
      },
    }
  };
const API_key = "4d0ac246f8af319d29b3a62cbb5abd00";
const APP_id = "b5f3c514";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            itemClicked: 0,
            weekWeatherInfo: [],
            dayWeatherInfo: {},
            isLoading: true,
            weatherInfo: {},
            three_hoursList: [],
            five_DaysList: [],
            longitude:'73.04',
            latitude:'33.72',
            country:'Pakistan',
            location:'Islamabad'

        }

    }

    daysInfoHandler = (item) => {

        this.setState({itemClicked: item, dayWeatherInfo: this.state.weekWeatherInfo[item]})

    }

    
    
    
    fetchWeatherData=(lat,lng)=>{
        fetch(`http://api.weatherunlocked.com/api/trigger/${lat},${lng}/forecast%20next6d%20temperature%20gt%200%20include7dayforecast?app_id=b5f3c514&app_id=${APP_id}&app_key=${API_key}`)
            .then(response => response.json())
            .then((data) => {
                console.log("fetchWeatherData");
                console.log(data);
                
                this.setState({
                    weekWeatherInfo: [...data.ForecastWeather.Days],
                    dayWeatherInfo: data.ForecastWeather.Days[this.state.itemClicked],
                    isLoading: false
                })
            })
    }
    handleLatLng=(lat,lng,location,country)=>{
        
        this.setState({
            longitude : lng.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
            latitude : lat.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
            location:location,
            country:country
          })
          console.log(`Lat from Child: ${lat} Lng from Child: ${lng}`)
          //fetch weather data upon search 
          this.fetchWeatherData(lat,lng)
    }
    componentDidMount() {
        fetch(`http://ip-api.com/json/`)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                
                this.setState({
                    latitude:data.lat,
                    longitude:data.lon,
                    country:data.country,
                    location:data.city
                })
                this.fetchWeatherData(this.state.latitude,this.state.longitude)
            })
        /*
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
              this.setState({
                longitude : position.coords.longitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                latitude : position.coords.latitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
              })

            console.log(`longitude: ${ this.state.longitude } | latitude: ${ this.state.latitude }`);
            //fetch weather data upon getting location information
            this.fetchWeatherData(this.state.latitude,this.state.longitude)
            

          },(error)=>{
            switch (error.code) {
              case 3:
                // ...deal with timeout
                console.log("Location Access Timeout, Loading Default Location");
                this.fetchWeatherData(this.state.latitude,this.state.longitude)
                break;
              case 2:
                // ...device can't get data
                console.log("Device is unable to get location data, Loading Default Location");
                this.fetchWeatherData(this.state.latitude,this.state.longitude)
                break;
              case 1:
                // ...user said no ☹️
                console.log("User denied location request, Loading Default Location");
                this.fetchWeatherData(this.state.latitude,this.state.longitude)
            }
          });
          
        }
        */
        
    }
    

    render() {
      
      
      
        if (this.state.isLoading) {
            return <p className="loading">Loading ...</p>
        } else {
            return (
                <div className="App">
                    <MuiThemeProvider theme={createMuiTheme(theme)}>
                    <Container maxWidth="false" className={"MuiContainer--01 main-Container"}>
                    <Paper elevation={0} className={"MuiPaper--01"}>
                    <Grid container item  className="main-wrap">
                    <Grid  item direction="row" style={{ width:'100%'}}>
                        <Grid item style={colStyle} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Header
                                handleLatLng={this.handleLatLng}
                            />
                        </Grid>
                    </Grid>
                    <Container container maxWidth="md" className="main-wrap">
                    <Grid container item direction="row">
                        <Container maxWidth="false" className={"MuiContainer--01"}></Container>
                        <Grid item style={colStyle} xs={12} sm={12} md={6} lg={6} xl={6}>
                            {/**
                            <Card className="TodayInfo-Card">
                            <CardContent>
                             */}       
                            <TodayInfo
                                itemClicked={this.state.itemClicked}
                                day={this.state.dayWeatherInfo}
                                location={this.state.location}
                                country={this.state.country}
                            />
                            {/**
                            </CardContent>
                            </Card>
                            */}
                        </Grid>
                        <Grid item style={colStyle} xs={12} sm={12} md={6} lg={6} xl={6}>
                            <DaysList
                                daysInfoHandler={this.daysInfoHandler}
                                weekWeatherInfo={this.state.weekWeatherInfo}
                            />
                        </Grid>
                    </Grid>
                    </Container>
                    
                </Grid>
                </Paper>
                    </Container>
                    </MuiThemeProvider>
                </div>
                

            );
        }

    }
}
const colStyle = {
    padding:0
  };
  const rowStyle = {
    fontSize: '15px',
    textAlign: 'center'
  };

export default App;
