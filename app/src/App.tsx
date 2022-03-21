import Box from '@mui/material/Box';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';

import NavBar from './components/navbar';
import Post from './components/post/post';
import Posts from './components/post/posts';
import { useAppDispatch } from './hooks';
import { fetchUserMe } from './reducers/user';

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useAppDispatch();

  dispatch(fetchUserMe());

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Box sx={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/:id" element={<Post />} />
        </Routes>
      </Box>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
