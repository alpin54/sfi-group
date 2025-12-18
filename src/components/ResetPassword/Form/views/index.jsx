'use client';
// -- libraries
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// -- styles
import style from '@components/ResetPassword/Form/styles/style.module.scss';

// -- hooks
import useFormValidation from '@hooks/useFormValidation';

// API
import resetPasswordModel from '@components/ResetPassword/Form/models';

// -- elements
import Input from '@elements/Input/views';
import Button from '@elements/Button/views';

// -- components
import AuthSectionWidget from '@components/Auth/AuthSection/widgets/Default';
import SuccessModal from '@components/ResetPassword/ModalSuccess/views';

const ResetPassword = (props) => {
  const { customerId, token, data } = props;
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const rules = {
    password: {
      required: true,
      requiredMessage: 'New password is required',
      minLength: 8,
      minLengthMessage: 'New password must be at least 8 characters'
    },
    repeatPassword: {
      required: true,
      requiredMessage: 'Repeat new password is required',
      match: 'password',
      matchMessage: 'Repeat new password does not match'
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormValidation(
    { password: '', repeatPassword: '' },
    rules
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const onSubmit = async () => {
    try {
      const payload = {
        customerId,
        token,
        newPassword: values.password
      };

      const response = await resetPasswordModel.submit(payload);

      if (response?.data) {
        // open success modal instead of immediate redirect
        openModal();
      } else {
        console.log('Failed to reset password');
      }
    } catch (error) {
      console.error('Reset Password Error:', error);
    }
  };

  return (
    <AuthSectionWidget images={data.images} title={data.title} description={data.description}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.row}>
          <label htmlFor='password' className={style.label}>
            New Password
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
          <label htmlFor='repeatPassword' className={style.label}>
            Repeat New Password
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
          <Button type='submit' level='block'>
            Reset Password
          </Button>
        </div>
      </form>
      <SuccessModal
        open={modalOpen}
        onClose={closeModal}
        title='Password Updated! 🎉'
        description='You can now log in with your new password.'
        buttonText='Back to Login'
        onButtonClick={() => {
          closeModal();
          router.push('/sign-in');
        }}
      />
    </AuthSectionWidget>
  );
};

export default ResetPassword;
