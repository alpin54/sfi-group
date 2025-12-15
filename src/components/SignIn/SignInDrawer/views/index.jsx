// -- libraries
import { useState } from 'react';
import Link from 'next/link';

// -- styles
import style from '@components/SignIn/SignInDrawer/styles/style.module.scss';

// -- hooks
import useFormValidation from '@hooks/useFormValidation';

// -- utils
import LocalStorage from '@utils/localStorage';
import CookiesClient from '@utils/cookieClient';

// -- elements
import Drawer from '@elements/Drawer/views';
import Input from '@elements/Input/views';
import Button from '@elements/Button/views';
import Modal from '@components/Elements/Modal/views';

const SignInDrawer = (props) => {
  const { open, onClose, onSubmit, loading, message } = props;
  const [formMessage, setFormMessage] = useState('');
  const [openStatus, setOpenStatus] = useState(false);

  const rules = {
    email: {
      required: true,
      requiredMessage: 'Email is required',
      pattern: /^\S+@\S+\.\S+$/,
      patternMessage: 'Invalid email format'
    },
    password: {
      required: true,
      requiredMessage: 'Password is required',
      minLength: 8,
      minLengthMessage: 'Password must be at least 8 characters'
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setErrors } = useFormValidation(
    { email: '', password: '' },
    rules
  );

  const handleOnSubmit = async (data) => {
    // data is already sanitized by the hook (trimmed, email lowercased)
    try {
      const response = await onSubmit(data);

      // successful response handling
      if (response && response.data) {
        LocalStorage.set('user', response.data);
        CookiesClient.set('user', response.data);
        setFormMessage('Sign in successful!');
        setOpenStatus(true);
        onClose();
        setTimeout(() => {
          setOpenStatus(false);
          window.location.reload();
        }, 1200);
        return;
      }

      // some handlers return errors in different shapes
      if (response && response.errors) {
        setErrors(response.errors);
        return;
      }

      // fallback generic message
      setFormMessage('Sign in failed. Please try again.');
    } catch (err) {
      const resp = err?.response?.data || {};

      if (resp.errors && typeof resp.errors === 'object') {
        setErrors(resp.errors);
        setFormMessage(resp.message || '');
      } else if (resp.message) {
        setErrors({});
        setFormMessage(resp.message);
      } else {
        setErrors({});
        setFormMessage('An unexpected error occurred. Please try again.');
      }

      // keep console for debugging
      console.error('Submission error:', err);
    }
  };

  return (
    <>
      <Drawer open={open} onClose={onClose} variant='auth'>
        <div className={style.content}>
          <h2 className={style.title}>Choose How You’d Like to Checkout</h2>
          <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
            <div className={style.row}>
              <Input
                type='email'
                name='email'
                placeholder='Email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? errors.email : ''}
              />
            </div>
            <div className={style.row}>
              <Input
                type='password'
                name='password'
                placeholder='Password'
                icon='eye-slash'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password ? errors.password : ''}
              />
            </div>
            <div className={style.row}>
              <div className={style.rowItem}>
                <Link className={style.rowLink} href='/forgot-password'>
                  Forgot Password?
                </Link>
              </div>
              <div className={style.rowItem}>
                <Button type='submit' level='block'>
                  Sign In
                </Button>
              </div>
            </div>
            <div className={style.row}>
              <span className={style.rowLine}>OR</span>
            </div>
            <div className={style.row}>
              <ul className={style.rowSosmed}>
                <li className={style.rowSosmedItem}>
                  <Button href='https://facebook.com' variant='icon' color='white' icon='facebook' />
                </li>
                <li className={style.rowSosmedItem}>
                  <Button href='https://google.com' variant='icon' color='white' icon='google' />
                </li>
              </ul>
            </div>
            <div className={style.row}>
              <p className={style.rowText}>
                <Link className={style.rowLink} href='/sign-up'>
                  Sign Up
                </Link>
                or Continue as Guest
                <Link className={style.rowLink} href='/checkout-guest' onClick={onClose}>
                  Click Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Drawer>
      <Modal
        open={openStatus}
        onClose={() => setOpenStatus(false)}
        variant='success'
        title={formMessage || 'Sign In Successful'}
        closeIcon='hide'>
        <p className={style.desc}>You have successfully signed in. You can now proceed with your activities.</p>
      </Modal>
    </>
  );
};

export default SignInDrawer;
