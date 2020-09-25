import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import LocationsDropdown from '../Appointment/LocationsDropdown';
import TimeDropdown from '../Appointment/TimeDropdown';
import TypeDropdown from '../Appointment/TypeDropdown';
import Calendar from "react-calendar";
import PropTypes from 'prop-types';

const ModalUpdate = (props) => {
  const {
    buttonLabel,
    className,
    targetfee,
    handleRefresh,
    handleUpdate,
    appointment,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function typeChange(e)
  {
      appointment.dmv_app_type = e.target.value
  }
    
  function locationChange(e) 
  {
      appointment._dmv_appointmentlocation_value = e.target.value
  }

  function timeChange(e) 
  {
      appointment.dmv_time = e.target.value
  }

  function onChange(e)
  {
      appointment.dmv_appointment_date = e
  }

  function update(appointment){
      handleUpdate(appointment).then(()=>handleRefresh())
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} targetfee={targetfee}>
        <ModalHeader toggle={toggle} style={{background:"#343a40", color:"white"}}>Update Appointment</ModalHeader>
        <ModalBody>
            <div className="modalmain">
                <div className="dropdown2">
                    <TypeDropdown onChange={typeChange}/>
                </div>
                <div className="dropdown2">
                    <TimeDropdown onChange={timeChange}/>
                </div>
                <div className="dropdown2">
                    <LocationsDropdown onChange={locationChange}/>
                </div>
                <Calendar 
                        onChange={onChange} 
                        calendarType={"US"}
                        tileDisabled={({date }) =>
                        date.getDay()===0 || date.getDay()===6 }
                        />
            </div>
            <Button color="primary" className="twobuttons" onClick={() => update(appointment)}>Update</Button>
            <Button color="danger" className="twobuttons" onClick={() => handleRefresh()}>Cancel</Button>
        </ModalBody>
      </Modal>
    </div>
  );
}

ModalUpdate.propTypes = {
    buttonLabel: PropTypes.string,
    className: PropTypes.string,
    targetfee: PropTypes.string,
    handleRefresh: PropTypes.func,
    appointment: PropTypes.object,
    handleUpdate: PropTypes.func,
};

export default ModalUpdate;