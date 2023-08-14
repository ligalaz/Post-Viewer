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
  commentModel: {
    body: `body`,
    username: `username`,
  },
};

export default Const;
