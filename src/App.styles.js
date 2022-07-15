
import { createUseStyles } from 'react-jss';

export default createUseStyles({

  web3: {
    position:'absolute',
    top:'0',
    right:'0',
    padding:'50px'
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  // wrapper: {
  //   display: 'flex'
  // },
  '@keyframes typing': {
    from: {
      "width": "0"
    },
    to: {
      "width": "35%"
    }
  },
  '@keyframes blink-caret': {
    from: { opacity: 1 },
     to: { opacity: 0 },
  },
  title: {
    margin: '0.5rem',
    fontFamily: 'monospace',
    fontSize: '30px',
    overflow: 'hidden', /* Ensures the content is not revealed until the animation */
    borderRight: '.15em solid orange', /* The typwriter cursor */
    whiteSpace: 'nowrap', /* Keeps the content on a single line */
    margin: '0 auto', /* Gives that scrolling effect as the typing happens */
    letterSpacing:' .15em', /* Adjust as needed */
    animationName: "$typing",
    animationDuration: '3s',
    animationTimingFunction: 'linear',
    animationIterationCount: '1',
      
  },


  colorSwatchContainer: {
    display: 'flex',
  },
  colorSwatch: {
    margin: '0.5rem',
    padding: 0,
    width: '25px',
    height: '25px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  chatString: {
    maxWidth: '50%',
    fontFamily: 'monospace',
    wordWrap: 'break-word',
  },
  pixelatedCanvas: {
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  maxWidth: '550px',
  cursor: 'crosshair',
  touchAction: 'none',
  imageRendering: '-moz-crisp-edges',
  imageRendering: '-webkit-crisp-edges',
  imageRendering: 'crisp-edges',
  imageRendering: 'pixelated',
  }
  
});