import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Canvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastX = useRef(0);
    const lastY = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 5;

        const handleDraw = ({ x0, y0, x1, y1 }) => {
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.stroke();
            context.closePath();
        };

        socket.on('drawing', handleDraw);

        return () => {
            socket.off('drawing', handleDraw);
        };
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(true);
        lastX.current = offsetX;
        lastY.current = offsetY;
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const context = canvasRef.current.getContext('2d');
        context.beginPath();
        context.moveTo(lastX.current, lastY.current);
        context.lineTo(offsetX, offsetY);
        context.stroke();
        context.closePath();
        socket.emit('drawing', { x0: lastX.current, y0: lastY.current, x1: offsetX, y1: offsetY });
        lastX.current = offsetX;
        lastY.current = offsetY;
    };

    const endDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseOut={endDrawing}
            width={800}
            height={600}
            style={{ border: '1px solid #000' }}
        />
    );
};

export default Canvas;
