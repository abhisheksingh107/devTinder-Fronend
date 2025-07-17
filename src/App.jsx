import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.jsx";
import Feed from "./components/Feed.jsx";
import Connection from "./components/Connections.jsx";
import Request from "./components/Request.jsx";
import SignUp from "./components/SignUp.jsx";
import Chat from "./components/chat.jsx";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Navigate to="/login" />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connection" element={<Connection />} />
              <Route path="/request" element={<Request />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
