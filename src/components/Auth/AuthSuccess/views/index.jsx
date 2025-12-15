'use client';

// -- libraries
import { useState } from 'react';

// -- styles
import style from '@components/Auth/AuthSuccess/styles/style.module.scss';

// -- configs
import { EMAIL } from '@configs/regex';

// -- hooks
import useFormValidation from '@hooks/useFormValidation';

// -- states
import useStateHeader from '@components/Header/states';

// -- elements
import Button from '@elements/Button/views';

// -- components
import AuthSectionWidget from '@components/Auth/AuthSection/widgets/Default';

// -- elements
import Input from '@elements/Input/views';

import Modal from '@elements/Modal/views';

const AuthSuccess = (props) => {
  const { ready, data } = props;
  const { menu } = useStateHeader();
  const [openModal, setOpenModal] = useState(false);
  const rules = {
    email: {
      required: true,
      requiredMessage: 'Email is required',
      pattern: EMAIL,
      patternMessage: 'Invalid email format'
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormValidation({ email: '' }, rules);

  const onValid = (data) => {
    // handle ForgotPassword
    console.log('ForgotPassword data: ', data);
  };

  return (
    <>
      <AuthSectionWidget images={data.images} title={data.title} description={data.description}>
        <div className={style.row}>
          <Button href='/sign-in' level='block'>
            BACK TO SIGN IN
          </Button>
        </div>
        {menu === 'success-verify-email' && (
          <div className={style.row}>
            <p className={style.rowText}>
              Entered the wrong email?
              <button type='button' className={style.rowLink} onClick={() => setOpenModal(true)}>
                Register Now
              </button>
            </p>
          </div>
        )}
      </AuthSectionWidget>
      <Modal open={openModal} onClose={() => setOpenModal(false)} title='Email'>
        <form className={style.form} onSubmit={handleSubmit(onValid)}>
          <div className={style.formRow}>
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
          <div className={style.formRow}>
            <Button type='submit' level='block'>
              Verification
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AuthSuccess;
