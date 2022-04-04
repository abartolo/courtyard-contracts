import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.ergoplatform.com/api/v0',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  export {api};