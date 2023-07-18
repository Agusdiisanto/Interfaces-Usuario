import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TWITTER_URL = "http://192.168.0.13:8080/";
const HEADER_AUTH = "Authorization";


const axiosInstance = Axios.create({
  baseURL: TWITTER_URL,
  timeout: 2000, // Establece el tiempo límite = 2 segundos
});

const getToken = () =>
  AsyncStorage.getItem(HEADER_AUTH)
    .then((response) => response)
    .catch((error) => Promise.reject(error));

const setToken = (token) => {
  AsyncStorage.setItem(HEADER_AUTH, token)
    .then()
    .catch((error) => Promise.reject(error));
};

const clearToken = () => AsyncStorage.removeItem(HEADER_AUTH);

const header = () =>
  getToken()
    .then((response) => ({ headers: { [HEADER_AUTH]: response } }))
    .catch((error) => console.log(error));

const get = (url) =>
  header()
    .then((token) => axiosInstance.get(url, token))
    .catch((error) => console.log(error));

const post = (url, body) =>
  axiosInstance
    .post(url, body)
    .then((response) => response)
    .catch((error) => Promise.reject(error.response.data));

const postConToken = (url, body) =>
  header()
    .then((token) => axiosInstance.post(url, body, token))
    .catch((error) => Promise.reject(error.response.status));

const put = (url) =>
  header()
    .then((token) => axiosInstance.put(url, {}, token))
    .catch((error) => Promise.reject(error.response.status));

const login = (body) => post(`${TWITTER_URL}login`, body);

const register = (body) => post(`${TWITTER_URL}register`, body);

const loggedUser = () => {
  return get(`${TWITTER_URL}user`);
};

const followingTweets = () => {
  return get(`${TWITTER_URL}user/followingTweets`);
};

const usersToFollow = () => {
  return get(`${TWITTER_URL}user/usersToFollow`);
};

const getUser = (id) => {
  return get(`${TWITTER_URL}user/${id}`);
};

const follow = (id) => {
  return put(`${TWITTER_URL}user/${id}/follow`, header());
};

const search = (searchText) => {
  return get(`${TWITTER_URL}search?text=${searchText}`);
};

const trendingTopics = () => {
  return get(`${TWITTER_URL}trendingTopics`);
};

const getTweet = (id) => {
  return get(`${TWITTER_URL}tweet/${id}`);
};

const like = (id) => {
  return put(`${TWITTER_URL}tweet/${id}/like`);
};

const tweet = (body) => {
  return postConToken(`${TWITTER_URL}tweet`, body);
};

const retweet = (id, body) => {
  return postConToken(`${TWITTER_URL}tweet/${id}/retweet`, body);
};

const reply = (id, body) => {
  return postConToken(`${TWITTER_URL}tweet/${id}/replay`, body);
};

const Api = {
  getToken,
  setToken,
  clearToken,
  login,
  register,
  loggedUser,
  followingTweets,
  usersToFollow,
  getUser,
  follow,
  search,
  trendingTopics,
  tweet,
  getTweet,
  like,
  retweet,
  reply,
};

export default Api;
