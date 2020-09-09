import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AppointmentMake from '../Appointment/AppointmentMaker';
import PropTypes from 'prop-types';

const ModalUpdate = (props) => {
  const {
    buttonLabel,
    className,
    targetfee
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} targetfee={targetfee}>
        <ModalHeader toggle={toggle}>Payment</ModalHeader>
        <ModalBody>
          <AppointmentMake/>
        </ModalBody>
      </Modal>
    </div>
  );
}

ModalUpdate.propTypes = {
    buttonLabel: PropTypes.string,
    className: PropTypes.string,
    targetfee: PropTypes.string
};

export default ModalUpdate;