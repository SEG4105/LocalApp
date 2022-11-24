import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  Typography,
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  AppBar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";

const getVideos = () => {
  return [
    {
      video:
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-webm-file.webm",
      name: "World cooking",
      path: "/worldcooking",
    },
  ];
};

const VideoDisplay = ({ video }) => (
  <>
    <Typography variant="h1">{video.name}</Typography>

    <video controls>
      <source src={video.video} />
    </video>
  </>
);

const drawerTypes = {
  permanent: "permanent",
  temporary: "temporary",
};

function isMobile() {
  return window.screen.availWidth <= 500;
}

function determineDrawerType() {
  if (!isMobile()) {
    return drawerTypes.permanent;
  } else {
    return drawerTypes.temporary;
  }
}

function VideoDrawer({ videos, drawerOpen, setDrawerOpen }) {
  console.log(videos);

  return (
    <Drawer variant={determineDrawerType()} open={!isMobile() || drawerOpen}>
      <Toolbar></Toolbar>
      <List>
        <ListItem>
          <Link to="/">
            <ListItemButton>Home </ListItemButton>
          </Link>
        </ListItem>
        {videos.map((video, index) => {
          return (
            <div key={index}>
              <Link to={video.path}>
                <ListItemButton>{video.name} </ListItemButton>
              </Link>
              <Divider></Divider>
            </div>
          );
        })}
        {isMobile() && (
          <ListItem>
            <ListItemButton onClick={() => setDrawerOpen(false)}>
              {" "}
              close drawer{" "}
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}
function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        {isMobile() && (
          <AppBar
            position="fixed"
            color="primary"
            sx={{ top: "auto", bottom: 0 }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}

        <VideoDrawer
          videos={getVideos()}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        ></VideoDrawer>
        <Routes>
          <Route
            path="/"
            element={
              <Typography variant="h1">
                {" "}
                Welcome to the Cokeing Video Website
              </Typography>
            }
          ></Route>
          <>
            {getVideos().map((video, index) => (
              <Route
                key={index}
                path={video.path}
                element={
                  <>
                    <div key={index + video.path}>
                      <VideoDisplay video={video} />
                    </div>
                  </>
                }
              ></Route>
            ))}
          </>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
