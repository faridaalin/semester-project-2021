import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import { useCookies } from 'react-cookie';
import { X, Loader } from 'react-feather';
import axios from '../../../utils/axios';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import { USER_TOKEN } from '../../../config/contants';
import styles from './login.module.css';

const Login = ({ setLoginModal }) => {
  const [, setCookie] = useCookies(['isAdmin']);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginSchema = object({
    email: string().required('Required!').email('Invalid email address.'),
    password: string().required('Required!').min(8).max(12),
  });

  const onSubmit = async (values, onSubmitProps) => {
    const { setStatus } = onSubmitProps;
    setIsLoading(true);
    try {
      const res = await axios.post('/users/login', {
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        const { data } = res;
        setStatus({
          sent: true,
          msg: 'Your are logged in now.',
        });

        if (data.user.role === 'admin') {
          setCookie('isAdmin', 'admin', {
            maxAge: 86400 * 3,
            path: '/',
          });

          if (typeof window !== 'undefined') {
            console.log('Push to dash');
            router.push('/dashboard');
          }
        } else {
          setCookie('isAdmin', 'public', {
            maxAge: 86400 * 3,
            path: '/',
          });
          if (typeof window !== 'undefined') {
            console.log('Push to dash');
            router.push('/hotels');
          }
        }
        setLoginModal(false);
      }
    } catch (error) {
      if (error.response && error.response.status) {
        if (error.response.status === 403) {
          setStatus({
            sent: false,
            msg: error.response.data.message,
          });
        } else {
          setStatus({
            sent: false,
            msg: 'Something went wrong, please try again later.',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className={styles.form}>
            {formik.status && formik.status.msg && (
              <ErrorMessage>{formik.status.msg}</ErrorMessage>
            )}
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
              <Button btnType='search' submit isDisabled={!formik.isValid}>
                {isLoading ? (
                  <div className='loader'>
                    <Loader />
                  </div>
                ) : (
                  'Login'
                )}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
