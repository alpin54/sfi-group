'use client';

// -- libraries
import { useState } from 'react';

// -- models
import modelSignUp from '@components/SignUp/VerificationDealer/models';

// -- components
import VerificationDealer from '@components/SignUp/VerificationDealer/views';

// -- data
import dummyData from '@components/SignUp/VerificationDealer/data';

const VerificationDealerWidget = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (values, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modelSignUp.submit(values, method);

      if (error) {
        setMessage(error.message);
      }

      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <VerificationDealer
      ready={true}
      data={dummyData}
      error={null}
      onSubmit={handleSubmit}
      loading={loading}
      message={message}
    />
  );
};

export default VerificationDealerWidget;
