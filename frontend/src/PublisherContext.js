import { createContext, useContext, useState } from 'react';

const PublisherContext = createContext();

export const PublisherProvider = ({ children }) => {
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  const setPublisher = (publisher) => {
    setSelectedPublisher(publisher);
  };

  return (
    <PublisherContext.Provider value={{ selectedPublisher, setPublisher }}>
      {children}
    </PublisherContext.Provider>
  );
};

export const usePublisher = () => {
  const context = useContext(PublisherContext);
  if (!context) {
    throw new Error('usePublisher must be used within a PublisherProvider');
  }
  return context;
};
