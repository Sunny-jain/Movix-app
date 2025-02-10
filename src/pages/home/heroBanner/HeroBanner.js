import React, { useEffect, useState } from "react";
import "./heroBanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import Img from "../../../components/lazyLoadImage/img";

export default function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const url = useSelector((state) => state.home.url.backdrop);

  const { data, loading } = useFetch(`trending/all/day`);


  useEffect(() => {
    const bg = data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
      console.log(bg);
      setBackground(url + bg);
  }, [data]);

  const searchQueryHandle = (event) => {
    if (event.key === "Enter" && query.length !== 0) {
      navigate("/search/" + query);
    }
  };

  const handleQueryValue = (event) => {
    setQuery(event.target.value);
    console.log(query);
  };

  const handleSubmitHandler = (event) => {
    navigate("/search/" + query);
  };

  return (
    <div className="heroBanner">
      {!loading && background !== undefined && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="bannerContent">
          <span className="title">Welcome.</span>
          <span className="subtitle">
            Millons of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for movies or TV shows..."
              onChange={handleQueryValue}
              onKeyUp={searchQueryHandle}
            />
            <button onClick={handleSubmitHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
