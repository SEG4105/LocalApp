import { render, screen } from "@testing-library/react";
import App, { getUrl, VideoDisplay } from "./App";
import { videos_url } from "./videoUrl";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the Cooking Video Website/i);
  expect(linkElement).toBeInTheDocument();
});


test("get url test", () => {
  const url = getUrl("pizza")
  expect(url).toEqual(videos_url + "/" + "pizza")
})

test("videoPlayer", () => {
  render(<VideoDisplay video="coolvideobro"></VideoDisplay>)
})
