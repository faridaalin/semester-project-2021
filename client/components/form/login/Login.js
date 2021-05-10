import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useCookies } from 'react-cookie';
import HyperModal from 'react-hyper-modal';
import axios from '../../../utils/axios';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import { USER_TOKEN } from '../../../config/contants';
import useAuthContext from '../../../context/AuthContext';
import styles from './login.module.css';

const Login = ({ show, setShow }) => {
  const { setUser } = useAuthContext();
  const [, setCookie] = useCookies(['isAdmin']);

  const router = useRouter();
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
    onSubmit: async (
      values,
      { setStatus, setErrors, setSubmitting, resetForm }
    ) => {
      setSubmitting(true);
      try {
        const res = await axios.post('/users/login', {
          email: values.email,
          password: values.password,
        });

        if (res.status === 200) {
          const { data } = res;
          setSubmitting(false);
          setStatus({
            success: true,
          });
          setUser(data.user);
          localStorage.setItem(USER_TOKEN, JSON.stringify(data.token));
          console.log('user role', data.user.role);
          if (data.user.role === 'admin') {
            setCookie('isAdmin', 'true', {
              maxAge: 60 * 60,
              path: '/',
            });
            if (typeof window !== 'undefined') {
              router.push('/dashboard');
            }
            return;
          } else {
            setCookie('isAdmin', 'false', {
              maxAge: 60 * 60,
              path: '/',
            });
            if (typeof window !== 'undefined') {
              router.push('/hotels');
            }
            return;
          }
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response);
          console.log(err.response.data.message);
          setErrors({
            error: err.response.data.message,
          });
          setStatus({
            success: false,
          });
        }
      }
    },
  });

  return (
    <HyperModal isOpen={show} requestClose={handleClose}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        {formik.errors && <ErrorMessage>{formik.errors.error}</ErrorMessage>}

        <DefaultInput
          type='email'
          name='email'
          placeholder='email@email.com'
          label='Email'
          value={formik.values.email}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
          <ErrorMessage>{formik.errors.email}</ErrorMessage>
        )}
        <DefaultInput
          type='password'
          name='password'
          placeholder='Password'
          label='Password'
          value={formik.values.password}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
        />

        {formik.errors.password && formik.touched.password && (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        )}
        <div className={styles.btnContainer}>
          <Button color='grey' submit>
            Login
          </Button>
        </div>
      </form>
    </HyperModal>
  );
};

export default Login;
