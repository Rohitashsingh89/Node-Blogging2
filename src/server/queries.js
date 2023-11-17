import HttpError from '@wasp/core/HttpError.js'

export const getPosts = async (args, context) => {
  return context.entities.Post.findMany({
    include: { user: true }
  });
}

export const getPost = async ({ id }, context) => {
  const post = await context.entities.Post.findUnique({
    where: { id },
    include: { user: true, comments: true }
  });

  if (!post) throw new HttpError(404, `Post with id ${id} not found`);

  return post;
}