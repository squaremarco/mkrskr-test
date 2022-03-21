import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { usePostsInfinite } from '../../queries/post';

const Posts = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePostsInfinite();

  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      {data?.pages.map((group) =>
        group.response.map((post) => (
          <Paper
            key={post._id}
            sx={{
              p: 2,
              flexGrow: 1,
              cursor: 'pointer'
            }}
          >
            <Grid
              container
              spacing={1}
              onClick={() => navigate(`./${post._id}`)}
            >
              <Grid item xs={12} sm container alignItems="center">
                <Grid item xs container direction="column">
                  <Grid item xs>
                    <Typography variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography
                      fontStyle="italic"
                      variant="caption"
                      color="text.secondary"
                    >
                      Posted by: {post.user.username} @ {post.createdAt}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                    <Chip
                      icon={<ModeCommentOutlinedIcon />}
                      label={post.comments.length}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
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
