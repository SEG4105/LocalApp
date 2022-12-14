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
import { videos_url } from './videoUrl'


export const getUrl = (filename) => videos_url + "/" + filename;

const getVideos = () => {
  return [
    {
      video: getUrl(
        "Sandra Lee - Dinner Party 3 (Semi Homemade entire episode!) [4RO_VPyn8w4].webm"
      ),
      name: "Dinner Party 3",
      path: "/dinnerParty3",
    },
    {
      video: getUrl("Sandra Lee - Mapletini [pJLT9-CN1Yo].webm"),
      name: "Mapletini",
      path: "/mapletini",
    },
    {
      video: getUrl(
        "Sandra Lee - Cute Cakes (entire episode!) [jBx3KQm1RVo].webm"
      ),
      name: "Cute Cakes",
      path: "/cuteCakes",
    },
  ];
};

export const VideoDisplay = ({ video }) => (
  <>
    <Typography variant="h1" data-testid="videoHeader">{video.name}</Typography>
    <video controls style={{ maxWidth: "80vw" }}>
      <source src={video.video} data-testid="videosource" />
    </video>
  </>
);

export const drawerTypes = {
  permanent: "permanent",
  temporary: "temporary",
};

export function isMobile() {
  return window.screen.availWidth <= 500;
}

export function determineDrawerType() {
  if (!isMobile()) {
    return drawerTypes.permanent;
  } else {
    return drawerTypes.temporary;
  }
}

export function VideoDrawer({ videos, drawerOpen, setDrawerOpen }) {
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
  const onIconButtonClick =React.useCallback( () => setDrawerOpen(true), [])

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
                onClick={onIconButtonClick}
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
              <>
                <h2>
                  Welcome to the Cooking Video Website
                </h2>
                <img alt="the glorious sandra lee" src="https://s.yimg.com/ny/api/res/1.2/lIOMavK9adwxtRp4w2WlVg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTcwNTtoPTM1MztjZj13ZWJw/https://media.zenfs.com/en-US/nbc_today_217/2cedf445fb55f9f5a5fd6dbf9b7feae9" />
                <h6>
                  Welcome to the awesome cooking website where you can learn
                  amazing baking tips from around the world.
                  <br /> Our videos load instantly anywhere in north america or
                  east asia! No buffering necessary! Please enjoy our site!
                </h6>
              </>
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
