import { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { Loader } from 'react-feather';
import { DefaultInput } from '../input/Input';
import Textera from '../textarea/Textarea';
import Button from '../../button/Button';
import axios from '../../../utils/axios';
import Alert from '../../alert/Alert';

import styles from './hotelForm.module.css';

const HotelForm = ({
  schema,
  initalValues,
  rating,
  newProduct,
  endpoint,
  token,
  update,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(null);

  const onSubmit = async (values, onSubmitProps) => {
    setFetchStatus(null);
    const { resetForm } = onSubmitProps;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let res;
      if (update) {
        res = await axios.patch(endpoint, values, options);
      } else {
        res = await axios.post(endpoint, values, options);
      }

      if (res.status === 200) {
        setIsLoading(false);
        update && localStorage.removeItem('itemToUpdate');

        setFetchStatus({
          sent: true,
          msg: `${values.title} has been ${update ? 'updated' : 'created'}.`,
        });
        if (update) {
          setDisableButton(false);
        } else {
          resetForm();
        }
      }
    } catch (error) {
      if (error.response && error.response.status) {
        if (error.response.status === 409) {
          return setFetchStatus({
            sent: false,
            msg: 'This Hotel already exist.',
          });
        } else if (error.response.status === 404) {
          return setFetchStatus({
            sent: false,
            msg: 'Resource not found',
          });
        } else {
          setFetchStatus({
            sent: false,
            msg: 'Something went wrong, please try again later.',
          });
        }
      } else {
        setFetchStatus({
          sent: false,
          msg: 'Something went wrong, please try again later.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initalValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className={styles.form}>
            {!fetchStatus ? null : <Alert status={fetchStatus} />}
            <div>
              <p className={styles.title}>Details</p>
              <div className={styles.innerForm}>
                <div className={styles.flex}>
                  <DefaultInput
                    type='text'
                    name='title'
                    placeholder='Name'
                    label='Hotel name'
                  />
                  <DefaultInput
                    type='text'
                    name='address'
                    placeholder='Address'
                    label='Hotel Address'
                  />
                  <DefaultInput
                    type='text'
                    name='subheading'
                    placeholder='Subheading'
                    label='Subheading'
                  />
                  <Textera
                    placeholder='Hotel description...'
                    name='description'
                    label='Description'
                    formik={formik}
                  />

                  {rating && (
                    <DefaultInput
                      type='number'
                      name='rating'
                      placeholder=''
                      label='Rating'
                    />
                  )}

                  <DefaultInput
                    type='url'
                    name='main_image'
                    placeholder='url'
                    label='Main Image'
                  />
                  <DefaultInput
                    type='text'
                    name='category'
                    placeholder='"Ski Resort"'
                    label='Category'
                  />
                  <div>
                    <p className={styles.title}>Images</p>

                    <FieldArray name='images'>
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const images = form.values.images;
                        return (
                          <>
                            {images &&
                              images.map((image, index) => (
                                <div
                                  key={index}
                                  className={styles.imagesContainer}
                                >
                                  <DefaultInput
                                    type='url'
                                    name={`images[${index}]`}
                                    placeholder='Image url'
                                  />
                                  {index > 0 && (
                                    <button
                                      type='button'
                                      className={styles.removeButton}
                                      onClick={() => remove(index)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              ))}
                            <div>
                              <button
                                type='button'
                                className={styles.addButton}
                                onClick={() => push('')}
                              >
                                Add
                              </button>
                            </div>
                          </>
                        );
                      }}
                    </FieldArray>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div>
                    <p className={styles.title}>Room Types</p>
                    <FieldArray name='rooms'>
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const rooms = form.values.rooms;
                        return (
                          <>
                            {rooms && rooms.length > 0
                              ? rooms.map((room, index) => (
                                  <div
                                    className={styles.roomsContainer}
                                    key={index}
                                  >
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
                                    {index > 0 && (
                                      <button
                                        type='button'
                                        className={styles.removeButton}
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                ))
                              : null}
                            <button
                              type='button'
                              className={styles.addButton}
                              onClick={() =>
                                push({
                                  room_type: '',
                                  sleeps: '',
                                  price: '',
                                })
                              }
                            >
                              Add
                            </button>
                          </>
                        );
                      }}
                    </FieldArray>
                  </div>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <Button
                  btnType='search'
                  submit
                  isDisabled={!formik.isValid || disableButton}
                >
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
