import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

type NetworkStatusContextType = {
  isConnected: boolean | null;
};

const NetworkStatusContext = createContext<NetworkStatusContextType | undefined>(undefined);

export const NetworkStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
      console.log('Network state changed:', state.isConnected); // Debugging/logging
      if (state.isConnected == false) {
        console.warn('Unable to connect internet')
      } else {
        console.warn('Internet connection resumed')
      }
    });

    // Cleanup subscription on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkStatusContext.Provider value={{ isConnected }}>
      {children}
    </NetworkStatusContext.Provider>
  );
};

export const useNetworkStatus = () => {
  const context = React.useContext(NetworkStatusContext);
  if (context === undefined) {
    throw new Error('useNetworkStatus must be used within a NetworkStatusProvider');
  }
  return context;
};
