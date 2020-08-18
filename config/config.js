const config = {
    httpPort: process.env.HTTP_PORT || 3001,
    url : 'https://api.twitter.com/1.1/trends/place.json?id=20070458',
    contentType : 'application/json',
    token: 'Bearer ' + 'AAAAAAAAAAAAAAAAAAAAAAs5%2FAAAAAAA%2BFhxtLDRr2AuKh5zdIHTczhg0Jg%3DltF0dqGzLFlmXH9wjI8HkO1gEzGlnCYUegwIOVVu1Umn8Yi1sX',
    socketToken: 'AAAAAAAAAAAAAAAAAAAAAAs5%2FAAAAAAA%2BFhxtLDRr2AuKh5zdIHTczhg0Jg%3DltF0dqGzLFlmXH9wjI8HkO1gEzGlnCYUegwIOVVu1Umn8Yi1sX',
    streamURL : 'https://api.twitter.com/labs/1/tweets/stream/filter?expansions=author_id',
    authMessage : {
      'message': "Could not authenticate"
    },
    socketErrorMessage : {
      message: "Socket Error" // could be more verbose based in use case scenario
    },
    timeout : 31000
  };
  
  
  module.exports = config;