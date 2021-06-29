import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./LineGraph.css";
function LineGraph({ flag }) {
  const [caseData, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.covid19india.org/data.json")
      .then((response) => response.json())
      .then((data) => {
        const temp = data.cases_time_series;

        const info = temp.map((x) => ({
          date: x.date,
          confirm: x.dailyconfirmed,
          deceased: x.dailydeceased,
          recovered: x.dailyrecovered,
        }));
        setData(info);
      });
  }, []);

  let dataLen = caseData.length;
  let labelY = [];

  labelY = caseData.filter((x, i) => {
    return i > dataLen - 60;
  });

  if (flag === 1) {
    const newData = {
      labels: labelY.map((yy) => {
        return yy.date;
      }),

      datasets: [
        {
          label: "Daily Confirmed Cases",
          data: labelY.map((yy) => {
            return yy.confirm;
          }),
          fill: true,
          backgroundColor: "rgba(255,237,153,0.2)",
          borderColor: "#FB9300",
        },
      ],
    };
    return (
      <div className="line__wrapper yl">
        <Line data={newData} />
      </div>
    );
  } else if (flag === 3) {
    const newData = {
      labels: labelY.map((yy) => {
        return yy.date;
      }),

      datasets: [
        {
          label: "Daily Deceased",
          data: labelY.map((yy) => {
            return yy.deceased;
          }),
          fill: true,
          backgroundColor: "rgba(255,97,109,0.2)",
          borderColor: "#FF616D",
        },
      ],
    };
    return (
      <div className="line__wrapper rd">
        <Line data={newData} />
      </div>
    );
  } else {
    const newData = {
      labels: labelY.map((yy) => {
        return yy.date;
      }),

      datasets: [
        {
          label: "Daily Recovered",
          data: labelY.map((yy) => {
            return yy.recovered;
          }),
          fill: true,
          backgroundColor: "rgba(102,222,147,0.2)",
          borderColor: "#66DE93",
        },
      ],
    };
    return (
      <div className="line__wrapper gr">
        <Line data={newData} />
      </div>
    );
  }
}

export default LineGraph;
