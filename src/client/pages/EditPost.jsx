import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import updatePost from '@wasp/actions/updatePost';

export function EditPost() {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { id: parseInt(postId) });
  const updatePostFn = useAction(updatePost);
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdatePost = () => {
    updatePostFn({ id: parseInt(postId), title, content });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <div className="mb-4">
        <input
          type="text"
          className="px-2 py-1 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <textarea
          className="px-2 py-1 border rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleUpdatePost}
      >
        Update Post
      </button>
      <Link to={`/post/${postId}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
        Cancel
      </Link>
    </div>
  );
}