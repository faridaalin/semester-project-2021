import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { X, Loader } from 'react-feather';
import PureModal from 'react-pure-modal';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import SelectField from '../select/Select';
import DateWrapper from '../date/Date';
import calcNights from '../../../helpers/calcNight';
import axios from '../../../utils/axios';
import enquirySchema from '../../../validationSchema/enquirySchema';
import styles from './reservationForm.module.css';

const calcPrice = (roomList, room, nights, adults, children) => {
  const roomType = roomList.find((roomType) => roomType.room_type === room);
  const totalGuests = adults + children;
  const numRooms = Math.ceil(totalGuests / roomType.sleeps);
  const pricePerRoom = numRooms * roomType.price;
  const totalPrice = pricePerRoom * nights;
  return totalPrice;
};

const ReservationForm = ({ modal, setModal, hotel }) => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow.toDateString());
  const [personalInfo, setPersonalInfo] = useState({});
  const [nights, setNights] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const priceRef = useRef(null);

  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };
  const onSubmit = async (values, onSubmitProps) => {
    const { setStatus } = onSubmitProps;
    const price = parseFloat(priceRef.current.innerText);

    if (price > 0 && typeof price === 'number') {
      setIsLoading(true);
      const enquiryData = {
        ...values,
        price,
      };

      try {
        const res = await axios.post('/enquiries/create', enquiryData);

        if (res.status === 200) {
          setIsLoading(false);

          setStatus({
            sent: true,
            msg: 'Your reservation enquiry has been sent. We will send you confirmation in 2-3 days.',
          });
          setShowForm(!showForm);
        }
      } catch (error) {
        if (error.response && error.response.status) {
          if (error.response.status === 404) {
            setStatus({
              sent: false,
              msg: error.response.data.message,
            });
          }
        } else {
          setStatus({
            sent: false,
            msg: 'Something went wrong, please try again later.',
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setNights(calcNights(startDate, endDate));
  }, [startDate, endDate]);

  const initialFormData = {
    hotel_name: hotel.title,
    check_in: '',
    check_out: '',
    room_type: hotel.rooms[0].room_type,
    adults: 1,
    children: 0,
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
            return (
              <Form
                className={`${styles.form}  ${
                  formik.status && formik.status.sent && styles.bg
                }`}
              >
                {formik.status && formik.status.msg && (
                  <div
                    className={` ${
                      formik.status.sent ? styles.success : styles.error
                    }`}
                  >
                    <p>{formik.status.msg}</p>
                  </div>
                )}
                {showForm && (
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
                          onChange={formik.handleChange}
                          formik={formik}
                        />
                        <div className={styles.row}>
                          <DefaultInput
                            type='number'
                            name='adults'
                            value='1'
                            label='Adults'
                            smallLabel='18 or above'
                            icon='users'
                            handleChange={handleChange}
                            placeholder='Adults'
                            min='1'
                            max='100'
                          />
                          <DefaultInput
                            type='number'
                            name='children'
                            value='0'
                            label='Children'
                            smallLabel='12 or above'
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
                          name='special_requests'
                          placeholder='Any requests here..'
                          label='Special Requests'
                        />
                      </div>
                    </div>
                    <div className={styles.total}>
                      <span>Total</span>
                      <Field as='div' className={styles.priceWrapper}>
                        <span ref={priceRef} className={styles.price}>
                          {calcPrice(
                            hotel.rooms,
                            formik.values.room_type,
                            nights,
                            formik.values.adults,
                            formik.values.children
                          )}{' '}
                        </span>
                        <span>NOK</span>
                        <span className={styles.night}>{nights} nights</span>
                      </Field>
                    </div>
                    <div className={styles.buttonContainer}>
                      <Button
                        btnType='search'
                        submit
                        isDisabled={!formik.isValid}
                      >
                        {isLoading ? (
                          <div className='loader'>
                            <Loader />
                          </div>
                        ) : (
                          'Reserve'
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </PureModal>
    </>
  );
};

export default ReservationForm;
