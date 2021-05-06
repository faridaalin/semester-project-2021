import HyperModal from 'react-hyper-modal';
import { DefaultInput } from '../input/Input';

const Login = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <HyperModal isOpen={show} requestClose={handleClose}>
      <form>
        <DefaultInput
          type='email'
          name='email'
          placeholder='email@email.com'
          label='Email'
        />
        <DefaultInput
          type='password'
          name='password'
          placeholder=''
          label='Password'
        />
      </form>
    </HyperModal>
  );
};

export default Login;
