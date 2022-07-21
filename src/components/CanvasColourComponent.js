import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { colors } from "../constants/colors";
import {
  getCanvasPixels,
  updateCanvasPixels,
} from "../httpHelper/canvasApiService";
import { setCanvasPixelsData } from "../store/action/CanvasAction";
import useStyles from "./CanvasComp.styles";

const CanvasColourComponent = () => {
  const canvasId = "6";
  const userId = "62d63819e3b8518c62508f78";
  const [xDimention, setxDimention] = useState(10);
  const [yDimention, setyDimention] = useState(10);
  const [active, setactive] = useState(false);
  const [previousPoint, setpreviousPoint] = useState({
    x: null,
    y: null,
  });
  const [selectedColor, setselectedColor] = useState("0, 0, 0");
  const [steps, setsteps] = useState([]);
  const [data, setdata] = useState([]);
  const [canvas, setcanvas] = useState(null);
  const [canvascontext, setcanvascontext] = useState(null);
  const [dataLoader, setdataLoader] = useState(false);
  const dispatch = useDispatch();
  const { canvasPixels } = useSelector((state) => state.canvasReducer);
  const classes = useStyles();
  const { addToast } = useToasts();
  useEffect(() => {
    const canvaselement = document.getElementById("canvas-component");
    if (canvaselement) {
      setcanvas(canvaselement);
      let options = { colorSpace: "srgb" };
      const ctx = canvaselement?.getContext("2d", options);
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
    }
    setdataLoader(true);
    getCanvasPixels(canvasId)
      .then((res) => {
        console.log(res, "res .... getCanvasPixels");
        setdataLoader(false);
        dispatch(setCanvasPixelsData(res.results));
        setxDimention(res?.width);
        setyDimention(res?.width);
      })
      .catch((err) => {
        setdataLoader(false);
        addToast(err?.response?.data?.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: "1500",
        });
        console.log(err, "err");
      });
  }, []);

  useEffect(() => {
    if (canvas) {
      const w = +canvas.width;
      const h = +canvas.height;
      const imageData = canvascontext.createImageData(w, h);
      // Iterate through every pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        imageData.data[i + 0] = 255; // R value
        imageData.data[i + 1] = 255; // G value
        imageData.data[i + 2] = 255; // B value
        imageData.data[i + 3] = 255; // A value
      }
      canvasPixels.map((item) => {
        const x = parseInt(item?.pixelId / xDimention);
        const y = item?.pixelId - xDimention * x;
        // console.log(item?.color, "item?.color");
        // console.log(x, y, `rgb(${item?.color})`);
        const colorsArr = item?.color?.split(", ");
        // console.log(colorsArr, "colorsArr");
        const xstartPosition =
          w * Math.floor(w / xDimention) * 4 * y +
          x * Math.floor(w / xDimention) * 4;
        if (colorsArr?.length > 0) {
          for (let j = 0; j < Math.floor(w / xDimention) * 4; j += 4) {
            for (
              let i = xstartPosition;
              i < xstartPosition + Math.floor(w / xDimention) * 4;
              i += 4
            ) {
              imageData.data[j * parseFloat(w) + i + 0] = colorsArr[0];
              imageData.data[j * parseFloat(w) + i + 1] = colorsArr[1];
              imageData.data[j * parseFloat(w) + i + 2] = colorsArr[2];
              imageData.data[j * parseFloat(w) + i + 3] = 255;
            }
          }
        }
      });
      canvascontext.putImageData(imageData, 0, 0);
      // console.log(imageData.data, "imageData");

      // canvasPixels.map((item) => {
      //   const x = parseInt(item?.pixelId / xDimention);
      //   const y = item?.pixelId - xDimention * x;
      //   canvascontext.fillStyle = item?.color
      //     ? `rgb(${item?.color})`
      //     : "#ffffff";
      //   canvascontext.fillRect(
      //     Math.floor(x * (w / xDimention)),
      //     Math.floor(y * (h / yDimention)),
      //     Math.floor(w / xDimention),
      //     Math.floor(h / yDimention)
      //   );
      // });
    }
  }, [canvasPixels]);
  const draw = (x, y, count) => {
    const w = +canvas.width;
    const h = +canvas.height;
    if (x >= 0 && x < xDimention && y >= 0 && y < yDimention) {
      data[x][y] = `rgb(${selectedColor})`;
      setdata(data);
      canvascontext.fillStyle = `rgb(${selectedColor})`;
      canvascontext.fillRect(
        Math.floor(x * (w / xDimention)),
        Math.floor(y * (h / yDimention)),
        Math.floor(w / xDimention),
        Math.floor(h / yDimention)
      );
      updateCanvasPixels({
        canvasId: canvasId,
        x: x,
        y: y,
        color: selectedColor,
        userId: userId,
      })
        .then((res) => {
          console.log(res, "res updateCanvasPixels");

          if (
            !count &&
            JSON.stringify(steps[steps.length - 1]) !==
              JSON.stringify([x, y, selectedColor, canvascontext.globalAlpha])
          ) {
            let finalData = [...steps];
            finalData.push([x, y, selectedColor, canvascontext.globalAlpha]);
            setsteps([...finalData]);
          }
        })
        .catch((err) => {
          console.log(err, "err updateCanvasPixels");
          canvascontext.fillStyle = `rgb(255, 255, 255)`;
          canvascontext.fillRect(
            Math.floor(x * (w / xDimention)),
            Math.floor(y * (h / yDimention)),
            Math.floor(w / xDimention),
            Math.floor(h / yDimention)
          );
          addToast(err?.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: "1500",
          });
        });
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
      {/* <ColorPicker currentColor={selectedColor} onSetColor={setselectedColor} /> */}
      <div className={classes.colorPalette}>
        <Grid container spacing={1}>
          {colors.map((clr) => (
            <Grid
              item
              key={clr}
              className={classes.colorDiv}
              style={{ backgroundColor: `rgb(${clr})` }}
              onClick={() => setselectedColor(clr)}
            ></Grid>
          ))}
        </Grid>
      </div>
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
