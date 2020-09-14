import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import LocationsDropdown from '../Appointment/LocationsDropdown';
import TimeDropdown from '../Appointment/TimeDropdown';
import TypeDropdown from '../Appointment/TypeDropdown';
import PropTypes from 'prop-types';

const ModalUpdate = (props) => {
  const {
    buttonLabel,
    className,
    targetfee,
    handleRefresh,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} targetfee={targetfee}>
        <ModalHeader toggle={toggle}>Update Appointment</ModalHeader>
        <ModalBody>
            <TypeDropdown />
            <TimeDropdown />
            <LocationsDropdown />
            <Button color="primary" className="twobuttons">Update</Button>
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
    handleRefresh: PropTypes.string,
};

export default ModalUpdate;