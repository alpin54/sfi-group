// -- libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// -- styles
import style from '@components/SignIn/SignInMain/styles/style.module.scss';

// -- configs
import { EMAIL } from '@configs/regex';

// -- hooks
import useFormValidation from '@hooks/useFormValidation';

// -- utils
import LocalStorage from '@utils/localStorage';
import CookiesClient from '@utils/cookieClient';

// -- elements
import Input from '@elements/Input/views';
import Button from '@elements/Button/views';

// -- components
import AuthSectionWidget from '@components/Auth/AuthSection/widgets/Default';

const SignInMain = (props) => {
  const { ready, data, error, onSubmit, loading, message } = props;
  const router = useRouter();
  const [formMessage, setFormMessage] = useState('');

  const rules = {
    email: {
      required: true,
      requiredMessage: 'Email is required',
      pattern: EMAIL,
      patternMessage: 'Invalid email format'
    },
    password: {
      required: true,
      requiredMessage: 'Password is required',
      minLength: 8,
      minLengthMessage: 'Password must be at least 8 characters'
    }
  };

  // NOTE: useFormValidation now exposes setErrors and sanitizes values on submit
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
        router.push('/');
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
    <AuthSectionWidget images={data.images} title={data.title} description={data.description}>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        {formMessage ? <div className={style.formMessage}>{formMessage}</div> : null}
        <div className={style.row}>
          <Input
            type='email'
            name='email'
            placeholder='Email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? errors.email : ''}
            aria-invalid={Boolean(touched.email && errors.email)}
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
            aria-invalid={Boolean(touched.password && errors.password)}
          />
        </div>
        <div className={style.row}>
          <div className={style.rowItem}>
            <Link className={style.rowLink} href='/forgot-password'>
              Forgot Password?
            </Link>
          </div>
          <div className={style.rowItem}>
            <Button type='submit' level='block' disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
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
            Don&#39;t have an account?
            <Link className={style.rowLink} href='/sign-up'>
              Register Now
            </Link>
          </p>
        </div>
      </form>
    </AuthSectionWidget>
  );
};

export default SignInMain;
