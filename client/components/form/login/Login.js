import { useFormik } from 'formik';
import { object, string } from 'yup';
import HyperModal from 'react-hyper-modal';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import styles from './login.module.css';

const Login = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const loginSchema = object({
    email: string().required('Required!').email('Invalid email address.'),
    password: string().required('Required!').min(8).max(12),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log('SUBMIT', formik);
      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log('TOUCHED', formik.touched);
  console.log('ERRORS🔥', formik.errors);
  console.log('VALUES', formik.values);

  return (
    <HyperModal isOpen={show} requestClose={handleClose}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <DefaultInput
          type='email'
          name='email'
          placeholder='email@email.com'
          label='Email'
          value={formik.values.email}
          handleChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email && (
          <p>{formik.errors.email}</p>
        )}
        <DefaultInput
          type='password'
          name='password'
          placeholder='Password'
          label='Password'
          value={formik.values.password}
          handleChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password && (
          <p>{formik.errors.password}</p>
        )}
        <div className={styles.btnContainer}>
          <Button btnType='search' submit>
            Login
          </Button>
        </div>
      </form>
    </HyperModal>
  );
};

export default Login;
