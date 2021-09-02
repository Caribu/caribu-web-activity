/* eslint-disable react/button-has-type */
import _ from 'lodash';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { canvasHeight, canvasWidth } from './CanvasExamples/CanvasUtils';
import { useColoredPixels } from './CanvasExamples/ColoredPixels';
import { useDotPattern } from './CanvasExamples/DotPattern';
import { useFur } from './CanvasExamples/Fur';
import { useImagePattern } from './CanvasExamples/ImagePattern';
import { useRainbow } from './CanvasExamples/Rainbow';
import { useShadows } from './CanvasExamples/Shadows';
import { useShapes } from './CanvasExamples/Shapes';
import { useSimplePencil } from './CanvasExamples/SimplePencil';
import { useSpray } from './CanvasExamples/Spray';

declare const window: any;

const CanvasExample2 = (props: any) => {
  const { comingFromMobile } = window;

  const canvasRef: any = React.useRef(null);

  // React State
  const [strokeType, setStrokeType] = React.useState('simplePencil');

  // Examples Hooks
  const coloredPixels = useColoredPixels();
  const dotPattern = useDotPattern();
  const fur = useFur();
  const imagePattern = useImagePattern();
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
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;
  };

  const startDraw = (event: any) => {
    if (_.camelCase(strokeType) === 'simplePencil') {
      simplePencil.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'shadows') {
      shadows.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'coloredPixels') {
      coloredPixels.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'fur') {
      fur.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'rainbow') {
      rainbow.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'shapes') {
      shapes.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'spray') {
      spray.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'dotPattern') {
      dotPattern.startDraw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'imagePattern') {
      imagePattern.startDraw(canvasRef.current, event);
    }
  };

  const draw = (event: any) => {
    if (_.camelCase(strokeType) === 'simplePencil') {
      simplePencil.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'shadows') {
      shadows.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'coloredPixels') {
      coloredPixels.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'fur') {
      fur.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'rainbow') {
      rainbow.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'shapes') {
      shapes.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'spray') {
      spray.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'dotPattern') {
      dotPattern.draw(canvasRef.current, event);
    } else if (_.camelCase(strokeType) === 'imagePattern') {
      imagePattern.draw(canvasRef.current, event);
    }
  };

  const exitDraw = (event: any) => {
    if (_.camelCase(strokeType) === 'simplePencil') {
      simplePencil.exitDraw();
    } else if (_.camelCase(strokeType) === 'shadows') {
      shadows.exitDraw(canvasRef.current);
    } else if (_.camelCase(strokeType) === 'coloredPixels') {
      coloredPixels.exitDraw();
    } else if (_.camelCase(strokeType) === 'fur') {
      fur.exitDraw();
    } else if (_.camelCase(strokeType) === 'rainbow') {
      rainbow.exitDraw();
    } else if (_.camelCase(strokeType) === 'shapes') {
      shapes.exitDraw();
    } else if (_.camelCase(strokeType) === 'spray') {
      spray.exitDraw();
    } else if (_.camelCase(strokeType) === 'dotPattern') {
      dotPattern.exitDraw(canvasRef.current);
    } else if (_.camelCase(strokeType) === 'imagePattern') {
      imagePattern.exitDraw(canvasRef.current);
    }
  };

  return (
    <View>
      <View>
        <canvas
          ref={onCanvasCreate}
          style={{
            backgroundColor: 'yellow',
            height: canvasHeight,
            width: canvasWidth,
          }}
          onTouchStart={evt => {
            startDraw(evt);
          }}
          onTouchMove={evt => {
            draw(evt);
          }}
          onTouchEnd={evt => {
            exitDraw(evt);
          }}
          onMouseDown={evt => {
            startDraw(evt);
          }}
          onMouseMove={evt => {
            draw(evt);
          }}
          onMouseUp={evt => {
            exitDraw(evt);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('simplePencil');
          }}>
          Simple Pencil 2
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('coloredPixels');
          }}>
          Colored Pixels
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('fur');
          }}>
          Fur
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('shadows');
          }}>
          Shadows
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('shapes');
          }}>
          Shapes
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('spray');
          }}>
          Spray
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('dotPattern');
          }}>
          Dot Pattern
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokeType('imagePattern');
          }}>
          Image Pattern
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            const context = canvasRef.current?.getContext('2d');
            context.clearRect(0, 0, canvasWidth, canvasHeight);
          }}>
          CLEAR
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (comingFromMobile) {
              window.ReactNativeWebView.postMessage(
                'React Native Mobile Code to save',
              );
            } else {
              window.alert('React Web Code to save');
            }
          }}>
          SAVE
        </TouchableOpacity>
      </View>
      <Text>
        2 window.comingFromMobile: {comingFromMobile ? 'true' : 'false'}
      </Text>
      <Text>
        2 activityId: {comingFromMobile ? window.activityId : props.activityId}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default CanvasExample2;
