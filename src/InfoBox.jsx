import React from "react";
import AnimatedNumber from "animated-number-react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./infoBox.css";
import { goodNum } from "./util";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox ">
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        <h2 className="infoBox__cases">
          <AnimatedNumber
            value={cases}
            formatValue={(v) => goodNum(v.toFixed(0))}
          />
        </h2>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
