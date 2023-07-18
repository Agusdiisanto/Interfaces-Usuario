import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/MainContent";
import LoginRegister from "./components/LoginRegister";
import NotFoundPage from "./components/Accesorios/NotFoundPage";
import UserHome from "./components/Home/UserHome/UserHome";
import Search from "./components/Home/Search";
import Profile from "./components/Home/MainContent/Profile/Profile";
import TweetsResult from "./components/Home/MainContent/Tweets/TweetsResult";
import FollowingResult from "./components/Home/MainContent/Profile/FollowingResult";
import FollowerResult from "./components/Home/MainContent/Profile/FollowerResult";
import TrendingTopics from "./components/Home/Navbar/TrendingTopics";
import TweetPage from "./components/Home/MainContent/Tweets/TweetPage";
import CommingSoon from "./components/Accesorios/CommingSoon";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<LoginRegister />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<UserHome />} />
            <Route path="search" element={<Search />} />
            <Route path="commingSoon" element={<CommingSoon />} />
            <Route path="trendingTopics" element={<TrendingTopics />} />
            <Route path="tweet/:id" element={<TweetPage />} />
            <Route path="profile" element={<Profile />}>
              <Route index element={<TweetsResult />} />
              <Route path="followers" element={<FollowerResult />} />
              <Route path="followings" element={<FollowingResult />} />
            </Route>
            <Route path="profile/:id" element={<Profile />}>
              <Route index element={<TweetsResult />} />
              <Route path="followers" element={<FollowerResult />} />
              <Route path="followings" element={<FollowingResult />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
