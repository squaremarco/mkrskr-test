import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { login } from '../../reducers/user';
import { getUsername } from '../../selectors/user';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUsername);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Makr Shakr - Test
        </Typography>
        {user && <Typography component="div">Welcome, {user}!</Typography>}
        {user ? (
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
        ) : (
          <IconButton color="inherit">
            <LoginIcon
              onClick={() =>
                dispatch(login({ username: 'test2', password: 'test2' }))
              }
            />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
