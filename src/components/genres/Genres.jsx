import React from "react";
import { useSelector } from "react-redux";
import "./genres.scss"

const Genres = ({ data }) => {
  const { genre } = useSelector((state) => state.home);
  // console.log(genre);
  return (
    <div className="genres">
      {data?.map((genre_id) => {
        if (!genre[genre_id]?.name) return;
        return (
          <div className="genre" key={genre_id}>
            {genre[genre_id]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
