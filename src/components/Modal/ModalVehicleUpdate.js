import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

const ModalVehicleUpdate = (props) => {
  const {
    buttonLabel,
    className,
    targetfee,
    handleRefresh,
    handleUpdate,
    vehicle,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function makeChange(e)
  {
      vehicle.dmv_make = e.target.value
  }
    
  function modelChange(e) 
  {
      vehicle.dmv_model = e.target.value
  }

  function colorChange(e) 
  {
      vehicle.dmv_color = e.target.value
  }

  function yearChange(e)
  {
      vehicle.dmv_year = e.target.value
  }

  function update(vehicle){
      handleUpdate(vehicle).then(()=>handleRefresh())
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} targetfee={targetfee}>
        <ModalHeader toggle={toggle} style={{background:"#343a40", color:"white"}}>Update Vehicle Details</ModalHeader>
        <ModalBody>
            <div className="modalmain">
              <form>
                <p>Enter the make</p>
                <input type='text' name='make' onChange={makeChange}/>
                <p>Enter the model</p>
                <input type='text' name='model' onChange={modelChange}/>
                <p>Enter the color</p>
                <input type='text' name='color' onChange={colorChange}/>
                <p>Enter the year</p>
                <input type='text' name='year' onChange={yearChange}/>
              </form>
              
              <Button color="primary" className="twobuttons" onClick={() => update(vehicle)}>Update</Button>
              <Button color="danger" className="twobuttons" onClick={() => handleRefresh()}>Cancel</Button>
            </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

ModalVehicleUpdate.propTypes = {
    buttonLabel: PropTypes.string,
    className: PropTypes.string,
    targetfee: PropTypes.string,
    handleRefresh: PropTypes.func,
    vehicle: PropTypes.object,
    handleUpdate: PropTypes.func,
};

export default ModalVehicleUpdate;