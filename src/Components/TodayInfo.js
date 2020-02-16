import React, {Component} from 'react';
import './todayinfo.css';
import { Grid,Card,CardContent } from '@material-ui/core';
class TodayInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: []
        }
    }

    getDay = (myStr) => {
        //var myStr = "02/02/2020";
        var strArray = myStr.split("/");
        var newDate = strArray[2] + "-" + strArray[1] + "-" + strArray[0];
        var currentDate = new Date(newDate);
        //currentDate.getTime();
        var days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        //var day = date.getDay();
        var day = days[currentDate.getDay()];
        return day;

    }
    getMonthWithDate = (myStr) => {
        //var myStr = "02/02/2020";
        var strArray = myStr.split("/");
        var newDate = strArray[2] + "-" + strArray[1] + "-" + strArray[0];
        var currentDate = new Date(newDate);
        //currentDate.getTime();
        var months_arr = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        //var day = date.getDay();
        var month = months_arr[currentDate.getMonth()];
        let monthWithDate = month + "  " + strArray[0];
        return monthWithDate;

    }
    render() {
        console.log(this.props.day.date)
        const icon = require('../imgs/icon/' + this.props.day.Timeframes[0].wx_icon.split('.').slice(0, -1).join('.') + '.png')
        return (
            <Grid container>
                <Grid container item direction="row">
                <Grid item  xs={6} sm={6} md={6} lg={6} xl={6}>
                <div className="temprature-container">
                
                    <br/> {this.getDay(this.props.day.date)}
                    , {this.getMonthWithDate(this.props.day.date)}

                    <p>
                        <span>
                            {this.props.day.temp_max_c}&#8451;
                        </span><br/>
                        <span>
                            {this.props.day.temp_min_c}&#8451;
                        </span>
                    </p>
                   
                    </div>
                </Grid>
                <Grid item  xs={6} sm={6} md={6} lg={6} xl={6}>
                <div className="icon-container">
                
                    <img src={icon} alt="weather_icon" height="150" width="150"/>
                    <p>{this.props.day.Timeframes[0].wx_desc}</p>
                    
                    </div>
                </Grid>
                </Grid>
                <Grid container item direction="row">
                <Grid item  xs={12} sm={12} md={12} lg={12} xl={12} className="weatherDetails-container">
                <span>Humidity: {this.props.day.humid_max_pct}
                        &nbsp;%
                    </span><br/>
                    <span>Wind Speed: {this.props.day.windspd_max_kmh}
                        &nbsp;Km/h
                    </span><br/>
                    <span>Sea Level Pressure: {this.props.day.slp_max_in}
                        &nbsp;h/Pa</span>
                </Grid>
                </Grid>

            </Grid>
            
        );
    }
}

export default TodayInfo;