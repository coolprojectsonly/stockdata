import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./action";
import { motion } from "framer-motion";

function App() {
  const [headers, setHeaders] = useState([]); // Initialize with an empty array

  const [values, setValues] = useState([]);

  const dispatch = useDispatch();
  const { error, data, status } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const tr = data["Meta Data"];
      if (tr && typeof tr === "object") {
        const headerKeys = Object.keys(tr);
        const dataValue = Object.values(tr);
        // Transform headerKeys into an array of objects
        const headersWithAccessor = headerKeys.map((headerKey) => ({
          Headers: headerKey.replace(/[0-9. ]/g, ""),
          accessor: headerKey,
        }));

        setHeaders(headersWithAccessor);
        setValues(dataValue);
      }
    }
  }, [data]);

  const handleButton = () => {
    // Add your button handling logic here
  };

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  if (status === "error") {
    return <h1>Something Went Wrong: {error}</h1>;
  }

  console.log(data);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header.Headers}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {values.map((item, index) => (
            <tr>
              {headers.map((ping, ind) => (
                // <td>{values[ping.accessor]}</td>
                <td>{item[ping.Headers]}</td>
              ))}
            </tr>
          ))} */}

          {values.map((values, valuesIndex) => (
            <tr key={valuesIndex}>
              {headers.map((cols, colIndex) => (
                <td key={colIndex}>
                  <motion.div
                    className=""
                    layoutTransition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    }}
                  >
                    {values[cols.accessor]}
                  </motion.div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleButton}>Handle</button>
    </div>
  );
}

export default App;
