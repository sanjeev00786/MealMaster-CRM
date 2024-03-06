import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Lottie from 'react-lottie';
import animationData from './LoaderAnimation';

const Loader = ({ loading = false  }) => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };
  
    return (
      <Backdrop
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Lottie options={defaultOptions} height={150} width={150} />
      </Backdrop>
    );
  };
  
  export default Loader;