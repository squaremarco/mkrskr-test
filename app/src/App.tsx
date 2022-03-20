import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';

import NavBar from './components/navbar';
import Post from './components/post/post';
import Posts from './components/post/posts';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NavBar />
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/:id" element={<Post />} />
    </Routes>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
