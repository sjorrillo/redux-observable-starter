const posts = [];
let idCount = 0;

// https://github.com/vnovick/graphql-fullstack-bootcamp/blob/master/Day3/graphql-yoga-example/src/schema.graphql
// https://github.com/vnovick/graphql-fullstack-bootcamp/blob/master/Day3/graphql-yoga-example/src/index.js
// https://typeorm.io/#/
// https://typegraphql.com/

export const resolvers = {
  Query: {
    ping: () => 'Hello from Graphql',
    posts: () => posts,
  },
  Mutation: {
    createDraft: (_parent, { object: args }) => {
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
      const post = posts.find((it) => it.id === args.postId);
      const comment = {
        id: `comment_${new Date().getMilliseconds()}`,
        content: args.content,
      };
      post.comments.push(comment);
      return comment.id;
    },
  },
};
