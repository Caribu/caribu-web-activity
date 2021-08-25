/* eslint-disable react/button-has-type */
import _ from "lodash";
import React from "react";
import { canvasHeight, canvasWidth } from "./CanvasExamples/CanvasUtils";
import { useColoredPixels } from "./CanvasExamples/ColoredPixels";
import { useFur } from "./CanvasExamples/Fur";
import { useRainbow } from "./CanvasExamples/Rainbow";
import { useShadows } from "./CanvasExamples/Shadows";
import { useShapes } from "./CanvasExamples/Shapes";
import { useSimplePencil } from "./CanvasExamples/SimplePencil";
import { useSpray } from "./CanvasExamples/Spray";

declare const window: any;

const CanvasExample = (props: any) => {
  const { comingFromMobile } = window;

  const canvasRef: any = React.useRef(null);

  // React State
  const [strokeType, setStrokeType] = React.useState("simplePencil");

  // Examples Hooks
  const coloredPixels = useColoredPixels();
  const fur = useFur();
  const rainbow = useRainbow();
  const shadows = useShadows();
  const shapes = useShapes();
  const simplePencil = useSimplePencil();
  const spray = useSpray();

  const onCanvasCreate = (canvas: any) => {
    if (canvasRef.current) {
      return;
    }
    canvasRef.current = canvas;
    //      canvasRef.current.width = canvasRef.current.clientWidth;
    //      canvasRef.current.height = canvasRef.current.clientHeight;
  };

  const startDraw = (event: any) => {
    if (_.camelCase(strokeType) === "simplePencil") {
      simplePencil.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "shadows") {
      shadows.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "coloredPixels") {
      coloredPixels.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "fur") {
      fur.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "rainbow") {
      rainbow.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "shapes") {
      shapes.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "spray") {
      spray.startDraw(canvasRef.current, event);
    }
  };

  const draw = (event: any) => {
    if (_.camelCase(strokeType) === "simplePencil") {
      simplePencil.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "shadows") {
      shadows.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "coloredPixels") {
      coloredPixels.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "fur") {
      fur.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "rainbow") {
      rainbow.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "shapes") {
      shapes.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === "spray") {
      spray.draw(canvasRef.current, event);
    }
  };

  const exitDraw = (event: any) => {
    if (_.camelCase(strokeType) === "simplePencil") {
      simplePencil.exitDraw();
    } else if (_.camelCase(strokeType) === "shadows") {
      shadows.exitDraw();
    } else if (_.camelCase(strokeType) === "coloredPixels") {
      coloredPixels.exitDraw();
    } else if (_.camelCase(strokeType) === "fur") {
      fur.exitDraw();
    } else if (_.camelCase(strokeType) === "rainbow") {
      rainbow.exitDraw();
    } else if (_.camelCase(strokeType) === "shapes") {
      shapes.exitDraw();
    } else if (_.camelCase(strokeType) === "spray") {
      spray.exitDraw();
    }
  };

  const buttonContainerStyle = {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "5%",
  };

  const buttonStyle = {
    backgroundColor: "green",
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 10,
  };

  return (
    <div>
      <div>
        <canvas
          ref={onCanvasCreate}
          height={canvasHeight}
          width={canvasWidth}
          style={{ backgroundColor: "yellow" }}
          onTouchStart={(evt) => {
            startDraw(evt);
          }}
          onTouchMove={(evt) => {
            draw(evt);
          }}
          onTouchEnd={(evt) => {
            exitDraw(evt);
          }}
          onMouseDown={(evt) => {
            startDraw(evt);
          }}
          onMouseMove={(evt) => {
            draw(evt);
          }}
          onMouseUp={(evt) => {
            exitDraw(evt);
          }}
        />
      </div>
      <div /*style={styles.buttonContainer}*/>
        <button
          onClick={() => {
            setStrokeType("simplePencil");
          }}
        >
          Simple Pencil
        </button>
        <button
          onClick={() => {
            setStrokeType("coloredPixels");
          }}
        >
          Colored Pixels
        </button>
        <button
          onClick={() => {
            setStrokeType("fur");
          }}
        >
          Fur
        </button>
        <button
          onClick={() => {
            setStrokeType("shadows");
          }}
        >
          Shadows
        </button>
        <button
          onClick={() => {
            setStrokeType("shapes");
          }}
        >
          Shapes
        </button>
        <button
          onClick={() => {
            setStrokeType("spray");
          }}
        >
          Spray
        </button>
        <button
          onClick={() => {
            if (comingFromMobile) {
              window.ReactNativeWebView.postMessage(
                "React Native Mobile Code to save"
              );
            } else {
              alert("React Web Code to save");
            }
          }}
        >
          SAVE
        </button>
      </div>
      <h3>window.comingFromMobile: {comingFromMobile ? "true" : "false"}</h3>
      <h3>
        activityId: {comingFromMobile ? window.activityId : props.activityId}
      </h3>
    </div>
  );
};

export default CanvasExample;
