import axios from "axios";

export const fetchShows = () => {
  return axios
    .get(
      "https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes",
    )
    .then(res => {
      return res.data;
      //setSeasons(formatSeasons(res.data._embedded.episodes));
    })
    .catch(err => {
      const dataErr = err;
      console.error("The data requested", err.message);
      return dataErr;
    });
};
