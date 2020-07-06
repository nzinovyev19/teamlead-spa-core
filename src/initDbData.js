exports.__esModule = true;
module.exports = function () {
  const data = {
    users: [
      {
        id: 1,
        login: 'admin',
        password: '12345',
        role: 'writer',
      },
      {
        id: 2,
        login: 'reader',
        password: '12345',
        role: 'reader',
      },
      {
        id: 3,
        login: 'writer',
        password: '12345',
        role: 'writer',
      },
    ],
    posts: [],
  };
  for (let i = 0; i < 25; i += 1) {
    data.posts.push({
      id: i,
      title: `post${i}`,
      description: `description${i}`,
      claps: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: data.users[0].id,
    });
  }
  return data;
};
