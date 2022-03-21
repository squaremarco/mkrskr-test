import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { useLogin } from '../../queries/user';

const Login = () => {
  const login = useLogin();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ textAlign: 'center' }} variant="h4" component="div">
        Login
      </Typography>
      <TextField
        id="username"
        label="Username"
        variant="standard"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: 2, marginTop: 2 }}
      />
      <TextField
        id="password"
        label="Password"
        variant="standard"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2, marginTop: 2 }}
      />
      <Button
        onClick={() => {
          if (username && password) {
            login.mutate({
              username,
              password
            });
          }
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Login;
