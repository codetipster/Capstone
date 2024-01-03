
import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core";
import Homepage from "./pages/Homepage";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from './pages/Login';
import Header from "./components/Header";
import Publisherpage from './pages/Publisherpage';
import LoadingOverlay from './components/LoadingOverlay';
import DataProvider from './providers/DataProvider';


const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));


async function fakeAuthCheck() {
     await new Promise(resolve => setTimeout(resolve, 2000));
     return false;
}


function App() {
  const classes = useStyles();
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
    <DataProvider>
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
        {isAuthenticated ? (
          <Route path="/" exact element={<Home />} />
        ):(
        <Route path="/*" element={<Navigate to="/login" />} />
        )}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/publishers/:id"  element={isAuthenticated ? <Publisherpage /> : <Navigate to="/login" />}
/> 
        </Routes>
      </div>
    </Router>
    </DataProvider>
  );
}

export default App;