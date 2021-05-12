import { useState, useEffect, useRef } from 'react';
import { X } from 'react-feather';
import dateFormat from 'dateformat';
import PureModal from 'react-pure-modal';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import Select from '../select/Select';
import DateWrapper from '../date/Date';
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

  const handleNumChildren = (e) => {
    setChildren(e.target.value);
  };

  const handleNumAdults = (e) => {
    setAdults(e.target.value);
  };
  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    setFormData({
      ...personalInfo,
      hotel_name: hotel.title,
      check_in: dateFormat(`${startDate}`, 'mm/dd/yyyy'),
      check_out: dateFormat(`${endDate}`, 'mm/dd/yyyy'),
    });
  }, [personalInfo, startDate, endDate, hotel.title]);

  console.log('personalInfo', personalInfo);
  console.log('formData', formData);

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
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.innerForm}>
            <div>
              <p className={styles.infoSection}>Hotel Details</p>
              <div className={styles.column}>
                <DefaultInput
                  type='text'
                  name='hotel_name'
                  placeholder='Hotel name'
                  label='Hotel'
                  value={hotel.title}
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
                <Select
                  name='room_type'
                  options={hotel.rooms}
                  label='Room Type'
                  icon='night'
                  handleChange={handleChange}
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
                <span className={styles.price}>4 239 NOK</span>
                <span className={styles.night}>x nights</span>
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
