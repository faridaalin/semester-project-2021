import { useState } from 'react';
import { X } from 'react-feather';
import PureModal from 'react-pure-modal';
import { DefaultInput, InputCalendar } from '../input/Input';
import Button from '../../button/Button';
import Select from '../select/Select';
import styles from './reservationForm.module.css';

const ReservationForm = ({ modal, setModal, hotel }) => {
  console.log('hotel', hotel);
  return (
    <>
      <PureModal
        header={
          <span onClick={() => setModal(false)}>
            <X />
          </span>
        }
        isOpen={modal}
      >
        <form className={styles.form}>
          <div className={styles.innerForm}>
            <div>
              <p className={styles.infoSection}>Hotel Details</p>
              <div className={styles.column}>
                <DefaultInput
                  type='text'
                  name='hotelName'
                  placeholder='Hotel name'
                  label='Hotel'
                  value={hotel.title}
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
                <Select
                  name='rooms'
                  options={hotel.rooms}
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
              <p className={styles.infoSection}>Personal Information</p>
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
            <div className={styles.buttonContainer}>
              <Button btnType='search'>Reserve</Button>
            </div>
          </div>
        </form>
      </PureModal>
    </>
  );
};

export default ReservationForm;
