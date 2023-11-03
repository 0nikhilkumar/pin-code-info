import React, { useEffect, useState } from "react";
import "./style.css";
import DisplayInfo from "../DisplayInfo/DisplayInfo";
import axios from "axios";
const PostalCode = () => {
  const [data, setData] = useState();
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    // api();
  }, [input]);

  const searchHandler = () => {
    async function api() {
      await axios
        .get(`https://api.zippopotam.us/in/${input}`)
        .then((res) => setData(res.data))
        .catch((err) => console.log("Not calling"));
    }
    api();
  };
  const handleClear = () => {
    setInput("");
    setData("");
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
          <DisplayInfo data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default PostalCode;
