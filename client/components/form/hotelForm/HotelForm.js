import { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Loader } from 'react-feather';
import PureModal from 'react-pure-modal';
import { DefaultInput } from '../input/Input';
import Textera from '../textarea/Textarea';
import Button from '../../button/Button';
import axios from '../../../utils/axios';

import styles from './hotelForm.module.css';

const HotelForm = ({ schema, initalValues, rating, newProduct, endpoint }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (values, onSubmitProps) => {
    console.log('VALUES', values);
  };

  return (
    <Formik
      initialValues={initalValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        console.log('Formik', formik);
        return (
          <Form className={styles.form}>
            {/* {formik.status && formik.status.msg && (
                <div
                  className={` ${
                    formik.status.sent ? styles.success : styles.error
                  }`}
                >
                  <p>{formik.status.msg}</p>
                </div>
              )} */}
            <div>
              <p className={styles.title}>Details</p>
              <div className={styles.innerForm}>
                <div className={styles.flex}>
                  <DefaultInput
                    type='text'
                    name='title'
                    placeholder='Name'
                    label='Hotel name'
                    customContainer={styles.customContainer}
                  />
                  <DefaultInput
                    type='text'
                    name='address'
                    placeholder='Address'
                    label='Hotel Address'
                    customContainer={styles.customContainer}
                  />
                  <DefaultInput
                    type='text'
                    name='subheading'
                    placeholder='Subheading'
                    label='Subheading'
                    customContainer={styles.customContainer}
                  />
                  <Textera
                    placeholder='Hotel description...'
                    name='description'
                    label='Description'
                    customContainer={styles.customContainer}
                  />

                  {rating && (
                    <DefaultInput
                      type='number'
                      name='rating'
                      placeholder=''
                      label='Rating'
                      customContainer={styles.customContainer}
                    />
                  )}

                  <DefaultInput
                    type='url'
                    name='mainImage'
                    placeholder='url'
                    label='Main Image'
                    customContainer={styles.customContainer}
                  />
                  <DefaultInput
                    type='text'
                    name='category'
                    placeholder='"Ski Resort"'
                    label='Category'
                    customContainer={styles.customContainer}
                  />
                  <div>
                    <p className={styles.title}>Images</p>
                    <FieldArray
                      name='images'
                      render={(arrayHelpers) => {
                        const images = formik.values.images;
                        return (
                          <>
                            {images && images.length > 0
                              ? images.map((image, index) => (
                                  <>
                                    <DefaultInput
                                      type='url'
                                      name='images'
                                      placeholder='Image url'
                                    />

                                    <button
                                      type='button'
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      Remove image
                                    </button>
                                  </>
                                ))
                              : null}
                            <button
                              type='button'
                              onClick={() => arrayHelpers.push('')}
                            >
                              Add image
                            </button>
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
                <div className={styles.flex}>
                  <div>
                    <p className={styles.title}>Room Types</p>
                    <FieldArray
                      name='rooms'
                      render={(arrayHelpers) => {
                        const rooms = formik.values.rooms;
                        return (
                          <>
                            {rooms && rooms.length > 0
                              ? rooms.map((room, index) => (
                                  <div className={styles.roomsContainer}>
                                    <p className={styles.roomType}>
                                      Standard Room
                                    </p>
                                    <DefaultInput
                                      type='text'
                                      name={`rooms.${index}.room_type`}
                                      placeholder='Room Type'
                                    />
                                    <DefaultInput
                                      type='number'
                                      name={`rooms.${index}.sleeps`}
                                      placeholder='Sleeps'
                                    />
                                    <DefaultInput
                                      type='number'
                                      name={`rooms.${index}.price`}
                                      placeholder='Room Price'
                                    />
                                    <button
                                      type='button'
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      Remove room
                                    </button>
                                  </div>
                                ))
                              : null}
                            <button
                              type='button'
                              onClick={() =>
                                arrayHelpers.push({
                                  room_type: '',
                                  sleeps: '',
                                  price: '',
                                })
                              }
                            >
                              Add room
                            </button>
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <Button btnType='search' submit isDisabled={!formik.isValid}>
                  {isLoading ? (
                    <div className='loader'>
                      <Loader />
                    </div>
                  ) : newProduct ? (
                    'Create product'
                  ) : (
                    'Update product'
                  )}
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HotelForm;
