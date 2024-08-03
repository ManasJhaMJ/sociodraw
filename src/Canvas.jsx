import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Canvas = ({ color }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastX = useRef(0);
    const lastY = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set up the canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.lineWidth = 5;
        };

        resizeCanvas(); // Initial resize

        // Resize canvas on window resize
        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 5;

        const handleDraw = ({ x0, y0, x1, y1, color }) => {
            context.strokeStyle = color;
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.stroke();
            context.closePath();
        };

        const handleInitialDrawingData = (data) => {
            data.forEach((item) => {
                handleDraw(item);
            });
        };

        socket.on('initialDrawingData', handleInitialDrawingData);
        socket.on('drawing', handleDraw);

        const handleTouchStart = (e) => {
            const rect = canvas.getBoundingClientRect();
            const offsetX = e.touches[0].clientX - rect.left;
            const offsetY = e.touches[0].clientY - rect.top;
            setIsDrawing(true);
            lastX.current = offsetX;
            lastY.current = offsetY;
        };

        const handleTouchMove = (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const offsetX = e.touches[0].clientX - rect.left;
            const offsetY = e.touches[0].clientY - rect.top;
            context.strokeStyle = color;
            context.beginPath();
            context.moveTo(lastX.current, lastY.current);
            context.lineTo(offsetX, offsetY);
            context.stroke();
            context.closePath();
            socket.emit('drawing', { x0: lastX.current, y0: lastY.current, x1: offsetX, y1: offsetY, color });
            lastX.current = offsetX;
            lastY.current = offsetY;
            e.preventDefault(); // Prevent scrolling when drawing
        };

        const handleTouchEnd = () => {
            setIsDrawing(false);
        };

        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);

        return () => {
            socket.off('initialDrawingData', handleInitialDrawingData);
            socket.off('drawing', handleDraw);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    }, [color, isDrawing]);

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
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(lastX.current, lastY.current);
        context.lineTo(offsetX, offsetY);
        context.stroke();
        context.closePath();
        socket.emit('drawing', { x0: lastX.current, y0: lastY.current, x1: offsetX, y1: offsetY, color });
        lastX.current = offsetX;
        lastY.current = offsetY;
    };

    const endDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <div className="canvas-container">
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseOut={endDrawing}
                width={800}
                height={600}
            />
        </div>
    );
};

export default Canvas;
