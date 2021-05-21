import { useState } from 'react';
import { Formik, Form } from 'formik';
import Layout from '@/components/layout/Layout';
import axios from '@/utils/axios';
import PageHeader from '@/components/pageHeader/PageHeader';
import { DefaultInput } from '@/components/form/input/Input';
import Textera from '@/components/form/textarea/Textarea';
import Button from '@/components/button/Button';
import Column from '@/components/column/Column';
import Map from '@/components/map/Map';
import { contactSchema, initialValues } from '@/validationSchema/contactSchema';
import Alert from '@/components/alert/Alert';
import styles from './contact.module.css';

Contact.title = 'Contact';
Contact.description = 'Contact us for any questions.';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(null);

  const onSubmit = async (values, onSubmitProps) => {
    const { resetForm } = onSubmitProps;
    setIsLoading(true);
    setFetchStatus(null);

    try {
      const res = await axios.post('/messages/create', values);

      if (res.status === 201) {
        setFetchStatus({
          sent: true,
          msg: 'Your message has been sent. We will contact you soon.',
        });
        setIsLoading(false);
        resetForm();
      }
    } catch (error) {
      if (error.response && error.response.status) {
        setFetchStatus({
          sent: false,
          msg: 'Something went wrong, please try again later.',
        });
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
            return (
              <Form className={styles.form}>
                {!fetchStatus ? null : <Alert status={fetchStatus} />}
                <Column>
                  <div className={styles.space}>
                    <DefaultInput
                      type='text'
                      name='firstname'
                      placeholder='First name'
                      label='First name'
                      customClass={styles.contactInput}
                    />
                  </div>

                  <div className={styles.space}>
                    <DefaultInput
                      type='text'
                      name='lastname'
                      placeholder='Last name'
                      label='Last name'
                      customClass={styles.contactInput}
                    />
                  </div>
                </Column>
                <Column>
                  <div className={styles.space}>
                    <DefaultInput
                      type='email'
                      name='email'
                      placeholder='email@email.com'
                      label='Email'
                      customClass={styles.contactInput}
                    />
                  </div>
                  <div className={styles.space}>
                    <DefaultInput
                      type='text'
                      name='subject'
                      placeholder='Subject'
                      label='Subject'
                      customClass={styles.contactInput}
                    />
                  </div>
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
