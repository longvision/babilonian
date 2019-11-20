import axios from 'axios';

const booksUrl = 'https://0s79a28v1e.execute-api.us-east-1.amazonaws.com/dev';

const booksApi = axios.create({
  baseURL: 'https://0s79a28v1e.execute-api.us-east-1.amazonaws.com/dev',
});

export default booksApi;
