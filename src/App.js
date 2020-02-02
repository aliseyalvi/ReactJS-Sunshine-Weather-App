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
            five_DaysList: []
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

    componentDidMount() {
        //this.setState({isLoading:true});
        fetch(`http://api.weatherunlocked.com/api/trigger/33.63,73.12/forecast%20next6d%20temperature%20gt%200%20include7dayforecast?app_id=b5f3c514&app_id=${APP_id}&app_key=${API_key}`)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    weekWeatherInfo: [...data.ForecastWeather.Days],
                    dayWeatherInfo: data.ForecastWeather.Days[this.state.itemClicked],
                    isLoading: false
                })
            })
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading ...</p>
        } else {
            return (
                <div className="App">
                    <div className="Header">
                        <div>
                            <Header/>
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
