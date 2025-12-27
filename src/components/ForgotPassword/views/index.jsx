'use client';

import { useRouter } from 'next/navigation';

// -- styles
import style from '@components/ForgotPassword/styles/style.module.scss';

// -- hooks
import useFormValidation from '@hooks/useFormValidation';

// -- API model
import forgotPasswordModel from '@components/ForgotPassword/models';

// -- elements
import Input from '@elements/Input/views';
import Button from '@elements/Button/views';

// -- components
import AuthSectionWidget from '@components/Auth/AuthSection/widgets/Default';

const ForgotPassword = (props) => {
  const { ready, data, error } = props;
  const router = useRouter();

  const rules = {
    email: {
      required: true,
      requiredMessage: 'Email is required',
      pattern: /^\S+@\S+\.\S+$/,
      patternMessage: 'Invalid email format'
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormValidation({ email: '' }, rules);

  // ⬇ onSubmit sekarang di client component
  const onSubmit = async () => {
    try {
      const payload = { email: values.email };
      const response = await forgotPasswordModel.submit(payload);

      if (response?.data) {
        router.push('/forgot-password/success');
      } else {
        console.log('Failed submit');
      }
    } catch (error) {
      console.error('Submit Error:', error);
    }
  };

  return (
    <AuthSectionWidget images={data.images} title={data.title} subTitle={data.subTitle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.row}>
          <label htmlFor='email' className={style.label}>
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
          <Button type='submit' level='block' rounded={false}>
            Send Email
          </Button>
        </div>
      </form>
    </AuthSectionWidget>
  );
};

export default ForgotPassword;
