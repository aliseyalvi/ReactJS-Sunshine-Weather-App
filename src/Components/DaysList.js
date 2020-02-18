import React, {Component} from 'react';
import Day from './Day'
import './dayslist.css'
import {List,ListItem,Card,CardContent,ListItemText,ListItemIcon,Divider} from '@material-ui/core';
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";
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
            "& .MuiCardContent-root": {
              textAlign: "left",
              padding: muiBaseTheme.spacing.unit * 1,
              margin: muiBaseTheme.spacing.unit * 0,
            },
          }
        }
      }
    }
  };
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
            className="listli"
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
                <MuiThemeProvider theme={createMuiTheme(theme)}>
                <Card className={"MuiEngagementCard--01"}>
                <CardContent className={"MuiCardContent-root"}>
                <Menu
                    menuitems={this.props.daysinfo}
                    getDay={this.props.daysInfoHandler}
                    daysList={this.props.weekWeatherInfo}
                    getDayFromDate={this.getDayFromDate}/>


            </CardContent>
            </Card>
            </MuiThemeProvider>
            </div>
        );
    }
}

export default DaysList;