/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";

import Grid from "./Canvas";
import ColorPicker from "./ColorPicker";
import useStyles from "./App.styles";
import { TwitterPicker } from "react-color";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
//import Button from '@mui/material/Button';
import ButtonAppBar from "./components/ButtonAppBar";
import Button from "react-bootstrap/Button";
import PressStart from "./fonts/PressStart2P-Regular.ttf";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CanvasColourComponent from "./components/CanvasColourComponent";

// Connection opened
function App() {

  const theme = createTheme({
    typography: {
      fontFamily: `'Press Start 2P', cursive`,
    },
  });

  const socket = new WebSocket('wss://localhost:3002');

  // Connection opened
  socket.addEventListener('open', function (event) {
      console.log('Connected to server')
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
  });

  return (
    <div className="App" style={{ height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <ButtonAppBar></ButtonAppBar>
        <CanvasColourComponent />
      </ThemeProvider>
    </div>
  );
}

export default App;
