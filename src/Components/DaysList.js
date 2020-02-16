import React, {Component} from 'react';
import Day from './Day'
import './dayslist.css'
import {List,ListItem,ListItemText,ListItemIcon,Divider} from '@material-ui/core';
function Menu(props) {

    const list = props.daysList;
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
      };
     
    
    const updatedList = list.map((listItems, index) => {
        return (
            <ListItem button key={index} 
            /*onClick={() => props.getDay(index)} 
            onClick={event => handleListItemClick(event, index)} */
            selected={selectedIndex === index}
            onClick={(e)=>{
                handleListItemClick(e,index);
                props.getDay(index);
            }}
            >
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

            </ListItem>
        );
    });

    return (
        <List component="nav" aria-label="main mailbox folders" className="list">{updatedList}</List>
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