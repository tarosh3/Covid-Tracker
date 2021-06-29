import React from "react";
import AnimatedNumber from "animated-number-react";
import "./Table.css";
import { goodNum } from "./util.js";
function Table({ States }) {
  return (
    <div>
      <div className="table_head">
        <p>States</p>
        <p>Cases</p>
      </div>
      <div id="style-1" className="table">
        {States.map(({ state, active }) => (
          <tr>
            <td>{state}</td>

            <td>
              <strong>
                <AnimatedNumber
                  value={active}
                  formatValue={(v) => goodNum(v.toFixed(0))}
                />
              </strong>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default Table;
