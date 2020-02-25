import React from "react";
import {
  render,
  wait,
  cleanup,
  waitForElement,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchShows as mockFetchShows } from "../api/fetchShows";
import App from "../App";
import { episodes } from "./EpisodesData";

afterEach(cleanup);
jest.mock("../api/fetchShows");
console.log("from App test", mockFetchShows);

test("App renders correctly and load data as expected", async () => {
  mockFetchShows.mockResolvedValueOnce(episodes);
  await act(async () => {
    return render(<App />);
  });
});

test("App fetches data and renders episodes of seasons", async () => {
  //Mock resolved value of fetchShow using mockData
  mockFetchShows.mockResolvedValueOnce(episodes);

  //Render  App without data present
  const { getByText, getAllByText, debug } = render(<App />);

  //Wait for data to be loaded and component to render data
  await waitForElement(() => getByText(/fetching data.../i));

  //Wait for dropdown to appear and arrange dropdown component for control
  await waitForElement(() => getByText(/select a season/i));
  const selectSeason = getByText(/select a season/i);

  //season 3 with Episodes
  userEvent.click(selectSeason);
  await wait(() => getByText(/season 3/i));
  userEvent.click(getByText(/season 3/i));

  //Assert
  expect(getAllByText(/episode/i)).toHaveLength(8);

  //season 4 with Episodes
  userEvent.click(selectSeason);
  await wait(() => getByText(/season 4/i));
  userEvent.click(getByText(/season 4/i));

  //Assert
  expect(getAllByText(/episode/i)).toHaveLength(1);
});
