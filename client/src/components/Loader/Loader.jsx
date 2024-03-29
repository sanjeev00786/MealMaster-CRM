import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Lottie from 'react-lottie';
import animationData from './LoaderAnimation';
import "../../pages/CSS/variable.css"

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
        sx={{ backgroundColor: 'var(--gradient-color4)', color: 'var(--white-color)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Lottie options={defaultOptions} height={150} width={150} />
      </Backdrop>
    );
  };
  
  export default Loader;