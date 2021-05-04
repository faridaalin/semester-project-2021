import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { DefaultInput, InputCalendar } from '../input/Input';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import styles from './reservationForm.module.css';

const ReservationForm = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop={true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.form}>
            <div className={styles.innerForm}>
              <div>
                <div className={styles.column}>
                  <DefaultInput
                    type='search'
                    name='search'
                    placeholder='Hotel name'
                    label='Hotel'
                    icon='pin'
                  />
                  <div className={styles.row}>
                    <InputCalendar
                      type='button'
                      name='date'
                      value='Add date'
                      label='Check in'
                      icon='dates'
                    />
                    <InputCalendar
                      type='button'
                      name='date'
                      value='Add date'
                      label='Check in'
                      icon='dates'
                    />
                  </div>
                </div>
                <div className={styles.column}>
                  <DefaultInput
                    type='search'
                    name='search'
                    placeholder='Standard Room'
                    label='Room Type'
                    icon='night'
                  />
                  <div className={styles.row}>
                    <InputCalendar
                      type='button'
                      name='date'
                      value='Add date'
                      label='Adults'
                      icon='users'
                    />
                    <InputCalendar
                      type='button'
                      name='date'
                      value='Add date'
                      label='Children'
                      icon='users'
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className={styles.infoSection}>Details</p>
                <div className={styles.column}>
                  <DefaultInput
                    type='text'
                    name='firstName'
                    placeholder='First name'
                    label='First name'
                  />
                  <DefaultInput
                    type='text'
                    name='lastname'
                    placeholder='Last name'
                    label='Last name'
                  />
                </div>
                <div className={styles.column}>
                  <DefaultInput
                    type='email'
                    name='email'
                    placeholder='Email'
                    label='Email'
                  />
                  <DefaultInput
                    type='text'
                    name='request'
                    placeholder='Any requests here..'
                    label='Special Requests'
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary'>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReservationForm;
