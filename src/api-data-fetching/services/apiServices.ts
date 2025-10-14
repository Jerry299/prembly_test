import axios from "axios";
import { covidStatsurl, fetchQuotesUrl, randomUserUrl } from "./urls";

export const getAllQoutes = ({ page }: { page?: number }) => {
  return axios({
    method: "GET",
    url: fetchQuotesUrl,
    params: {
      page: page ?? 1,
    },
  });
};

export const getCovidStats = () => {
  return axios({
    method: "GET",
    url: covidStatsurl,
  });
};

export const getRandomUser = () => {
  return axios({
    method: "GET",
    url: randomUserUrl,
  });
};
