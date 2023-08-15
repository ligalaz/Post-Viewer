const Const = {
  defaultSrc: `https://dummyjson.com/`,
  routes: {
    users: `users`,
    posts: `posts`,
    comments: `comments`,
  },
  selectPost: `userId,title,body,reactions`,
  selectUser: `firstName,maidenName,lastName,company`,
  postSymbolLimit: 100,
  postModel: {
    id: `id`,
    title: `title`,
    userId: `userId`,
    body: `body`,
    reaction: `reactions`,
  },
  commentModel: {
    body: `body`,
    username: `username`,
  },
};

export default Const;
