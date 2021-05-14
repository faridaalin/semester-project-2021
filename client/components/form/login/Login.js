import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import PureModal from 'react-pure-modal';
import { object, string } from 'yup';
import { useCookies } from 'react-cookie';
import { X, Loader } from 'react-feather';
import axios from '../../../utils/axios';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import { USER_TOKEN } from '../../../config/contants';
import styles from './login.module.css';

const Login = ({ modal, setModal }) => {
  const [, setCookie] = useCookies(['isAdmin']);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClose = () => setModal(false);

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

        console.log('user role', data.user.role);
        if (data.user.role === 'admin') {
          setCookie('isAdmin', 'admin', {
            maxAge: 60 * 60,
            path: '/',
          });
          console.log('typeof window !== undef', typeof window !== 'undefined');
          if (typeof window !== 'undefined') {
            router.push('/dashboard');
          }
          return;
        } else {
          setCookie('isAdmin', 'public', {
            maxAge: 60 * 60,
            path: '/',
          });
          if (typeof window !== 'undefined') {
            router.push('/hotels');
          }
          return;
        }
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
    <PureModal
      header={
        <span onClick={() => setModal(false)}>
          <X />
        </span>
      }
      isOpen={modal}
    >
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
                <Button color='grey' submit isDisabled={!formik.isValid}>
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
    </PureModal>
  );
};

export default Login;
