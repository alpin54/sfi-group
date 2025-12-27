'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// -- styles
import style from '@components/SignUp/Form/styles/style.module.scss';

// -- regex
import { EMAIL, FULL_NAME } from '@configs/regex';

// -- hooks
import useFormValidation from '@hooks/useFormValidation';

// -- elements
import Input from '@elements/Input/views';
import Button from '@elements/Button/views';

// -- components
import AuthSectionWidget from '@components/Auth/AuthSection/widgets/Default';
import AlertModal from '@components/SignUp/ModalAlert/views';

const SignUp = (props) => {
  const { ready, data, error, onSubmit, loading, message } = props;
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('member');

  // alert modal state (for "email already registered" and other alerts)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: 'Account Already Registered',
    description: 'This email is already linked to an account.',
    buttonText: 'Sign In Now'
  });

  const rules = {
    name: {
      required: true,
      pattern: FULL_NAME,
      patternMessage: 'Invalid full name'
    },
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
    },
    repeatPassword: {
      required: true,
      requiredMessage: 'Repeat password is required',
      match: 'password',
      matchMessage: 'Repeat password does not match'
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setErrors } = useFormValidation(
    { name: '', email: '', password: '', repeatPassword: '' },
    rules
  );

  const openAlert = ({ title, description, buttonText = 'OK', onButtonClick = null }) => {
    setModalProps({ title, description, buttonText, onButtonClick });
    setModalOpen(true);
  };

  const closeAlert = () => {
    setModalOpen(false);
    // clear modalProps if you want
    // setModalProps({ title: '', description: '', buttonText: 'OK', onButtonClick: null });
  };

  const handleOnSubmit = async (data) => {
    try {
      // include selectedRole in payload so backend knows member vs dealer
      const payload = {
        ...data,
        role: selectedRole
      };

      const response = await onSubmit(payload);

      // EXAMPLE: If backend returns structured response with a code
      // adjust the checks below to your API shape
      if (response?.data) {
        // success -> go to verification page
        router.push('/sign-up/verify');
        return;
      }

      // If backend returns specific code indicating email already registered
      // Example shapes handled:
      // - response.code === 'EMAIL_ALREADY_REGISTERED'
      // - response.error === 'Email already registered'
      // - response.message contains 'already registered'
      const resp = response || {};

      if (resp.code === 'EMAIL_ALREADY_REGISTERED' || /already register/i.test(resp.message || resp.error || '')) {
        openAlert({
          title: 'Account Already Registered',
          description: 'This email is already linked to an account. Would you like to sign in instead?',
          buttonText: 'Sign In Now',
          onButtonClick: () => {
            // navigate to sign-in when CTA clicked
            router.push('/sign-in');
          }
        });
        return;
      }

      // If server returned field-level errors
      if (resp.errors && typeof resp.errors === 'object') {
        setErrors(resp.errors);
        return;
      }

      // fallback: show a simple alert modal with server message or generic message
      if (resp.message || resp.error) {
        openAlert({
          title: 'Sign Up Error',
          description: resp.message || resp.error || 'Something went wrong. Please try again.',
          buttonText: 'OK'
        });
        return;
      }

      // final fallback if nothing matched
      openAlert({
        title: 'Sign Up Failed',
        description: 'Unable to sign up. Please try again later.',
        buttonText: 'OK'
      });
    } catch (error) {
      console.error('Submission error:', error);

      // try to read structured response if thrown with axios-like err.response.data
      const resp = error?.response?.data || {};

      if (resp.code === 'EMAIL_ALREADY_REGISTERED' || /already register/i.test(resp.message || resp.error || '')) {
        openAlert({
          title: 'Account Already Registered',
          description: 'This email is already linked to an account. Would you like to sign in instead?',
          buttonText: 'Sign In Now',
          onButtonClick: () => router.push('/sign-in')
        });
        return;
      }

      if (resp.errors && typeof resp.errors === 'object') {
        setErrors(resp.errors);
      }

      openAlert({
        title: 'Sign Up Error',
        description: resp.message || resp.error || 'An unexpected error occurred. Please try again.',
        buttonText: 'OK'
      });
    }
  };

  return (
    <AuthSectionWidget images={data.images} title={data.title} subTitle={data.subTitle}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={style.tabWrap} role='tablist' aria-label='Sign up tabs'>
          <button
            type='button'
            role='tab'
            className={`${style.tabItem} ${selectedRole === 'member' ? style.tabActive : ''}`}
            onClick={() => setSelectedRole('member')}>
            Member
          </button>
          <button
            type='button'
            role='tab'
            className={`${style.tabItem} ${selectedRole === 'dealer' ? style.tabActive : ''}`}
            onClick={() => setSelectedRole('dealer')}>
            Dealer
          </button>
        </div>

        <div className={style.row}>
          <label className={style.label} htmlFor='name'>
            Full Name
          </label>
          <Input
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name ? errors.name : ''}
          />
        </div>

        <div className={style.row}>
          <label className={style.label} htmlFor='email'>
            Email
          </label>
          <Input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? errors.email : ''}
          />
        </div>

        <div className={style.row}>
          <label className={style.label} htmlFor='password'>
            Password
          </label>
          <Input
            type='password'
            name='password'
            icon='eye-slash'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password ? errors.password : ''}
          />
        </div>

        <div className={style.row}>
          <label className={style.label} htmlFor='repeatPassword'>
            Confirm Password
          </label>
          <Input
            type='password'
            name='repeatPassword'
            icon='eye-slash'
            value={values.repeatPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.repeatPassword && errors.repeatPassword ? errors.repeatPassword : ''}
          />
        </div>

        <div className={style.row}>
          <Button type='submit' level='block' disabled={loading} rounded={false}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>

        <div className={style.row}>
          <p className={style.rowText}>
            Already have an account?
            <Link className={style.rowLink} href='/sign-in'>
              Sign In
            </Link>
          </p>
        </div>
      </form>

      <AlertModal
        open={modalOpen}
        onClose={closeAlert}
        title={modalProps.title}
        description={modalProps.description}
        buttonText={modalProps.buttonText}
        onButtonClick={() => {
          closeAlert();
          router.push('/sign-in');
        }}
      />
    </AuthSectionWidget>
  );
};

export default SignUp;
