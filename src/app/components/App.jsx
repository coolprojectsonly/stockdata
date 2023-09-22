import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./action";

function App() {
  const { data, status, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [headers, setHeaders] = useState([]);
  const [columnData, setColumData] = useState([]);

  const [timeSeries, setTimeSeries] = useState([]);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const timeSeries = data["Time Series (5min)"];

      if (timeSeries && typeof timeSeries === "object") {
        const timeKeys = Object.keys(timeSeries);
        const valueOnjects = Object.values(timeSeries);

        if (valueOnjects && typeof valueOnjects === "object") {
          const val = Object.values(valueOnjects);

          // val[0]

          const getHeaders = Object.keys(val[0]);
          const getData = val.map((item) => Object.values(item));

          const headings = getHeaders.map((item) => ({
            Headers: item.replace(/[0-9\s.]/g, ""),
            accessor: item.replace(/[0-9\s.]/g, ""),
          }));

          setHeaders(headings);

          // console.log(timeKeys);
          setTimeSeries(timeKeys);

          setColumData(getData);
        }

        // console.log(valueOnjects.map((item) => item["1. open"]));
      }
    }
  }, [data]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>Something Went Wrong:{error}</h1>;
  }

  return (
    <>
      <h1>
        Real Time Forex,ETF,{" "}
        <span style={{ color: "blue" }}>Technocal Indicators</span> Data From
        API
      </h1>

      <div className="tableContainer">
        <table className="tableOne">
          <thead>
            {" "}
            <th>No</th>
            <th>Time Series</th>{" "}
          </thead>
          <tbody>
            {timeSeries.map((item, timeIndex) => (
              <tr key={timeIndex}>
                <td>{timeIndex + 1}</td>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="tableTwo">
          <thead>
            <tr>
              {headers.map((item, index) => (
                <th key={index}> {item.Headers}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {columnData.map((item, colIndex) => (
              <tr key={colIndex}>
                {headers.map((itemData, headerIndex) => (
                  <td key={headerIndex}>{item[headerIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
