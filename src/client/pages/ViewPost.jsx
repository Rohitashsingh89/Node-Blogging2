import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import createComment from '@wasp/actions/createComment';

export function ViewPost() {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { id: postId });
  const createCommentFn = useAction(createComment);
  const [commentContent, setCommentContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = () => {
    createCommentFn({ content: commentContent, postId });
    setCommentContent('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold'>{post.title}</h1>
      <p className='text-gray-600'>by {post.author.username}</p>
      <p className='mt-4'>{post.content}</p>

      <hr className='my-4' />

      <h2 className='text-xl font-bold'>Comments</h2>
      {post.comments.map((comment) => (
        <div key={comment.id} className='bg-gray-100 p-4 my-4 rounded-lg'>
          <p className='text-gray-600'>{comment.content}</p>
          <p className='text-gray-400'>by {comment.author.username}</p>
        </div>
      ))}

      <hr className='my-4' />

      <h2 className='text-xl font-bold'>New Comment</h2>
      <textarea
        className='border p-2 mt-2 w-full'
        placeholder='Write your comment here'
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      ></textarea>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
        onClick={handleCreateComment}
      >
        Add Comment
      </button>
      <Link to='/' className='mt-2 text-blue-500'>Back to Home</Link>
    </div>
  );
}