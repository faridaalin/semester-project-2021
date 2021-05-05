import Layout from '../components/layout/Layout';
import { DefaultInput } from '../components/form/input/Input';
import Textera from '../components/form/textarea/Textarea';
import PageHeader from '../components/pageHeader/PageHeader';
import Button from '../components/button/Button';
import Column from '../components/column/Column';
import Map from '../components/map/Map';
import styles from './contact.module.css';

export default function Contact() {
  return (
    <Layout>
      <PageHeader title='Contact' />
      <section className={styles.container}>
        <form className={styles.form}>
          <Column>
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
          </Column>
          <Column>
            <DefaultInput
              type='email'
              name='email'
              placeholder='email@email.com'
              label='Email'
            />
            <DefaultInput
              type='text'
              name='subject'
              placeholder='Subject'
              label='Subject'
            />
          </Column>
          <div>
            <Textera
              placeholder='Your message...'
              name='message'
              label='Message'
            />
            <div className={styles.btnContainer}>
              <Button btnType='search'>Send</Button>
            </div>
          </div>
        </form>
        <div>
          <div>
            <h3>Address</h3>
            <p>Håkonsgaten 15</p>
            <p>Bergen, Norway</p>
            <p>+47 1234 5678</p>
          </div>
          <div>
            <Map />
          </div>
        </div>
      </section>
    </Layout>
  );
}
