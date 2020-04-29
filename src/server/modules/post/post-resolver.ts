const posts = [];
let idCount = 0;

export const resolvers = {
  Query: {
    ping: () => 'Hello from Graphql',
    posts: () => posts,
  },
  Mutation: {
    createDraft: (_parent, args) => {
      const post = {
        id: `post_${idCount++}`,
        title: args.title,
        content: args.content,
        comments: [],
      };
      posts.push(post);
      return post;
    },
    addComment: (_parent, args) => {
      const post = posts.find(it => it.id === args.postId);
      const comment = {
        id: `comment_${new Date().getMilliseconds()}`,
        content: args.content,
      };
      post.comments.push(comment);
      return comment.id;
    },
  },
};
