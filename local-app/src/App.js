import './App.css';
import { BrowserRouter, Link, Route, Routes, Switch } from 'react-router-dom'
import { Typography, Card, Button, Drawer, useScrollTrigger, Box, Toolbar, Divider, List, ListItem, ListItemButton } from '@mui/material';
import React, { useState } from 'react';
import ReactPlayer from 'react-player'
import './video-react.css'

function getBaseUrl() {
  var re = new RegExp(/^.*\//);
  document.getElementById('baseresult').innerHTML += re.exec(window.location.href);
}

function getRootUrl() {
  document.getElementById('rootresult').innerHTML +=
    window.location.origin
      ? window.location.origin + '/'
      : window.location.protocol + '/' + window.location.host + '/';

  //
  getBaseUrl();
}

const getVideos = () => {
  return [
    { video: "https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2020/03/file_example_WEBM_480_900KB.webm", name: "World cooking", path: "/worldcooking" }
  ]
}

const VideoDisplay = ({ video }) => (
  <>
    <Typography variant="h1">
      {video.name}
    </Typography>

    <Box sx={{ maxWidth: "0.5vw" }}>
      <ReactPlayer
        url={video.video}
      />
    </Box>
  </>
)

function VideoDrawer({ videos }) {
  console.log(videos)

  return (<Drawer variant="permanent">
    <Toolbar>
    </Toolbar>
    <List>
      <ListItem>
        <Link to="/">
          <ListItemButton>Home </ListItemButton>
        </Link>
      </ListItem>
      {videos.map((video, index) => {
        return (<div key={index}>
          <Link to={video.path}>
            <ListItemButton>{video.name} </ListItemButton>
          </Link>
          <Divider></Divider>
        </div>)
      })}
    </List>
  </Drawer>)
}
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <VideoDrawer videos={getVideos()}></VideoDrawer>
        <Routes>
          <Route path='/' element={
            <Typography variant="h1"> Welcome to the Cokeing Video Website</Typography>
          }>
          </Route>
          <>
            {
              getVideos().map((video, index) => (
                <Route key={index} path={"/worldcooking"} element={
                  <>
                    <VideoDisplay video={video}>
                    </VideoDisplay>
                  </>
                } >
                </Route>
              ))
            }
          </>
        </Routes>
      </BrowserRouter>



    </div>
  );
}

export default App;
