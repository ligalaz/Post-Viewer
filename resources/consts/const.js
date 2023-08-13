const Const = {
  defaultSrc: `https://dummyjson.com/`,
  routes: {
    users: `users`,
    posts: `posts`,
    comments: `comments`,
  },
  selectPost: `userId,title,body,reactions`,
  selectUser: `firstName,maidenName,lastName,company`,
  endSkip: 5,
  postSymbolLimit: 100,
};

export default Const;
