import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getPosts from '@wasp/queries/getPosts';

export function Home() {
  const { data: posts, isLoading, error } = useQuery(getPosts);
  const [newComment, setNewComment] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = () => {
    // TODO: Implement createComment action
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Posts</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          className='bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <h2 className='text-xl font-bold'>{post.title}</h2>
          <p>Author: {post.user.username}</p>
          <p>{post.content}</p>
          <div className='mt-2'>
            {post.comments.map((comment) => (
              <div key={comment.id} className='bg-gray-200 p-2 mb-2 rounded-lg'>
                <p>{comment.content}</p>
                <p>By: {comment.user.username}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleCreateComment} className='mt-4'>
            <input
              type='text'
              placeholder='New Comment'
              className='px-1 py-2 border rounded text-lg'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
            >
              Add Comment
            </button>
          </form>
          <Link
            to={`/edit-post/${post.id}`}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2'
          >
            Edit Post
          </Link>
        </div>
      ))}
    </div>
  );
}