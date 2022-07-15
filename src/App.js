
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';

import Grid from './Canvas';
import ColorPicker from './ColorPicker';
import useStyles from './App.styles';
import { TwitterPicker } from 'react-color'
import { useMoralis } from "react-moralis";
import Moralis from "moralis"
//import Button from '@mui/material/Button';
import ButtonAppBar from './components/ButtonAppBar';
import Button from 'react-bootstrap/Button';
import PressStart from './fonts/PressStart2P-Regular.ttf'
import { ThemeProvider, createTheme } from '@mui/material/styles';

//import SignUpModal from './components/SignUpModal';


const offCell = {
  on: false,
  color: '#000000',
};
const initialCells = Array.from({ length: 2500 }, () => offCell);

function App() {

  // const [cells, setCells] = useState(initialCells);
  // const [currentColor, setCurrentColor] = useState('#56BC58');
   const classes = useStyles();
  // const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  // const [allowance, setAllowance] = useState(0)
  // const colorSwatch = useMemo(
  //   () => [
  //     ...new Set(cells.filter((cell) => cell.on).map((cell) => cell.color)),
  //   ],
  //   [cells]
  // );



  // useEffect(() => {
  //   if (isAuthenticated) {
  //   }
  //     // add your logic here
  // }, [isAuthenticated]);



  //   const login = async () => {
  //     await Moralis.enableWeb3()
  //     if (!isAuthenticated) {

  //       await authenticate({signingMessage: "Please connect your wallet" })
  //         .then(function (user) {
  //           console.log("logged in user:", user);
  //           console.log(user.get("ethAddress"));
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //     }

  //     if(isAuthenticated) {
  //       let user = Moralis.User.current();
  //     let address = user.get("ethAddress");
  //     let options = {
  //       contractAddress: "0xB6EC23E1fb1501335cC396db99e08F6AA42aE53D",
  //       functionName: "allowance",
  //       abi: [{
  //           "inputs": [
  //               {
  //                   "internalType": "address",
  //                   "name": "",
  //                   "type": "address"
  //               }
  //           ],
  //           "name": "allowance",
  //           "outputs": [
  //               {
  //                   "internalType": "uint256",
  //                   "name": "",
  //                   "type": "uint256"
  //               }
  //           ],
  //           "stateMutability": "view",
  //           "type": "function"
  //       }],
  //       params: { "": address }
  //   }
  //   const _allowance = await Moralis.executeFunction(options)
  //   const allowance = parseInt(parseInt(_allowance._hex), 10) /
  //   1000000000000000000
  //   console.log("ALLOWANCE: ", allowance)
  //   setAllowance(allowance)
  // }
      
  //   }

    
      

  //   const logOut = async () => {
  //     await logout();
  //     console.log("logged out");
  //   }

  // //   const checkAllowance = async () => {
  // //     await Moralis.enableWeb3()
  // //     let user = Moralis.User.current();
  // //     let address;
  // //     if (!user) {
  // //         alert('Please connect your wallet')
  // //     }
  // //     address = user.get("ethAddress")
  // //     let options = {
  // //         contractAddress: "0xB6EC23E1fb1501335cC396db99e08F6AA42aE53D",
  // //         functionName: "allowance",
  // //         abi: [{
  // //             "inputs": [
  // //                 {
  // //                     "internalType": "address",
  // //                     "name": "",
  // //                     "type": "address"
  // //                 }
  // //             ],
  // //             "name": "allowance",
  // //             "outputs": [
  // //                 {
  // //                     "internalType": "uint256",
  // //                     "name": "",
  // //                     "type": "uint256"
  // //                 }
  // //             ],
  // //             "stateMutability": "view",
  // //             "type": "function"
  // //         }],
  // //         params: { "": address }
  // //     }
  // //     const _allowance = await Moralis.executeFunction(options)
  // //     const allowance = parseInt(parseInt(_allowance._hex), 10) /
  // //     1000000000000000000
  // //     alert(`Your allowance is ${allowance} ETH`)
  // //     return allowance
  // // }

  

  // return (
  //   <div className={classes.app}>
  //       <div className={classes.top}>
  //       <div className={classes.title}>
  //         <h1>THE CRYPTO EXPERIMENT</h1>
  //       </div>
  //       <div className={classes.web3}>
  //         {!isAuthenticated && 
  //         <Button variant="contained" size="medium" onClick={login}>Connect</Button>
  //         }
  //         {isAuthenticated && <Button variant="outlined" size="medium" onClick={logOut} disabled={isAuthenticating}>Disconnect</Button>}
          
  //       </div>

  //       </div>
        
  //         <ColorPicker className={classes.colorPicker} currentColor={currentColor} onSetColor={setCurrentColor} />
  //         {/* <div className={classes.colorSwatchContainer}>
  //           {colorSwatch.map((color) => (
  //             <div
  //               key={color}
  //               onClick={() => setCurrentColor(color)}
  //               className={classes.colorSwatch}
  //               style={{ background: color }}
  //             />
  //           ))}
  //           {/* <CirclePicker></CirclePicker>
  //           </div>*/}
        
  //         <Grid className={classes.grid} cells={cells} setCells={setCells} currentColor={currentColor} />
      
      
       
  //   </div>
    
  // );

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handler = useCallback(
    ({ clientX, clientY }) => {
      // Update coordinates
      // const canvas = document.getElementById('pixelated-canvas')
      // var rect = canvas.getBoundingClientRect();
      //   var x = e.clientX - rect.left;
      //   var y = e.clientY - rect.top;
      //   x = Math.floor(this.width * x / this.canvas.clientWidth);
      //   y = Math.floor(this.height * y / this.canvas.clientHeight);
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );
  // Add event listener using our hook
  useEventListener("mouseup", handler);


  useEffect(() => {
    const canvas = document.getElementById('pixelated-canvas');
    const ctx = canvas.getContext('2d');
    const fourByFour = [255, 166, 82, 255, 242, 189, 82, 255, 125, 205, 182, 255, 255, 255, 255, 255];
    const arr = new Uint8ClampedArray(400);
    const colors = ['blue','white','green','red','yellow']

    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        ctx.fillStyle = colors[j%colors.length];
        ctx.fillRect(j * 25, i * 25, 25, 25);
      }
    }

    // for(var i = 0; i<=arr.length; i++) {
    //   var index = i % fourByFour.length;
    //   arr[i] = fourByFour[index];
    // }

    // console.log("ARR: ", arr.length)

    // let data = new ImageData(arr, 100)

    // ctx.imageSmoothingEnabled = false;
    // ctx.mozImageSmoothingEnabled = false;
    // ctx.webkitImageSmoothingEnabled = false;
    // ctx.msImageSmoothingEnabled = false;

    // ctx.putImageData(data, 10, 10)

  });

  const theme = createTheme({
    typography: {
     "fontFamily": `'Press Start 2P', cursive`,
    }
 });

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <ThemeProvider theme={theme}>
      <ButtonAppBar></ButtonAppBar>
        <canvas id="pixelated-canvas" className={classes.pixelatedCanvas} ></canvas>

      </ThemeProvider>
        
        {/* <p>Youy Coords are {coords.x} and {coords.y} </p> */}
      
    </div>
  );
}

//}

function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}


export default App;
