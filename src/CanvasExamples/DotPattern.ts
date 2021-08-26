import { useState } from "react";
import {
  canvasHeight,
  canvasWidth,
  drawShadedLine,
  getCoordinates,
  Position,
} from "./CanvasUtils";

export function useDotPattern() {
  const [canDraw, setCanDraw] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [points, setPoints] = useState<any>([]);

  function midPointBtw(p1, p2) {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2,
    };
  }

  function getPattern(canvasRef: any) {
    const patternCanvas = document.createElement("canvas"),
      dotWidth = 20,
      dotDistance = 5,
      patternCtx = patternCanvas.getContext("2d");

    patternCanvas.width = patternCanvas.height = dotWidth + dotDistance;

    patternCtx.fillStyle = "red";
    patternCtx.beginPath();
    patternCtx.arc(
      dotWidth / 2,
      dotWidth / 2,
      dotWidth / 2,
      0,
      Math.PI * 2,
      false
    );
    patternCtx.closePath();
    patternCtx.fill();
    const ctx = canvasRef.getContext("2d");
    return ctx.createPattern(patternCanvas, "repeat");
  }

  const startDraw = (canvasRef, event) => {
    const coordinates = getCoordinates(canvasRef, event);
    if (coordinates && coordinates.x && coordinates.y) {
      const context = canvasRef.getContext("2d");
      context.save();

      setCanDraw(true);
      setPosition(coordinates);

      context.lineWidth = 25;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = getPattern(canvasRef);

      setPoints((currentPoints: any) => [
        ...currentPoints,
        { x: coordinates.x, y: coordinates.y },
      ]);
    }
  };

  const draw = (canvasRef, event) => {
    if (canDraw) {
      const newCoordinates = getCoordinates(canvasRef, event);
      if (position && newCoordinates) {
        const context = canvasRef.getContext("2d");
        points.push({ x: newCoordinates.x, y: newCoordinates.y });

        //        context.clearRect(0, 0, canvasWidth, canvasHeight);

        var p1 = points[0];
        var p2 = points[1];

        context.beginPath();
        context.moveTo(p1.x, p1.y);

        for (var i = 1, len = points.length; i < len; i++) {
          var midPoint = midPointBtw(p1, p2);
          context.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
          p1 = points[i];
          p2 = points[i + 1];
        }
        context.lineTo(p1.x, p1.y);
        context.stroke();
      }
    }
  };

  const exitDraw = (canvasRef?: any) => {
    setCanDraw(false);
    points.length = 0;
    if (canvasRef) {
      const context = canvasRef.getContext("2d");
      context.restore();
    }
  };

  return {
    draw,
    exitDraw,
    startDraw,
  };
}
