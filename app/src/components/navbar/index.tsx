import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { login, logout } from '../../reducers/user';
import { getUsername } from '../../selectors/user';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(getUsername);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          sx={!user ? { flexGrow: 1 } : undefined}
          mr={2}
          variant="h5"
          fontWeight="bold"
          component="div"
        >
          Makr Shakr - Test
        </Typography>
        {user && (
          <ButtonGroup color="inherit" size="small" sx={{ flexGrow: 1 }}>
            <Button
              startIcon={<AddCommentOutlinedIcon />}
              onClick={() => navigate('/new')}
            >
              Create
            </Button>
          </ButtonGroup>
        )}
        {user && (
          <Typography mr={2} component="div">
            Welcome, {user}!
          </Typography>
        )}
        {user ? (
          <IconButton color="inherit" onClick={() => dispatch(logout())}>
            <LogoutIcon />
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            onClick={() =>
              dispatch(login({ username: 'test2', password: 'test2' }))
            }
          >
            <LoginIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
