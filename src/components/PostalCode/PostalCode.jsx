import React, { useEffect, useState } from "react";
import "./style.css";
import DisplayInfo from "../DisplayInfo/DisplayInfo";
import axios from "axios";
const PostalCode = () => {
  const [data, setData] = useState();
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  const searchHandler = () => {
    async function api() {
      const data = await axios
        .get(`https://api.zippopotam.us/in/${input}`)
        .then((res) => {
          setData(res.data);
          setError("");
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setError("Not Found");
          }
        });
    }
    api();
  };
  const handleClear = () => {
    setInput("");
    setData("");
    setError("");
    setLoading(false);
  };
  return (
    <div>
      <div className="main">
        <div className="postCode">
          <div className="input_box">
            <input
              className="input"
              type="text"
              placeholder="Enter zip code..."
              onChange={(e) => setInput(e.target.value)}
              required
              value={input}
            />
            <div className="btn_boxex">
              <button
                disabled={input ? false : true}
                type="submit"
                className="btn"
                onClick={searchHandler}>
                Search
              </button>
              <button
                disabled={input ? false : true}
                type="submit"
                className="btn"
                onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
        <div>
          {error ? (
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "65vh",
              }}>
              {error}
            </h1>
          ) : (
            <DisplayInfo data={data} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostalCode;
