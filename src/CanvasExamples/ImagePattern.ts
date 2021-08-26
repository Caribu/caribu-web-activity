import { useState } from "react";
import { getCoordinates, Position } from "./CanvasUtils";

export function useImagePattern() {
  const [canDraw, setCanDraw] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [points, setPoints] = useState<any>([]);

  function midPointBtw(p1, p2) {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2,
    };
  }

  function getPattern(canvasRef: any, img: any) {
    const context = canvasRef.getContext("2d");
    return context.createPattern(img, "repeat");
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

      const img = new Image();
      img.onload = function () {
        context.strokeStyle = getPattern(canvasRef, img);
      };
      img.src = "https://i.imgur.com/huy6X9t.png";

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
        const ctx = canvasRef.getContext("2d");

        points.push({ x: newCoordinates.x, y: newCoordinates.y });

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var p1 = points[0];
        var p2 = points[1];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);

        for (var i = 1, len = points.length; i < len; i++) {
          var midPoint = midPointBtw(p1, p2);
          ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
          p1 = points[i];
          p2 = points[i + 1];
        }
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
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
