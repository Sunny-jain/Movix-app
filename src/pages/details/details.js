import React from "react";
import "./details.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import SimilarMovies from "./carousels/SimilarMovies";
import Recommendations from "./carousels/Recommendations";

export default function Details() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`${mediaType}/${id}/videos`);
  const {data: cred, loading: credLoading} = useFetch(`${mediaType}/${id}/credits`)
  const trailer = data?.results?.filter((f) => f.name.includes("trailer") || f.name.includes("Trailer") || f.name.includes("Teaser") || f.name.includes("Teaser"))
   
  return (
    <div>
      {!credLoading && <DetailsBanner video = {trailer?.[0]} crew = {cred?.crew} />}
      <Cast data = {cred?.cast} loading = {credLoading} />
      <VideoSection data = {data} loading = {loading} />
      <SimilarMovies mediaType = {mediaType} id = {id} />
      <Recommendations mediaType = {mediaType} id = {id} />
    </div>
  );
}
