import { useNavigate } from 'react-router-dom';

import { usePostsInfinite } from '../../queries';

const Posts = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePostsInfinite();

  const navigate = useNavigate();

  return (
    <div>
      <ul>
        {data?.pages.map((group) =>
          group.response.map((post) => (
            <li key={post._id} onClick={() => navigate(`/${post._id}`)}>
              {post.title}
            </li>
          ))
        )}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Posts;
