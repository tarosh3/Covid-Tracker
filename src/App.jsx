import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  makeStyles,
  InputLabel,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
// import Map from "./Map";
import Table from "./Table";
// import LineGraph from "./LineGraph";
import Footer from "./Footer";
import { sortData } from "./util";
import "./App.css";
import News from "./News";
import Temp from "./Temp";

const useStyles = makeStyles({
  root: {
    background: "#B5EAEA",

    border: 0,
    color: "black",

    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  selected: {
    background: "black",
    color: "white",
  },
  label: {
    textTransform: "capitalize",
  },
});

function App() {
  const [States, setStates] = useState([]);
  const [State, setState] = useState("Total");
  const [stateInfo, setStateInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [but, setBut] = useState(1);

  // const [isActive, setActive] = useState(false);

  // const toggleClass = () => {
  //   setActive(!isActive);
  // };

  useEffect(() => {
    fetch("https://api.covid19india.org/data.json")
      .then((response) => response.json())
      .then((data) => {
        const temp = data.statewise;
        setStateInfo(temp[0]);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://api.covid19india.org/data.json")
        .then((response) => response.json())
        .then((data) => {
          const temp = data.statewise;
          const States = temp.map((States) => ({
            name: States.state,
            value: States.statecode,
          }));

          const sortedData = sortData(temp);
          setTableData(sortedData);

          setStates(States);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = "https://api.covid19india.org/data.json";

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setState(countryCode);
        const temp = data.statewise;
        const stateInfo = temp.filter((x) => {
          return x.statecode === countryCode;
        });
        setStateInfo(stateInfo[0]);
      });
  };

  const classes = useStyles();

  return (
    <div className="Tracker">
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <div>
              <h1 data-text="C‎‎ovid19...">Covid19...</h1>
              <h3 className="Live">
                Live <span class="dot"></span>{" "}
              </h3>
            </div>

            <FormControl className="app__dropdown" variant="outlined">
              <InputLabel>
                <h4 className="menu_name">Select State</h4>
              </InputLabel>
              <Select
                className="select_state"
                onChange={onCountryChange}
                value={stateInfo.state}
                label="Select State"
              >
                <MenuItem className="first_menu" value="" disabled>
                  Select State
                </MenuItem>
                {States.map((State) => (
                  <MenuItem
                    classes={{
                      root: classes.root, // class name, e.g. `classes-nesting-root-x`
                      label: classes.label, // class name, e.g. `classes-nesting-label-x`
                    }}
                    value={State.value}
                  >
                    {State.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox
              title="Confirmed Covid Cases"
              cases={stateInfo.confirmed}
            />
            <InfoBox title="Total Recovered" cases={stateInfo.recovered} />
            <InfoBox title="Total Deaths" cases={stateInfo.deaths} />
          </div>

          <div className="case__btn">
            <span
              onClick={function () {
                setBut(1);
              }}
              className="Yellow button3"
            >
              Active Cases
            </span>
            <span
              onClick={function () {
                setBut(2);
              }}
              className="Green button3"
            >
              Recovered
            </span>
            <span
              onClick={function () {
                setBut(3);
              }}
              className="Red button3"
            >
              Deceased
            </span>
          </div>

          {/* Map */}
          {/* <LineGraph flag={but} /> */}
          <Temp code={stateInfo.statecode} flag={but} />
        </div>

        <Card className="app__right">
          <CardContent>
            <h3>Live Cases By States</h3>
            <br />

            <Table States={tableData} />
            <br></br>

            <h3>Covid-19 News Updates</h3>
            <News />
            {/* Graph */}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default App;
