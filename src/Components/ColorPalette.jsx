import React from 'react';

const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

const ColorPalette = ({ selectedColor, onSelectColor }) => {
    return (
        <div className='palette'>
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
    color: {
        width: '30px',
        height: '30px',
        margin: '0 5px',
        cursor: 'pointer',
        borderRadius: '50%'
    }
};

export default ColorPalette;
