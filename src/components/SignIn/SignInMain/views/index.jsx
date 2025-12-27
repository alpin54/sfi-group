// -- libraries ---
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
import RewardModal from '@components/SignIn/ModalReward/views';
import AlertModal from '@components/SignIn/ModalAlert/views';

// -- assets
import IconEarn from '@assets/image/icon/reward/point-logo.png';
import IconRedeem from '@assets/image/icon/reward/hanbag.svg';
import IconExpire from '@assets/image/icon/reward/calendar.svg';
import IconMinSpend from '@assets/image/icon/reward/money.svg';

const SignInMain = (props) => {
  const { ready, data, error, onSubmit, loading, message } = props;
  const router = useRouter();
  const [formMessage, setFormMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('member');

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

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

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setErrors } = useFormValidation(
    { email: '', password: '' },
    rules
  );

  const handleOnSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        role: selectedRole
      };

      const response = await onSubmit(payload);

      if (response && response.data) {
        LocalStorage.set('user', response.data);
        CookiesClient.set('user', response.data);
        router.push('/');
        return;
      }

      if (response && response.errors) {
        setErrors(response.errors);
        return;
      }

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

      console.error('Submission error:', err);
    }
  };

  // sample reward data per role (you will replace with dynamic data)
  const rewardData = {
    member: {
      title: 'Member Rewards',
      items: [
        { id: 'earn', icon: IconEarn, title: 'Earn Points', description: 'Earn 1 point for every Rp100.000 spent.' },
        {
          id: 'redeem',
          icon: IconRedeem,
          title: 'Redeem Points',
          description: 'Redeem points for discounts on your next purchase.'
        },
        {
          id: 'expire',
          icon: IconExpire,
          title: 'Expiration',
          description: 'Points expire 1 year from the date earned.'
        },
        {
          id: 'min',
          icon: IconMinSpend,
          title: 'Minimum Spend',
          description: 'Minimum spend of Rp100,000 required to start earning points.'
        }
      ],
      cta: {
        label: 'Start Earning Rewards',
        onClick: () => {
          /* optional callback: navigate or open flow */
        }
      }
    },
    dealer: {
      title: 'Dealer Rewards',
      items: [
        {
          id: 'dealer-earn',
          icon: IconEarn,
          title: 'Dealer Points',
          description: 'Dealer-specific points and incentives.'
        },
        {
          id: 'dealer-program',
          icon: IconRedeem,
          title: 'Dealer Program',
          description: 'Special pricing & bulk rewards.'
        }
      ],
      cta: { label: 'Contact Sales', onClick: () => {} }
    }
  };

  const openRewardModal = () => {
    setModalOpen(true);
  };

  const closeRewardModal = () => {
    setModalOpen(false);
  };

  // pick data based on selectedRole
  const modalProps = selectedRole === 'dealer' ? rewardData.dealer : rewardData.member;

  return (
    <AuthSectionWidget images={data.images} title={data.title} subTitle={data.subTitle}>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        {formMessage ? <div className={style.formMessage}>{formMessage}</div> : null}

        {/* Unlock Reward button */}
        <div className={style.rewardWrap}>
          <button type='button' className={style.rewardBtn} onClick={openRewardModal} aria-label='Unlock reward'>
            Unlock reward points and start earning today
          </button>
        </div>

        {/* Tabs: Member / Dealer */}
        <div className={style.tabWrap} role='tablist' aria-label='Sign in tabs'>
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
            aria-invalid={Boolean(touched.email && errors.email)}
          />
        </div>

        <div className={style.row}>
          <label htmlFor='password' className={style.label}>
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
            <Button type='submit' level='block' disabled={loading} rounded={false}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </div>

        <div className={style.row}>
          <p className={style.rowText}>
            Don&#39;t have an account?
            <Link className={style.rowLink} href='/sign-up'>
              Sign Up
            </Link>
          </p>
        </div>
      </form>

      {/* Modal Reward */}
      <RewardModal
        open={modalOpen}
        onClose={closeRewardModal}
        title={modalProps.title}
        items={modalProps.items}
        cta={modalProps.cta}
      />
      {/* Modal Alert */}
      {/* <AlertModal
        open={modalOpen}
        onClose={closeRewardModal}
        title='Account Not Verified'
        description='Your account hasn’t been verified yet. Please check your email or phone for the verification link/code.'
        buttonText='Try Again'
        onButtonClick={() => {}}
      /> */}
    </AuthSectionWidget>
  );
};

export default SignInMain;
