import { Button } from '@mui/material';
import { NavigateOptions, To, useNavigate } from 'react-router-dom';

const LinkButton = (props: {
  children: string;
  to: To;
  navigateOptions?: NavigateOptions;
}) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(props.to, props.navigateOptions)}
      variant="contained"
    >
      {props.children}
    </Button>
  );
};

export default LinkButton;
