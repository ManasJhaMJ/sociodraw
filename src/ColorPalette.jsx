import React from 'react';

const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

const ColorPalette = ({ selectedColor, onSelectColor }) => {
    return (
        <div style={styles.palette}>
            {colors.map(color => (
                <div
                    key={color}
                    style={{
                        ...styles.color,
                        backgroundColor: color,
                        border: selectedColor === color ? '2px solid #000' : 'none'
                    }}
                    onClick={() => onSelectColor(color)}
                />
            ))}
        </div>
    );
};

const styles = {
    palette: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px'
    },
    color: {
        width: '30px',
        height: '30px',
        margin: '0 5px',
        cursor: 'pointer'
    }
};

export default ColorPalette;
