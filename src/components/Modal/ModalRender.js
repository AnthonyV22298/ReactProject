
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PaypalContainer from '../Paypal/PaypalContainer';

const ModalRender = (props) => {
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
          <PaypalContainer/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalRender;