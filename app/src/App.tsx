import Box from '@mui/material/Box';
import { QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';

import NavBar from './components/navbar';
import NewPost from './components/post/newPost';
import Post from './components/post/post';
import Posts from './components/post/posts';
import Login from './components/user/login';
import Signup from './components/user/signup';
import { useAppDispatch } from './hooks';
import { queryClient } from './queries';
import { fetchUserMe } from './reducers/user';

const App = () => {
  const dispatch = useAppDispatch();

  dispatch(fetchUserMe());

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Box sx={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id" element={<Post />} />
        </Routes>
      </Box>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;
