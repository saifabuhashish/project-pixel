import { createUseStyles } from "react-jss";

export default createUseStyles({
  pixelatedCanvas: {
    position: "fixed",
    left: "50%",
    top: "55%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    maxWidth: "500px",
    cursor: "crosshair",
    touchAction: "none",
    imageRendering: "-moz-crisp-edges",
    imageRendering: "-webkit-crisp-edges",
    imageRendering: "crisp-edges",
    imageRendering: "pixelated",
  },
});
