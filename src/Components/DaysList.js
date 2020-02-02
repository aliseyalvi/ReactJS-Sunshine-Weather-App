import React, {Component} from 'react';
import Day from './Day'
import './dayslist.css'

function Menu(props) {

    const list = props.daysList;
    const updatedList = list.map((listItems, index) => {
        return (
            <li key={index} onClick={() => props.getDay(index)}>
                <a href="#">
                    <div>{props.getDayFromDate(listItems.date)}
                        <br/>
                        <span>{listItems.Timeframes[0].wx_desc}</span>
                    </div>
                    <div>{listItems.temp_max_c}&#8451;
                        <br/>
                        <span>{listItems.temp_min_c}</span>
                    </div>
                </a>

            </li>
        );
    });

    return (
        <ul className="list">{updatedList}</ul>
    );
}

class DaysList extends Component {
    constructor(props) {
        super(props);

    }
    getDayFromDate = (myStr) => {
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
    render() {
        console.log(this.props.weekWeatherInfo);

        return (
            <div className="dayslist-container">

                <Menu
                    menuitems={this.props.daysinfo}
                    getDay={this.props.daysInfoHandler}
                    daysList={this.props.weekWeatherInfo}
                    getDayFromDate={this.getDayFromDate}/>
            </div>
        );
    }
}

export default DaysList;