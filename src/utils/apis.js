import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";

export const fetchDataFromApi = async (url, params) => {
  console.log(params);
  params.api_key = process.env.REACT_APP_MOVIE_API_KEY;
  try {
    const { data } = await axios.get(BASE_URL + url, {
      params
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
