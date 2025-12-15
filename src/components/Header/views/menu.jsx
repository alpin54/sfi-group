'use client';

// -- library
import { useEffect } from 'react';

// -- states
import useStateHeader from '@components/Header/states';

const Menu = (props) => {
  const { data } = props;
  // set menu
  const { setMenu } = useStateHeader();

  useEffect(() => {
    setMenu(data);
  }, [data, setMenu]);

  return true;
};

export default Menu;
