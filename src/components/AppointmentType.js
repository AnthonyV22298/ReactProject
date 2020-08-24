import React, { Component } from "react";


class AppointmentT extends Component {
    

    render() { return ( 
        <div style={{ textAlign: "center", justifyContent: "center" }}>
            <h2>Select the appointment type</h2>
            <select>
                <option value="general">General</option>
                <option value="permit">Permit Exam</option>
                <option value="driver">Drivers Test</option>
            </select>

            
        </div>
        )
    }
}
export default AppointmentT;