import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons'; // Import the Font Awesome icons

const AnalyticsCard = ({ title, value, percentage, isRising, showPercentageAndIcon = true }) => {
  return (
    <Card variant="outlined" className="analytics-card">
      <CardContent style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="body1" component="h3">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            <div className="value">{value}</div>
          </Typography>
        </div>
        {showPercentageAndIcon && (
          <div className="percentage" style={{ position: 'absolute', bottom: '10px', right: '5px' }}>
            <span className={isRising ? 'rising' : 'falling'}>
              {isRising ? 
                <FontAwesomeIcon icon={faArrowTrendUp} style={{ color: "#1aa871", marginRight: '5px' }} /> : 
                <FontAwesomeIcon icon={faArrowTrendDown} style={{ color: "#a8241a", marginRight: '5px' }} />}
            </span>
            <span style={{ fontSize: '0.8em', color: isRising ? "#1aa871" : "#a8241a" }}>{isRising ? '+' : '-'}{percentage}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;

