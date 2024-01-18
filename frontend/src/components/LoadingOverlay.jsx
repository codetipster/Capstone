import React from 'react';
import { Puff } from 'react-loader-spinner';

const LoadingOverlay = () => {
    return (
        <div style={overlayStyle}>
            <Puff color="#00BFFF" height={100} width={100} />
        </div>
    );
}

const overlayStyle = {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
};

export default LoadingOverlay;