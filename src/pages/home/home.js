import React from "react";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import './home.scss'
import Popular from "./popular/Popular";
import Toprated from "./TopRated/Toprated";


export default function Home() {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <Toprated />
    </div>
  );
}
