import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { useCookies } from 'react-cookie';
import { Loader } from 'react-feather';
import axios from '@/utils/axios';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import { COOKIE_VALUE, IS_ADMIN, COOKIE_PUBLIC, JWT } from '../../../contants';
import styles from './login.module.css';

const Login = ({ setLoginModal }) => {
  const [, setCookie] = useCookies([IS_ADMIN]);
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
          msg: 'Your are now logged in.',
        });

        if (data.user.role === COOKIE_VALUE) {
          setCookie(IS_ADMIN, COOKIE_VALUE, {
            maxAge: 86400,
            path: '/',
          });
          setCookie(JWT, data.token, {
            maxAge: 86400,
            path: '/',
          });

          if (typeof window !== 'undefined') {
            router.push('/dashboard');
          }
        } else {
          setCookie(IS_ADMIN, COOKIE_PUBLIC, {
            maxAge: 86400,
            path: '/',
          });
          setCookie(JWT, data.token, {
            maxAge: 86400,
            path: '/',
          });
          if (typeof window !== 'undefined') {
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
