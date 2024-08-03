import React from 'react';

const Notification = ({ message }) => {
    return (
        <div className='notification-box'>
            {message}
        </div>
    );
};

export default Notification;
