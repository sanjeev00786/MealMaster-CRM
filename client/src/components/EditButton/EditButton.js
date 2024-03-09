import EditRoundedIcon from '@mui/icons-material/EditRounded';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import Edit from '../../component-'



export default function EditComponent() {
    return (
      <Tooltip title="Edit">
          <EditRoundedIcon style={{color:'black'}}/>
        
      </Tooltip>
    );
  }