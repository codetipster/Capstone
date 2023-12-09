import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from './pages/Login';
//import PublisherDetails from './pages/PublisherDetails';  
import LoadingOverlay from './components/LoadingOverlay';  // If you're using a loading overlay
//import Dashboard from './pages/Dashboard/Dashboard';
//import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import { ColorModeContext, useMode } from './theme';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import Topbar from './scenes/global/Topbar';
// import Sidebarr from './scenes/global/Sidebarr';
//import Sidenav from './components/Sidenav';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import DataProvider from './providers/DataProvider';



async function fakeAuthCheck() {
  // Return a promise that resolves after a delay
  // In a real app, replace this with your actual authentication check
  await new Promise(resolve => setTimeout(resolve, 2000));
  return false;
}

function App() {
   const [isLoading, setIsLoading] = useState(true);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [theme, colorMode] = useMode();

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
    // <ColorModeContext.Provider value={colorMode}>
    // <ThemeProvider theme={theme}>
    // <CssBaseline />
    // <div className='app'>
    // <Router>
    //   <Sidebarr />
    //  <main className='content'>
    //   <Topbar />

      
    //     <Routes>
    //       {isAuthenticated ? (
    //         <Route path="/" element={<Dashboard />} />      
    //         ) : (
    //         <Route path="/*" element={<Navigate to="/login" />} />
    //       )}
    //       <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
    //           -  {/* <Route path="/team" element={<Team />} /> */}
    //           -  {/* <Route path="/contacts" element={<Contacts />} /> */}
    //            - {/* <Route path="/invoices" element={<Invoices />} /> */}
    //           -  {/* <Route path="/form" element={<Form />} /> */}
    //           -  {/* <Route path="/bar" element={<Bar />} /> */}
    //           -  {/* <Route path="/pie" element={<Pie />} /> */}
    //           -  {/* <Route path="/line" element={<Line />} /> */}
    //            - {/* <Route path="/faq" element={<FAQ />} /> */}
    //           -  {/* <Route path="/calendar" element={<Calendar />} /> */}
    //           -  {/* <Route path="/geography" element={<Geography />} /> */}
    //     </Routes>
     
    //  </main>
    //  </Router>
    // </div>  
    // </ThemeProvider>
    // </ColorModeContext.Provider>
    <>
    <DataProvider>
     <Router>
       <Routes>
       {isAuthenticated ? (
        <Route path="/" exact element={<Home />} />
       ):(
        <Route path="/*" element={<Navigate to="/login" />} />
       )}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings/>} />
       </Routes>
     </Router>
   </DataProvider>  
    </>
  );
}

export default App;
