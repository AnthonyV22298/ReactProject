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
    appointment,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function update(appointment){
      handleUpdate(appointment).then(()=>handleRefresh())
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} targetfee={targetfee}>
        <ModalHeader toggle={toggle} style={{background:"#343a40", color:"white"}}>Update Vehicle Details</ModalHeader>
        <ModalBody>
            <div className="modalmain">
                
            </div>
            <Button color="primary" className="twobuttons" onClick={() => update(appointment)}>Update</Button>
            <Button color="danger" className="twobuttons" onClick={() => handleRefresh()}>Cancel</Button>
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
    appointment: PropTypes.object,
    handleUpdate: PropTypes.func,
};

export default ModalVehicleUpdate;