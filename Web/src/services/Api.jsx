import Axios from 'axios';

const TWITTER_URL = "http://localhost:8080/"
const HEADER_AUTH = "Authorization"
const getToken = () => localStorage.getItem(HEADER_AUTH)
const setToken = (token) => localStorage.setItem(HEADER_AUTH, token)
const clearToken = () => localStorage.removeItem(HEADER_AUTH)
const header = () => ({headers: {[HEADER_AUTH]: getToken()}});

const get = (url, header) => 
    Axios.get(url, header)
        .then((response) => response)
        .catch((error) => Promise.reject(error.response.data))

const post = (url, body, header) => 
    Axios.post(url, body, header)
        .then((response) => response)
        .catch((error) => Promise.reject(error.response.data))

const put = (url, header) => 
    Axios.put(url, {}, header)
        .then((response) => response)
        .catch((error) => Promise.reject(error.response.data))


const login = (body) => post(`${TWITTER_URL}login`, body);

const register = (body) => post(`${TWITTER_URL}register`, body)

const loggedUser = () => {
    return get(`${TWITTER_URL}user`, header())
}

const followingTweets = () => {
    return get(`${TWITTER_URL}user/followingTweets`, header())
}

const usersToFollow = () => {
    return get(`${TWITTER_URL}user/usersToFollow`, header())
}

const getUser = (id) => {
    return get(`${TWITTER_URL}user/${id}`, header())
}

const follow = (id) => {
    return put(`${TWITTER_URL}user/${id}/follow`, header())
}

const search = (searchText) => {
    return get(`${TWITTER_URL}search?text=${searchText}`, header())
}

const trendingTopics = () => {
    return get(`${TWITTER_URL}trendingTopics`, header())
}

const tweet = (body) => {
    return post(`${TWITTER_URL}tweet`, body, header())
}

const getTweet = (id) => {
    return get(`${TWITTER_URL}tweet/${id}`, header())
}

const like = (id) => {
    return put(`${TWITTER_URL}tweet/${id}/like`, header())
}

const retweet = (id, body) => {
    return post(`${TWITTER_URL}tweet/${id}/retweet`, body, header())
}

const reply = (id, body) => {
    return post(`${TWITTER_URL}tweet/${id}/replay`, body, header())
}

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
    reply
}

export default Api;