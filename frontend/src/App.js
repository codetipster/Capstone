import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MainPage from './pages/MainPage';  // Replace with your main page component
import PublisherDetails from './pages/PublisherDetails';  
import LoadingOverlay from './components/LoadingOverlay';  // If you're using a loading overlay
//import Navbar from './components/Navbar';  // Ensure this path is correct

async function fakeAuthCheck() {
  // Return a promise that resolves after a delay
  // In a real app, replace this with your actual authentication check
  await new Promise(resolve => setTimeout(resolve, 2000));
  return false;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const sessionIsValid = await fakeAuthCheck();
      setIsAuthenticated(sessionIsValid);
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggablePercent={60}
        style={{ fontSize: "1.5rem" }} // Custom style here
      />
      <Router>
        <div className="App">
          
          <div className="content">
            <Routes>
              {isAuthenticated ? (
                <Route path="/" element={<MainPage />} />
                
              ) : (
                <Route path="/*" element={<Navigate to="/login" />} />
              )}
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/publishers/:publisherId" element={<PublisherDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
