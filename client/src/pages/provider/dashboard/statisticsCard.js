import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";

function StatisticsCard({ color, title, count, percentage, icon }) {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 1, paddingLeft: 16, paddingRight: 16 }}>
        <div
          style={{
            background: color,
            color: color === "light" ? "dark" : "white",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "4rem",
            height: "4rem",
            marginTop: "-3px"
          }}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </div>
        <div style={{ textAlign: "right", lineHeight: 1.25 }}>
          <Typography variant="button" fontWeight="light" color="text">
            {title}
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </div>
      </div>
      <Divider />
      <div style={{ paddingBottom: 16, paddingLeft: 16, paddingRight: 16 }}>
        <Typography component="p" variant="button" color="text">
          <Typography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </Typography>
          &nbsp;{percentage.label}
        </Typography>
      </div>
    </Card>
  );
}

// Setting default values for the props of StatisticsCard
StatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the StatisticsCard
StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default StatisticsCard;
