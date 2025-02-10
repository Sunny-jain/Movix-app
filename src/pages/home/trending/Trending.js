import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

function Trending() {
  const [endPoint, setEndPoint] = useState("day");

  const { data, loading } = useFetch(`trending/all/${endPoint}`);
  const onTabChange = (tab) => {
    setEndPoint(tab === "Days" ? "day" : "week");
    // console.log(endPoint);
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Days", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data = {data?.results} loading = {loading} />
    </div>
  );
}

export default Trending;
