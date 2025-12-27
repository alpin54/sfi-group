'use client';

// -- libaries
import { useState } from 'react';

// -- models
import profileModel from '@components/Account/MyProfile/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import UserLayout from '@components/Account/Layouts/views';
import MyProfileView from '@components/Account/MyProfile/views';

// -- data
import dummyData from '@components/Account/MyProfile/data';

const MyProfileWidget = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(0);

  // Depend on refresh supaya refetch ketika ada sesuatu berubah
  // const { data } = useFirstLoad(profileModel.list(), [refresh]);

  // -- submit handler
  const handleSubmit = async (payload) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await profileModel.submit(payload);

      if (error) {
        setMessage(error.message);
      } else {
        setRefresh((r) => r + 1);
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
    <UserLayout>
      <MyProfileView data={dummyData} onSubmit={handleSubmit} loading={loading} message={message} />
    </UserLayout>
  );
};

export default MyProfileWidget;
