'use client';

// -- libraries
import { useState } from 'react';

// -- models
import modelSignIn from '@components/SignIn/SignInDrawer/models';

// -- views
import SignInDrawerView from '@components/SignIn/SignInDrawer/views';

const SignInDrawer = (props) => {
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

  return <SignInDrawerView {...props} loading={loading} message={message} onSubmit={handleSubmit} />;
};

export default SignInDrawer;
