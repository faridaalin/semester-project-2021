import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import HyperModal from 'react-hyper-modal';
import axios from '../../../utils/axios';
import { DefaultInput } from '../input/Input';
import Button from '../../button/Button';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import { USER_TOKEN } from '../../../config/contants';
import styles from './login.module.css';

const Login = ({ show, setShow }) => {
  const { isLoading, setIsLoading } = useState(false);
  const { fetchError, setFetchError } = useState(null);
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
      console.log('values', values);

      setSubmitting(true);
      try {
        const res = await axios.post('/users/login', {
          email: values.email,
          password: values.password,
        });
        console.log('res', res);
        if (res.status === 200) {
          const { data, token } = res;
          setSubmitting(false);
          setStatus({
            success: true,
          });
          localStorage.setItem(USER_TOKEN, JSON.stringify(token));
          if (typeof window !== 'undefined') {
            router.push('/dashboard');
          }
        }
      } catch (err) {
        if (err.response) {
          // console.log(err.response.data.error.message);
          setErrors({ error: err.response.data.error.message });
          setStatus({
            success: false,
          });
          resetForm();
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  console.log('FORMIK', formik);

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
        {console.log(formik.touched)}
        {formik.errors.password && formik.touched.password && (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
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
