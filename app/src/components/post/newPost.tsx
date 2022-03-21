import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MDEditor from '@uiw/react-md-editor';
import { useCallback, useState } from 'react';

import { useAppSelector } from '../../hooks';
import { useCreatePost } from '../../queries/post';
import { getUsername } from '../../selectors/user';
import LinkButton from '../common/linkButton';

const StyledEditor = styled(MDEditor)`
  border-radius: 3px 3px 0 0;
  box-shadow: none;
  .w-md-editor-content {
    border-bottom: 1px solid var(--color-border-default);
  }
`;

const NewPost = () => {
  const createComment = useCreatePost();
  const user = useAppSelector(getUsername);

  const [title, setTitle] = useState<string | undefined>('');
  const [editorState, setEditorState] = useState<string | undefined>('');

  const clearState = useCallback(() => {
    setTitle('');
    setEditorState('');
  }, [setTitle, setEditorState]);

  return (
    <Box>
      <LinkButton to="../">Back</LinkButton>
      {user && (
        <Box>
          <TextField
            id="title"
            label="Title"
            variant="standard"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
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
                  createComment.mutate({
                    title: title!,
                    content: editorState!
                  });
                }}
                disabled={!title || !editorState}
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
                onClick={clearState}
              >
                Clear
              </Button>
            </ButtonGroup>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default NewPost;
