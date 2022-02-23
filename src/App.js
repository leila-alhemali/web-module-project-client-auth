import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate} from 'react-router-dom';

import AddFriend from './components/AddFriend';
import NavBar from './components/NavBar';
import FriendsList from './components/FriendsList';
import Login from './components/Login';
import axiosWithAuth from './axios';
import axios from 'axios'

const loginUrl = 'http://localhost:9000/api/login'
const friendsUrl = 'http://localhost:9000/api/friends'

function App() {
const [friends, setFriends] = useState([])

const navigate = useNavigate()

const login = ({username, password}) => {

  axios.post(loginUrl, {username, password})
    .then(res => {
      window.localStorage.setItem('token', res.data.token)
      navigate('/friendsList')
    })
    .catch (err => {
      debugger
    })
}

const getFriends = () => {

  axiosWithAuth().get(friendsUrl)
  .then(res => {
    setFriends(res.data)
  })
  .catch(err => {
    if (err.response.status == 401) {
      navigate('/')
    } else {
      debugger
    }
  })
}

const postFriends = friend => {
  axiosWithAuth().post(friendsUrl, friend)
  .then(res => {
    setFriends(friends.concat(res.data))
  })
  .catch(err => {
    if (err.response.status == 401) {
      navigate('/')
    } else {
      debugger
    }
  })
}


  return (
    <div className="App">
      <NavLink id="loginScreen" to="/">Login</NavLink>
      <NavLink id="friendsList" to="/friendsList">Friends List</NavLink>
      <NavLink id="addFriend" to="/addFriend">Add Friend</NavLink>
      <button id="logout">Logout</button>
      <Routes>
        <Route path="/" element={<Login login={login}/>} /> 
        <Route path="/friendsList" element={<FriendsList getFriends={getFriends} friends={friends}/>}/>
        <Route path="/addFriend" element={<AddFriend postFriends={postFriends}/>} />
      </Routes>
    </div>
  );
}

export default App;
