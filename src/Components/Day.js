import React, { Component } from 'react';
import './day.css'
class Day extends Component {
    constructor(props){
        super(props);
    }


    render() {
        return (
            <div className="day-container">
                
                <div>
                {this.props.dayInfo.name}
                </div>
                <div>
                    {this.props.dayInfo.temprature}
                </div>
            </div>
        );
    }
}

export default Day;