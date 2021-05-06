import HyperModal from 'react-hyper-modal';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import styles from './login.module.css';

const Login = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <HyperModal isOpen={show} requestClose={handleClose}>
      <form className={styles.form}>
        <DefaultInput
          type='email'
          name='email'
          placeholder='email@email.com'
          label='Email'
        />
        <DefaultInput
          type='password'
          name='password'
          placeholder='Password'
          label='Password'
        />
        <div className={styles.btnContainer}>
          <Button btnType='search'>Login</Button>
        </div>
      </form>
    </HyperModal>
  );
};

export default Login;
