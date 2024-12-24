import React, { useEffect, useState } from 'react';

type PopupProps = {
    message: string;
    timeout?: number; // Optional, defaults to 3000ms
    onClose?: () => void; // Optional callback when the popup closes
};

const Popup: React.FC<PopupProps> = ({ message, timeout = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Automatically close the popup after the timeout
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) {
                onClose();
            }
        }, timeout);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [timeout, onClose]);

    if (!isVisible) {
        return null;
    }

    return (
        <>
            {/* Overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999,
                }}
            />
            {/* Popup */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px 40px',
                    backgroundColor: 'white',
                    color: '#000',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                }}
            >
                {message}
            </div>
        </>
    );
};

export default Popup;
