import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MDEditor from '@uiw/react-md-editor';
import { isEmpty } from 'rambdax';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

import { useAppSelector } from '../../hooks';
import {
  useCreateComment,
  useDeleteComment,
  usePost
} from '../../queries/post';
import { getUserId, getUsername } from '../../selectors/user';
import LinkButton from '../common/linkButton';

const StyledEditor = styled(MDEditor)`
  border-radius: 3px 3px 0 0;
  box-shadow: none;
  .w-md-editor-content {
    border-bottom: 1px solid var(--color-border-default);
  }
`;

const Post = () => {
  const { id } = useParams();
  const { data } = usePost(id!);
  const createComment = useCreateComment(id!);
  const deleteComment = useDeleteComment(id!);
  const user = useAppSelector(getUsername);
  const userId = useAppSelector(getUserId);

  const [editorState, setEditorState] = useState<string | undefined>('');

  return (
    <Box>
      <LinkButton to="../">Back</LinkButton>
      {data && <h1>{data.title}</h1>}
      {data && (
        <ReactMarkdown children={data.content} remarkPlugins={[remarkGfm]} />
      )}
      {user && (
        <>
          <Typography
            sx={{ marginBottom: 1 }}
            color="text.secondary"
            component="div"
          >
            Add comment:
          </Typography>
          <Paper sx={{ marginBottom: 1 }}>
            <StyledEditor
              placeholder="Add a comment..."
              value={editorState}
              onChange={setEditorState}
            />
            <ButtonGroup
              sx={{ justifySelf: 'flex-end' }}
              disableElevation
              variant="contained"
              size="small"
            >
              <Button
                sx={{
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}
                disableElevation
                onClick={() => {
                  createComment.mutate({ content: editorState! });
                  setEditorState('');
                }}
                disabled={!editorState}
              >
                Submit
              </Button>
              <Button
                sx={{
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}
                disableElevation
                onClick={() => setEditorState('')}
              >
                Clear
              </Button>
            </ButtonGroup>
          </Paper>
        </>
      )}
      {!isEmpty(data?.comments) && (
        <>
          <Typography
            sx={{ marginBottom: 1 }}
            color="text.secondary"
            component="div"
          >
            Comments:
          </Typography>
          <Stack spacing={2}>
            {data?.comments.map((comment) => (
              <Paper
                key={comment._id}
                sx={{
                  p: 2,
                  flexGrow: 1
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm container alignItems="center">
                    <Grid item xs container direction="column">
                      <Grid item xs>
                        <ReactMarkdown
                          children={comment.content}
                          remarkPlugins={[remarkGfm]}
                        />
                        <Typography
                          fontStyle="italic"
                          variant="caption"
                          color="text.secondary"
                        >
                          Posted by: {comment.user.username} @{' '}
                          {comment.createdAt}
                        </Typography>
                      </Grid>
                    </Grid>
                    {comment.user._id === userId && (
                      <Grid item>
                        <IconButton
                          onClick={() => deleteComment.mutate(comment._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Post;
