import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  act,
  wait,
} from "@testing-library/react";
import Dropdown from "../App";
import { episodes } from "./EpisodesData";
import userEvent from "@testing-library/user-event";
import { fetchShows as mockFetchShows } from "../api/fetchShows";
afterEach(cleanup);

jest.mock("../api/fetchShows");

test("Testing that dropDown renders correctly ", async () => {
  mockFetchShows.mockResolvedValueOnce(episodes);
  const { getAllByText, getByText } = render(
    <Dropdown value='Select a season' placeholder='Select an option' />,
  );

  // Wait for data to load and Dropdown to show in other to select season and episodes
  await waitForElement(() => getByText(/select a season/i));
  const selectSeason = getByText(/select a season/i);

  //season 1 with Episodes
  userEvent.click(selectSeason);
  await wait(() => getByText(/season 1/i));
  userEvent.click(getByText(/season 1/i));
  //Assert
  expect(getAllByText(/episode/i)).toHaveLength(8);

  // Wait for data to load and Dropdown to show in other to select season and episodes

  //season 2 with Episodes
  userEvent.click(selectSeason);
  await wait(() => getByText(/season 2/i));

  userEvent.click(getByText(/season 2/i));

  //Assert
  expect(getAllByText(/episode/i)).toHaveLength(9);
});
