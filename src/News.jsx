import React, { useState, useEffect } from "react";
import "./News.css";
import { time } from "./util";
function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://api.covid19india.org/updatelog/log.json")
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
      });
  }, []);

  return (
    <div id="style-5" className="News">
      {news
        .slice(0)
        .reverse()
        .map((x) => (
          <div className="news_box">
            <p>{x.update}</p>
            <span className="news_time">{time(x.timestamp)}</span>
          </div>
        ))}
    </div>
  );
}

export default News;
