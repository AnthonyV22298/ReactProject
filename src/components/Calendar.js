import React, { Component } from "react";
import Calendar from "react-calendar";


class ReactCalendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            today: new Date(),
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(newdate)
    {
        this.setState({ date : newdate })
        console.log(newdate)
    }
    

    render() { return ( 
        <div style={{ textAlign: "center", justifyContent: "center", display: "flex" }}>

            <Calendar 
            onChange={this.onChange} 
            calendarType={"US"}
            tileDisabled={({date, view }) =>
            date.getDay()===0 || date.getDay()===6 ||  
            (date.getMonth() <= this.state.today.getMonth() &&
            date.getDate() < this.state.today.getDate() &&
            date.getFullYear() <= this.state.date.getFullYear()) ||
            (date.getMonth() < this.state.today.getMonth() &&
            date.getDate() >= this.state.today.getDate() &&
            date.getFullYear() <= this.state.date.getFullYear())}/>

            <p style={{ display: "block", paddingTop: "30px", paddingLeft: "40px" }}>{ "Date selected: " + this.state.date.toLocaleDateString() }</p>
        </div>
        )
    }
}
export default ReactCalendar;
