import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { X } from 'react-feather';
import dateFormat from 'dateformat';
import PureModal from 'react-pure-modal';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import SelectField from '../select/Select';
import DateWrapper from '../date/Date';
import DatePicker from 'react-datepicker';

import axios from '../../../utils/axios';
import enquirySchema from '../../../validationSchema/enquirySchema';
import styles from './reservationForm.module.css';

const ReservationForm = ({ modal, setModal, hotel }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adults, setAdults] = useState(null);
  const [children, setChildren] = useState(null);
  const [total, setTotal] = useState(undefined);
  const [personalInfo, setPersonalInfo] = useState({});
  const [hotelInfo, setHotelInfo] = useState({});
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleNumChildren = (e) => {
    setChildren(e.target.value);
  };

  const handleNumAdults = (e) => {
    setAdults(e.target.value);
  };
  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };
  const onSubmit = async (values, onSubmitProps) => {
    // console.log('Values', values);
    // console.log('onSubmitProps', onSubmitProps);
  };
  useEffect(() => {
    setFormData({
      ...personalInfo,
      hotel_name: hotel.title,
      check_in: dateFormat(`${startDate}`, 'mm/dd/yyyy'),
      check_out: dateFormat(`${endDate}`, 'mm/dd/yyyy'),
    });
  }, [personalInfo, startDate, endDate, hotel.title]);

  // console.log('formData', formData);

  const initialFormData = {
    hotel_name: hotel.title,
    check_in: '',
    check_out: '',
    room_type: hotel.rooms[0].room_type,
    adults: '',
    children: '',
    price: '',
    firstname: '',
    lastname: '',
    email: '',
    special_requests: '',
  };
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
        <Formik
          initialValues={initialFormData}
          validationSchema={enquirySchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            console.log('FORMIK:', formik.values);
            return (
              <Form className={styles.form}>
                <div className={styles.innerForm}>
                  <div>
                    <p className={styles.infoSection}>Hotel Details</p>
                    <div className={styles.column}>
                      <DefaultInput
                        type='text'
                        name='hotel_name'
                        placeholder='Hotel name'
                        label='Hotel'
                        value={formik.values.hotel_name}
                        icon='pin'
                        readonly={true}
                      />
                      <div className={styles.row}>
                        <DateWrapper
                          name='check_in'
                          label='Check In'
                          selectedDate={startDate}
                          setDateFunc={setStartDate}
                          icon='dates'
                          placeholder='Add date'
                        />
                        <DateWrapper
                          name='check_out'
                          label='Check Out'
                          selectedDate={endDate}
                          setDateFunc={setEndDate}
                          icon='dates'
                          placeholder='Add date'
                        />
                      </div>
                    </div>
                    <div className={styles.column}>
                      <SelectField
                        name='room_type'
                        options={hotel.rooms}
                        value={formik.values.room_type}
                        label='Room Type'
                        icon='night'
                        handleChange={formik.handleChange}
                        formik={formik}
                      />
                      <div className={styles.row}>
                        <DefaultInput
                          type='number'
                          name='adults'
                          value={adults}
                          label='Adults'
                          icon='users'
                          handleChange={handleChange}
                          placeholder='Adults'
                          min='1'
                          max='100'
                        />
                        <DefaultInput
                          type='number'
                          name='children'
                          value={children}
                          label='Children'
                          icon='users'
                          handleChange={handleChange}
                          placeholder='Children'
                          min='0'
                          max='100'
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className={styles.infoSection}>Personal Information</p>
                    <div className={styles.column}>
                      <DefaultInput
                        type='text'
                        name='firstname'
                        placeholder='First name'
                        label='First name'
                        handleChange={handleChange}
                      />
                      <DefaultInput
                        type='text'
                        name='lastname'
                        placeholder='Last name'
                        label='Last name'
                        handleChange={handleChange}
                      />
                    </div>
                    <div className={styles.column}>
                      <DefaultInput
                        type='email'
                        name='email'
                        placeholder='Email'
                        label='Email'
                        handleChange={handleChange}
                      />
                      <DefaultInput
                        type='text'
                        name='special_requests'
                        placeholder='Any requests here..'
                        label='Special Requests'
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles.total}>
                    <span>Total</span>
                    <div className={styles.priceWrapper}>
                      <input className={styles.price}>4 239 NOK</input>
                      <span className={styles.night}>x nights</span>
                    </div>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Button
                      btnType='search'
                      submit
                      isDisabled={!(formik.dirty && formik.isValid)}
                    >
                      {isLoading ? 'Sending..' : 'Reserve'}
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </PureModal>
    </>
  );
};

export default ReservationForm;
