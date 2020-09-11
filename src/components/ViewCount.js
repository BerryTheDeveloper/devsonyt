import React, { useState, useEffect } from "react";

function ViewCount({ videoId }) {
  const [isSet, setIsSet] = useState(false);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const link = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${process.env.REACT_APP_YT_DATA_API_KEY}`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setViews(data.items[0].statistics.viewCount);
        setIsSet(true);
      })
      .catch((err) => {
        setViews(0);
        console.log(err);
      });
  }, [videoId]);

  return <>{isSet && <p className="view-count"> {views}</p>}</>;
}

export default ViewCount;
