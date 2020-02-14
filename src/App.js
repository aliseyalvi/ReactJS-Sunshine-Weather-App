import React from 'react';
import Header from './Components/Header'
import TodayInfo from './Components/TodayInfo'
import DaysList from './Components/DaysList'
import './App.css'


//const API_key="e236c489272bbc0417d2d3673b09b38c";
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
            longitude:'',
            latitude:''

        }

    }

    daysInfoHandler = (item) => {

        this.setState({itemClicked: item, dayWeatherInfo: this.state.weekWeatherInfo[item]})

    }

    convertDate = (unix_timestamp) => {

        // Months array
        var months_arr = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        // Convert timestamp to milliseconds
        var date = new Date(unix_timestamp * 1000);
        // Year
        var year = date.getFullYear();
        // Month
        var month = months_arr[date.getMonth()];
        // Day
        var day = date.getDate();
        // Hours
        var hours = date.getHours();
        // Minutes
        var minutes = "0" + date.getMinutes();
        // Seconds
        var seconds = "0" + date.getSeconds();
        // Display date time in MM-dd-yyyy h:m:s format
        var convdataTime = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

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
        //this.setState({isLoading:true});
        //let longitude,latitude;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
              this.setState({
                longitude : position.coords.longitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
                latitude : position.coords.latitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
              })
            //longitude = position.coords.longitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            //latitude = position.coords.latitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];

            console.log(`longitude: ${ this.state.longitude } | latitude: ${ this.state.latitude }`);
            //fetch weather data upon getting location information
            this.fetchWeatherData(this.state.latitude,this.state.longitude)
            /*
            fetch(`http://api.weatherunlocked.com/api/trigger/${this.state.latitude},${this.state.longitude}/forecast%20next6d%20temperature%20gt%200%20include7dayforecast?app_id=b5f3c514&app_id=${APP_id}&app_key=${API_key}`)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    weekWeatherInfo: [...data.ForecastWeather.Days],
                    dayWeatherInfo: data.ForecastWeather.Days[this.state.itemClicked],
                    isLoading: false
                })
            }) */

          },(error)=>{
            switch (error.code) {
              case 3:
                // ...deal with timeout
                console.log("Location Access Timeout");
                
                break;
              case 2:
                // ...device can't get data
                console.log("Device is unable to get location data");
                break;
              case 1:
                // ...user said no ☹️
                console.log("User denied location request");
            }
          });
          
        }
        
    }
    

    render() {
      
      
      
        if (this.state.isLoading) {
            return <p>Loading ...</p>
        } else {
            return (
                <div className="App">
                    <div className="Header">
                        <div>
                            <Header
                                handleLatLng={this.handleLatLng}
                            />
                        </div>

                    </div>

                    <div className="Content">
                        <div>
                            <TodayInfo
                                itemClicked={this.state.itemClicked}
                                day={this.state.dayWeatherInfo}/>
                            <DaysList
                                daysInfoHandler={this.daysInfoHandler}
                                weekWeatherInfo={this.state.weekWeatherInfo}/>
                        </div>

                    </div>

                </div>
            );
        }

    }
}

export default App;
