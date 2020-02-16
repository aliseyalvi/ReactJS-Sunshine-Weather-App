import React from 'react';
import Header from './Components/Header'
import TodayInfo from './Components/TodayInfo'
import DaysList from './Components/DaysList'
import './App.css'
import { Grid,Paper,Container } from '@material-ui/core';

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
            longitude:'33.73',
            latitude:'73.08'

        }

    }

    daysInfoHandler = (item) => {

        this.setState({itemClicked: item, dayWeatherInfo: this.state.weekWeatherInfo[item]})

    }

    
    
    
    fetchWeatherData=(lat,lng)=>{
        fetch(`http://api.weatherunlocked.com/api/trigger/${lat},${lng}/forecast%20next6d%20temperature%20gt%200%20include7dayforecast?app_id=b5f3c514&app_id=${APP_id}&app_key=${API_key}`)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    weekWeatherInfo: [...data.ForecastWeather.Days],
                    dayWeatherInfo: data.ForecastWeather.Days[this.state.itemClicked],
                    isLoading: false
                })
            })
    }
    handleLatLng=(lat,lng)=>{
        
        this.setState({
            longitude : lng.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
            latitude : lat.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
          })
          console.log(`Lat from Child: ${lat} Lng from Child: ${lng}`)
          //fetch weather data upon search 
          this.fetchWeatherData(lat,lng)
    }
    componentDidMount() {
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
        
    }
    

    render() {
      
      
      
        if (this.state.isLoading) {
            return <p className="loading">Loading ...</p>
        } else {
            return (
                <div className="App">
                    <Container maxWidth="md">
                    <Paper elevation={3} >
                    <Grid container maxWidth="md">
                    <Grid container item direction="row">
                        <Grid item style={colStyle} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Header
                                handleLatLng={this.handleLatLng}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item direction="row">
                        <Grid item style={colStyle} xs={12} sm={12} md={6} lg={6} xl={6}>
                            <TodayInfo
                                itemClicked={this.state.itemClicked}
                                day={this.state.dayWeatherInfo}
                            />
                        </Grid>
                        <Grid item style={colStyle} xs={12} sm={12} md={6} lg={6} xl={6}>
                            <DaysList
                                daysInfoHandler={this.daysInfoHandler}
                                weekWeatherInfo={this.state.weekWeatherInfo}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                </Paper>
                    </Container>
                
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
