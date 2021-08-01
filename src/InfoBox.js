import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

const InfoBox = ({ title, cases, active, total, casesTitle, ...props }) => {
  return (
    <Card
      className={`info-box ${
        active && "info-box--selected"
      } info-box--${casesTitle}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography color="textSecondary" className="info-box__title">
          {title}
        </Typography>

        <h2 className="info-box__cases">{cases}</h2>

        <Typography color="textSecondary" className="info-box__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
