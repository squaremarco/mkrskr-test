import { Link, useParams } from 'react-router-dom';

import { usePost } from '../../queries';

const Post = () => {
  const { id } = useParams();
  const { data } = usePost(id!);

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
    </div>
  );
};

export default Post;
