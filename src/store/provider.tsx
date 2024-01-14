'use client'

import LoadingFallback from '@/components/Loading';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

const ProviderMain: React.FC<any> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<LoadingFallback/>}>
          {children}
        </Suspense>
      </PersistGate>
    </Provider>
  )
}

export default ProviderMain
