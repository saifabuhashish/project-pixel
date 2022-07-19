import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorPicker from "../ColorPicker";
import {
  getCanvasPixels,
  updateCanvasPixels,
} from "../httpHelper/canvasApiService";
import { setCanvasPixelsData } from "../store/action/CanvasAction";
import useStyles from "./CanvasComp.styles";

const CanvasColourComponent = () => {
  const canvasId = "1";
  const userId = "62d63819e3b8518c62508f78";
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
  const [dateLoader, setdateLoader] = useState(false);
  const dispatch = useDispatch();
  // console.log(data, "data");
  // console.log(selectedColor, "selectedColor");
  const { canvasPixels } = useSelector((state) => state.canvasReducer);
  // console.log(canvasPixels, "canvasPixels");
  const classes = useStyles();
  useEffect(() => {
    setdateLoader(true);
    getCanvasPixels(canvasId)
      .then((res) => {
        console.log(res, "res .... getCanvasPixels");
        setdateLoader(false);
        dispatch(setCanvasPixelsData(res.results));
      })
      .catch((err) => {
        setdateLoader(false);
        console.log(err, "err");
      });
  }, []);

  useEffect(() => {
    const canvaselement = document.getElementById("canvas-component");
    if (canvaselement) {
      setcanvas(canvaselement);
      const ctx = canvaselement?.getContext("2d");
      setcanvascontext(ctx);
      canvaselement.width = 10 * xDimention;
      canvaselement.height = 10 * yDimention;
      canvaselement.style.display = "block";
      canvaselement.style.border = "1px solid black";
      canvaselement.style.height =
        Math.floor((yDimention / xDimention) * canvaselement.clientWidth) +
        "px";
      const w = +canvaselement.width;
      const h = +canvaselement.height;
      ctx.fillStyle = "white";
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, w, h);
      setdata(
        [...Array(xDimention)].map((e) => Array(yDimention).fill("#ffffff"))
      );
      canvasPixels.map((item) => {
        const x = parseInt(item?.pixelId / 1000);
        const y = item?.pixelId - 1000 * x;
        ctx.fillStyle = item?.color ? item?.color : "#ffffff";
        ctx.fillRect(
          Math.floor(x * (w / xDimention)),
          Math.floor(y * (h / yDimention)),
          Math.floor(w / xDimention),
          Math.floor(h / yDimention)
        );
      });
    }
  }, [canvasPixels]);
  const draw = (x, y, count) => {
    const w = +canvas.width;
    const h = +canvas.height;
    if (x >= 0 && x < xDimention && y >= 0 && y < yDimention) {
      data[x][y] = selectedColor;
      setdata(data);
      updateCanvasPixels({
        canvasId: canvasId,
        x: x,
        y: y,
        color: selectedColor,
        userId: userId,
      })
        .then((res) => console.log(res, "res updateCanvasPixels"))
        .catch((err) => {
          console.log(err, "err updateCanvasPixels");
        });
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
  return (
    <>
      <ColorPicker currentColor={selectedColor} onSetColor={setselectedColor} />
      {dateLoader ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <canvas
          id="canvas-component"
          className={classes.pixelatedCanvas}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        ></canvas>
      )}
    </>
  );
};

export default CanvasColourComponent;
