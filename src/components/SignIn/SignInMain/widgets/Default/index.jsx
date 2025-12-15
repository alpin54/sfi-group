'use client';

// -- libraries
import { useState } from 'react';

// -- models
import modelSignIn from '@components/SignIn/SignInMain/models';

// -- components
import SignIn from '@components/SignIn/SignInMain/views';

// -- data
import dummyData from '@components/SignIn/SignInMain/data';

const SignInWidget = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (values, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modelSignIn.submit(values, method);

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
    <SignIn ready={true} data={dummyData} error={null} onSubmit={handleSubmit} loading={loading} message={message} />
  );
};

export default SignInWidget;
