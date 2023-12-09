// DataProvider.js
import React, { useState, useEffect } from 'react';
import DataContext from '../contexts/DataContext';

const DataProvider = ({ children }) => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [publisherId, setPublisherId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    fetch('https://reports.asadcdn.com:5200/getViewablePublishers', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Server response was not ok. Status: ${response.status} ${response.statusText}`);
      }
    })
    .then(data => {
      setPublishers(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setError(error);
      setLoading(false);
    });
  }, []);

  

  return (
    <DataContext.Provider value={{ publishers,publisherId, setPublisherId, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
