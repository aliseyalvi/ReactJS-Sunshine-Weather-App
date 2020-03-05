import React, {Component} from 'react';
import './todayinfo.css';
import {Grid, Card, CardContent} from '@material-ui/core';
import {withStyles, MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
const muiBaseTheme = createMuiTheme();

const theme = {
    overrides: {
        MuiCard: {
            root: {
                "&.MuiEngagementCard--01": {
                    transition: "0.3s",

                    margin: "10px",
                    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                    "&:hover": {
                        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                    },
                    "& .MuiCardMedia-root": {
                        paddingTop: "56.25%"
                    },
                    "& .MuiCardContent-root": {
                        textAlign: "left",
                        padding: muiBaseTheme.spacing.unit * 2,
                        margin: muiBaseTheme.spacing.unit * 1
                    },
                    "& .MuiDivider-root": {
                        margin: `${muiBaseTheme.spacing.unit * 3}px 0`
                    },
                    "& .MuiTypography--heading": {
                        fontWeight: "bold"
                    },
                    "& .MuiTypography--subheading": {
                        lineHeight: 1.8
                    },
                    "& .MuiAvatar-root": {
                        display: "inline-block",
                        border: "2px solid white",
                        "&:not(:first-of-type)": {
                            marginLeft: -muiBaseTheme.spacing.unit
                        }
                    }
                }
            }
        }
    }
};

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
        const humidityIcon = require('../imgs/humidity-1.png');
        const pressureIcon = require('../imgs/pressure-1.png');
        const windIcon = require('../imgs/wind-1.png');
        const icon = require('../imgs/icon/' + this.props.day.Timeframes[0].wx_icon.split('.').slice(0, -1).join('.') + '.png')
        return (
            <MuiThemeProvider theme={createMuiTheme(theme)}>
                <Card className={"MuiEngagementCard--01"}>
                    <CardContent className={"MuiCardContent-root"}>
                        <Grid container>
                            <Grid container item direction="row">
                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <div className="temprature-container">
                                        <span>
                                            {this.props.location}
                                            , {this.props.country}
                                        </span>
                                        <br/>
                                        <span>
                                            {this.getDay(this.props.day.date)}
                                            , {this.getMonthWithDate(this.props.day.date)}
                                        </span>

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
                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <div className="icon-container">

                                        <img src={icon} alt="weather_icon" height="150" width="150"/>
                                        <p>{this.props.day.Timeframes[0].wx_desc}</p>

                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container item direction="row">
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    className="weatherDetails-container">
                                      
                                    <span>
                                    <img src={humidityIcon} width="25" height="25" />
                                    &nbsp;
                                      Humidity: {this.props.day.humid_max_pct}
                                        &nbsp;%
                                    </span><br/>
                                    <span>
                                    <img src={windIcon} width="25" height="25" />
                                    &nbsp;
                                      Wind Speed: {this.props.day.windspd_max_kmh}
                                        &nbsp;Km/h
                                    </span><br/>
                                    <span>
                                    <img src={pressureIcon} width="25" height="25" />
                                    &nbsp;
                                      Sea Level Pressure: {this.props.day.slp_max_in}
                                        &nbsp;h/Pa</span>
                                </Grid>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default TodayInfo;