
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import DeleteComponent from "../Delete/Delete";
import "./Meal-plan-card.css"

const MultiActionAreaCard = ({ data, onCardButtonClickDelete, onCardButtonClickEdit }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleButtonClickDelete = () => {
    onCardButtonClickDelete(data.plan_id);
  };
  const handleButtonClickEdit = () => {
    onCardButtonClickEdit(data.plan_id);
  };

  
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Card
        className="card-container"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.plan_name}
            </Typography>
           
            <CardActions style={{ position: "absolute", top: 0, right: 0 }}>
              <Button onClick={handleButtonClickDelete}>
          <DeleteComponent />
        </Button>
        </CardActions>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={handleButtonClickEdit}>
            Edit
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
            <Typography gutterBottom variant="h5" component="div">
              ${data.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Typography variant="h6"> {data.description}</Typography>
            </Typography>
            <CardActions style={{ position: "absolute", top: 0, right: 0 }}>
            <Button onClick={handleButtonClickDelete}>
          <DeleteComponent />
        </Button>
        </CardActions>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small"  onClick={handleButtonClickEdit}>
            Edit
          </Button>
        </CardActions>
        
      </Card>
    </ReactCardFlip>
  );
};

export default MultiActionAreaCard;
