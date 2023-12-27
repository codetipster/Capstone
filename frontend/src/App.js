// import React, { useState, useEffect } from 'react';
// import 'react-toastify/dist/ReactToastify.css';

// //import PublisherDetails from './pages/PublisherDetails';  
// import LoadingOverlay from './components/LoadingOverlay';  // If you're using a loading overlay
// import Settings from './pages/Settings';
// import Home from './pages/Home';
// import Homepage from './pages/Homepage';
// import Analytics from './pages/Analytics';
// import DataProvider from './providers/DataProvider';
// import Header from "./components/Header";





// async function fakeAuthCheck() {
//   // Return a promise that resolves after a delay
//   // In a real app, replace this with your actual authentication check
//   await new Promise(resolve => setTimeout(resolve, 2000));
//   return false;
// }

// function App() {
//    const [isLoading, setIsLoading] = useState(true);
//    const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // const [theme, colorMode] = useMode();
//   const classes = useStyles();

//    useEffect(() => {
//      const checkAuthentication = async () => {
//        const sessionIsValid = await fakeAuthCheck();
//        setIsAuthenticated(sessionIsValid);
//        setIsLoading(false);
//      };

//      checkAuthentication();
//    }, []);

//    if (isLoading) {
//      return <LoadingOverlay />;
//    }

//   return (
    
//     <>
//     <DataProvider>
//      <Router>
//        <Routes>
//        {isAuthenticated ? (
//         <Route path="/" exact element={<Homepage />} />
//        ):(
//         <Route path="/*" element={<Navigate to="/login" />} />
//        )}
//           <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//           <Route path="/analytics" element={<Analytics />} />
//           <Route path="/settings" element={<Settings/>} />
//        </Routes>
//      </Router>
//    </DataProvider>  
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core";
import Homepage from "./pages/Homepage";
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
     // Return a promise that resolves after a delay
     // In a real app, replace this with your actual authentication check
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
         <Route path="/" exact element={<Homepage />} />
        ):(
        <Route path="/*" element={<Navigate to="/login" />} />
        )}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/publishers/:id" element={<Publisherpage />} />
        </Routes>
      </div>
    </Router>
    </DataProvider>
  );
}

export default App;