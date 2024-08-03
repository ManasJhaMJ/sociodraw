import React from 'react';

const Notification = ({ message }) => {
    return (
        <div style={styles.notification}>
            {message}
        </div>
    );
};

const styles = {
    notification: {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: 1000,
    }
};

export default Notification;
