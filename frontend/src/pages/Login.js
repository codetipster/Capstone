/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Card, CardContent, TextField, Typography,
} from '@mui/material';
import LoadingOverlay from '../components/LoadingOverlay.jsx'; // Update with your correct path

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading when the request starts

    // POST request to '/auth' route with username and password
    const response = await fetch('http://localhost:5000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setIsLoading(false); // Stop loading when the request is complete

    if (response.ok) {
      // If the response status is 200-299, store the token and redirect

      localStorage.setItem('authToken', data.token);
      setIsAuthenticated(true);
      navigate('/');
    } else {
      // If the response status is outside this range, log the error message from the server
      console.error(data.message);
    }
  };

  if (isLoading) {
    return (
      <LoadingOverlay />
    );
  }

  return (

      <Card sx={{
        maxWidth: 400, margin: 'auto', marginTop: '20%', backgroundColor: '#141414',
      }}>
        <CardContent>
          <Typography variant="h5" component="div" color="white">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{ style: { color: '#fff' } }}
              inputProps={{ style: { color: '#fff' } }}
              sx={{ marginBottom: 2, backgroundColor: '#2F2F2F' }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: '#fff' } }}
              inputProps={{ style: { color: '#fff' } }}
              sx={{ marginBottom: 2, backgroundColor: '#2F2F2F' }}
            />
            <Button variant="contained" type="submit" style={{ backgroundColor: '#0A63E5', color: '#fff' }}>
              Login
          </Button>
          </form>
        </CardContent>
      </Card>

  );
}

export default Login;
