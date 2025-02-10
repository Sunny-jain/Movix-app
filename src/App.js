import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/apis";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Home from "./pages/home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Explore from "./pages/explore/explore";
import Details from "./pages/details/details";
import PageNotFound from "./pages/404/PageNotFound";
import Header from "./components/header/header";
import Footer from "./components/footer/Footer";
import SearchResult from "./pages/searchResult/SearchResult";
// import { original } from "@reduxjs/toolkit";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    setUrlData();
    genreCall();
  });

  const setUrlData = () => {
    fetchDataFromApi("configuration", {}).then(res => {
      // console.log(res);
      const url = {
        backdrop: res.images.base_url + "original",
        poster: res.images.base_url + "original",
        profile: res.images.base_url + "original"
      };
      // console.log(url);
      dispatch(getApiConfiguration(url));
    });
  };

  const genreCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let callGenre = {};

    endpoints.forEach(endpoint => {
      promises.push(fetchDataFromApi(`genre/${endpoint}/list`, {}));
    });
    const data = await Promise.all(promises);
    data.map(genres => {
      // console.log(genres);
      genres.genres.forEach(item => (callGenre[item.id] = item));
    });
    dispatch(getGenres(callGenre));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
