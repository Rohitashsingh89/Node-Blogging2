import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import { useQuery } from '@wasp/queries';
import createPost from '@wasp/actions/createPost';
import getPosts from '@wasp/queries/getPosts';

export function NewPostPage() {
  const createPostFn = useAction(createPost);
  const { data: posts } = useQuery(getPosts);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    createPostFn({ title, content });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">New Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border rounded py-2 px-3 mb-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="border rounded py-2 px-3 mb-2 resize-y h-40"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Post
      </button>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Recent Posts</h2>
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-gray-100 p-4 mb-4 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2">
              <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-700">By {post.user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}