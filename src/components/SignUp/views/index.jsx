'use client';

// -- libraries
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// -- styles
import style from '@components/SignUp/styles/style.module.scss';

// -- regex
import { EMAIL, FULL_NAME } from '@configs/regex';

// -- hooks
import useFormValidation from '@hooks/useFormValidation';

// -- elements
import Input from '@elements/Input/views';

import Button from '@elements/Button/views';

// -- components
import AuthSectionWidget from '@components/Auth/AuthSection/widgets/Default';

const SignUp = (props) => {
  const { ready, data, error, onSubmit, loading, message } = props;
  const router = useRouter();

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

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormValidation(
    { name: '', email: '', password: '', repeatPassword: '' },
    rules
  );

  const handleOnSubmit = async (data) => {
    try {
      const response = await onSubmit(data);

      if (response) {
        router.push('/sign-up/success');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <AuthSectionWidget images={data.images} title={data.title} description={data.description}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={style.row}>
          <Input
            type='text'
            name='name'
            placeholder='Full Name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name ? errors.name : ''}
          />
        </div>
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
          <Input
            type='password'
            name='repeatPassword'
            placeholder='Repeat Password'
            icon='eye-slash'
            value={values.repeatPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.repeatPassword && errors.repeatPassword ? errors.repeatPassword : ''}
          />
        </div>
        <div className={style.row}>
          <Button type='submit' level='block'>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
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
            Already have an account?
            <Link className={style.rowLink} href='/sign-in'>
              Log in Now
            </Link>
          </p>
        </div>
      </form>
    </AuthSectionWidget>
  );
};

export default SignUp;
