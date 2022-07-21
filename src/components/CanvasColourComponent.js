import React, { useEffect, useState } from "react";
import ColorPicker from "../ColorPicker";
import useStyles from "./CanvasComp.styles";

const CanvasColourComponent = () => {
  const [xDimention, setxDimention] = useState(25);
  const [yDimention, setyDimention] = useState(25);
  const [active, setactive] = useState(false);
  const [previousPoint, setpreviousPoint] = useState({
    x: null,
    y: null,
  });
  const [selectedColor, setselectedColor] = useState("#000000");
  const [steps, setsteps] = useState([]);
  const [data, setdata] = useState([]);
  const [canvas, setcanvas] = useState(null);
  const [canvascontext, setcanvascontext] = useState(null);
  console.log(data, "data");
  console.log(selectedColor, "selectedColor");
  const classes = useStyles();
  useEffect(() => {
    const canvaselement = document.getElementById("canvas-component");
    setcanvas(canvaselement);
    const ctx = canvaselement?.getContext("2d");
    setcanvascontext(ctx);
    canvaselement.width = 10 * xDimention;
    canvaselement.height = 10 * yDimention;
    canvaselement.style.display = "block";
    canvaselement.style.border = "1px solid black";
    canvaselement.style.height =
      Math.floor((yDimention / xDimention) * canvaselement.clientWidth) + "px";
    const w = +canvaselement.width;
    const h = +canvaselement.height;
    ctx.fillStyle = "white";
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, w, h);
    setdata(
      [...Array(xDimention)].map((e) => Array(yDimention).fill("#ffffff"))
    );
  }, []);
  const draw = (x, y, count) => {
    const w = +canvas.width;
    const h = +canvas.height;
    if (x >= 0 && x < xDimention && y >= 0 && y < yDimention) {
      data[x][y] = selectedColor;
      setdata(data);
      canvascontext.fillStyle = selectedColor;
      canvascontext.fillRect(
        Math.floor(x * (w / xDimention)),
        Math.floor(y * (h / yDimention)),
        Math.floor(w / xDimention),
        Math.floor(h / yDimention)
      );
      if (
        !count &&
        JSON.stringify(steps[steps.length - 1]) !==
          JSON.stringify([x, y, selectedColor, canvascontext.globalAlpha])
      ) {
        let finalData = [...steps];
        finalData.push([x, y, selectedColor, canvascontext.globalAlpha]);
        setsteps([...finalData]);
      }
    }
  };
  const onMouseMove = (e) => {
    if (active) {
      const rect = canvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      x = Math.floor((xDimention * x) / canvas.clientWidth);
      y = Math.floor((yDimention * y) / canvas.clientHeight);

      var p = {
        x: x,
        y: y,
      };
      if (p !== previousPoint) {
        setpreviousPoint(p);
        draw(p.x, p.y);
      }
    }
  };
  const onMouseDown = () => {
    setactive(true);
    setpreviousPoint({
      x: null,
      y: null,
    });
  };
  const onTouchMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left;
    let y = e.touches[0].clientY - rect.top;
    x = Math.floor((xDimention * x) / canvas.clientWidth);
    y = Math.floor((yDimention * y) / canvas.clientHeight);

    var p = {
      x: x,
      y: y,
    };
    if (p !== previousPoint) {
      setpreviousPoint(p);
      draw(p.x, p.y);
    }
  };
  const onMouseUp = (e) => {
    setactive(false);
    if (previousPoint.x !== null) {
      return; // Don't re-paint the last point in a streak
    }
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor((xDimention * x) / canvas.clientWidth);
    y = Math.floor((yDimention * y) / canvas.clientHeight);
    setpreviousPoint({
      x: x,
      y: y,
    });
    draw(x, y);
  };

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
    <>
      <ColorPicker currentColor={selectedColor} onSetColor={setselectedColor} />
      <canvas
        id="canvas-component"
        className={classes.pixelatedCanvas}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      ></canvas>
    </>
  );
};

export default CanvasColourComponent;
