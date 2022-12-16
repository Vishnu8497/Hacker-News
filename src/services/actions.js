import axios from 'axios';

export const getNewsIds = (type) => {
    return axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json?print=pretty`)
    .then(response => response) 
  }
  
  export const getNews = (id) => {
    return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then(response => response)
  }

  export const getComments = (commentId) => {
    return axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
    .then(response => response)
  }

  

  