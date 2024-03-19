import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button, Checkbox } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import DeleteComponent from "../Delete/Delete";
import EditComponent from "../EditButton/EditButton";
import "./Meal-plan-card.css";
import { pink } from '@mui/material/colors';


const MultiActionAreaCard = ({
  data,
  onCardButtonClickDelete,
  onCardButtonClickEdit,
  onCardButtonclickCheckBox,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedPlanIds, setCheckedPlanIds] = useState([]);
  const [ArraySelected, setArraySelected] = useState([]);

  
  const handleClick = (event) => {
    const isViewDetailsButton = event.target.classList.contains(
      "view-details-button"
    );

    if (isViewDetailsButton) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleButtonClickDelete = () => {
    onCardButtonClickDelete(data.plan_id);
  };
  const handleButtonClickEdit = () => {
    onCardButtonClickEdit(data.plan_id);
  };
  const handleButtonClickCheckbox =()=>{
    setIsChecked(!isChecked);
    onCardButtonclickCheckBox(data.plan_id);
    
    
  }
  

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Card
        className="card-container"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="plan_name"
            >
              <Checkbox  onClick={handleButtonClickCheckbox} checked={isChecked}
              // style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
              sx={{
                color:"#AEAEAE",
                '&.Mui-checked': {
                  color: isChecked ? "#6F59DA" : "#AEAEAE", // Change color when checked
                },
               
               
              }}
              

              />
              {data.plan_name}
            </Typography>
            <div className="price">${data.price} per month</div>
            <div className="description">{data.description}</div>

            <CardActions style={{ position: "absolute", top: 0, right: 0 }}>
              {/* <Button onClick={handleButtonClickDelete}> */}
              <Button onClick={handleButtonClickEdit}>
                {/* <DeleteComponent /> */}
                <EditComponent />
              </Button>
            </CardActions>
          </CardContent>
        </CardActionArea>
        <CardActions className="view-details">
          <Button size="small" className="view-details-button">
            View Details
          </Button>
        </CardActions>
      </Card>

      {/* Back of the card */}
      <Card
        className="card-container"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="plan_name"
            >
              <Checkbox onClick={handleButtonClickCheckbox} checked={isChecked}
              // style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
              />
              {data.plan_name}
            </Typography>
            <div className="price">${data.price} per month</div>
            <div className="description_flipped">{data.description}</div>

            <CardActions style={{ position: "absolute", top: 0, right: 0 }}>
              {/* <Button onClick={handleButtonClickDelete}> */}
              <Button onClick={handleButtonClickEdit}>
                {/* <DeleteComponent /> */}
                <EditComponent />
              </Button>
            </CardActions>
          </CardContent>
        </CardActionArea>
        <CardActions className="view-details">
          <Button size="small" className="view-details-button">
           Close
          </Button>
        </CardActions>
        
      </Card>
    </ReactCardFlip>
  );
};

export default MultiActionAreaCard;
