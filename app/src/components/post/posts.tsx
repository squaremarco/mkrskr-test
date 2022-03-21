import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { usePostsInfinite } from '../../queries/post';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary
}));

const Posts = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePostsInfinite();

  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      {data?.pages.map((group) =>
        group.response.map((post) => (
          <Item key={post._id} onClick={() => navigate(`/${post._id}`)}>
            {post.title} - {post.user.username} - {post.createdAt} - comments:{' '}
            {post.comments.length}
          </Item>
        ))
      )}
      {hasNextPage &&
        (isFetchingNextPage ? (
          <CircularProgress />
        ) : (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            Load More
          </Button>
        ))}
    </Stack>
  );
};

export default Posts;
