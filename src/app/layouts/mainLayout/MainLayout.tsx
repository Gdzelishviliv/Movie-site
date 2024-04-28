import React, { memo } from 'react';
import Header from '@/app/components/header/Header';

const MainLayout = ({ children }:any) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default memo(MainLayout);
