import { useState } from 'react';
import { Formik, Form } from 'formik';
import Layout from '../components/layout/Layout';
import axios from '../utils/axios';
import PageHeader from '../components/pageHeader/PageHeader';
import { DefaultInput } from '../components/form/input/Input';
import Textera from '../components/form/textarea/Textarea';
import Button from '../components/button/Button';
import Column from '../components/column/Column';
import Map from '../components/map/Map';
import {
  contactSchema,
  initialValues,
} from '../validationSchema/contactSchema';
import styles from './contact.module.css';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const onSubmit = async (values, onSubmitProps) => {
    const { resetForm, setStatus } = onSubmitProps;
    setIsLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await axios.post('/messages/create', values);
      console.log('res', res);

      if (res.status === 201) {
        const { data } = res;
        setSuccessMsg('Your message has been sent. We will contact you soon.');
        setIsLoading(false);
        resetForm();
      }
    } catch (error) {
      if (error.response && error.response.status) {
        setErrorMsg('Something went wrong, please try again later.');
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <PageHeader title='Contact' />
      <section className={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={contactSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            console.log('Formik', formik);
            console.log('Status', formik.status);

            return (
              <Form className={styles.form}>
                {successMsg ||
                  (errorMsg && (
                    <div
                      className={`${
                        successMsg ? styles.success : styles.error
                      }`}
                    >
                      <p>{successMsg || errorMsg}</p>
                    </div>
                  ))}
                <Column>
                  <DefaultInput
                    type='text'
                    name='firstname'
                    placeholder='First name'
                    label='First name'
                    customClass={styles.contactInput}
                  />
                  <DefaultInput
                    type='text'
                    name='lastname'
                    placeholder='Last name'
                    label='Last name'
                    customClass={styles.contactInput}
                  />
                </Column>
                <Column>
                  <DefaultInput
                    type='email'
                    name='email'
                    placeholder='email@email.com'
                    label='Email'
                    customClass={styles.contactInput}
                  />
                  <DefaultInput
                    type='text'
                    name='subject'
                    placeholder='Subject'
                    label='Subject'
                    customClass={styles.contactInput}
                  />
                </Column>
                <div>
                  <Textera
                    placeholder='Your message...'
                    name='message'
                    label='Message'
                  />
                  <div className={styles.btnContainer}>
                    <Button
                      btnType='search'
                      submit
                      isDisabled={!formik.isValid || isLoading}
                    >
                      Send Message
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>

        <div className={styles.contact}>
          <div>
            <h3 className={styles.h3}>Address</h3>
            <p className={styles.paragraph}>Håkonsgaten 15</p>
            <p className={styles.paragraph}>Bergen, Norway</p>
            <p className={styles.paragraph}>+47 1234 5678</p>
          </div>
          <div className={styles.map}>
            <Map />
          </div>
        </div>
      </section>
    </Layout>
  );
}
