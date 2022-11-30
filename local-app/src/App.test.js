import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App, { determineDrawerType, getUrl, VideoDisplay, isMobile, VideoDrawer } from "./App";
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

test("determineDrawerType", () => {
  const type = determineDrawerType()
  expect(type).toBe("temporary")
})


test('isMobile', () => {
  const type = isMobile()
  expect(type).toBe(true)
})

const openDropdown = () => {
  const drawerOpenButton = screen.getByTestId("MenuIcon")
  fireEvent.click(drawerOpenButton)
}

const closeDropdown = async () => {
  const closeDropdownButton = screen.getByText(/close drawer/i)
  fireEvent.click(closeDropdownButton)
  // check that dropdown is closed
  const home = screen.getByText(/Home/)
  await waitFor(() => {
    expect(home).not.toBeInTheDocument()
  })
}

test("dropdown opens", () => {
  render(<App />);
  openDropdown()
  const linkElement = screen.getByText(/Dinner Party 3/i);
  expect(linkElement).toBeInTheDocument();
})

test("app navigates to different pages", async () => {
  render(<App />);
  openDropdown()
  const linkElement = screen.getByText(/Dinner Party 3/i);
  fireEvent.click(linkElement)
  await closeDropdown()
  const title = screen.getByText(/Dinner Party 3/i);
  expect(title).toBeInTheDocument()
});


test("video display displays video", () => {
  const url = "coolvideourl"
  const name = "cool video"
  render(<VideoDisplay video={{name, video:url}} />)
  const source = screen.getByTestId("videosource")
  expect(source.getAttribute("src")).toEqual(url)
})


test("video display displays header with video name", () => {
  const url = "coolvideourl"
  const name = "cool video"
  render(<VideoDisplay video={{name, video:url}} />)
  const source = screen.getByTestId("videoHeader")
  expect(source.textContent).toEqual(name)
})


test("video drawer renders", () => {
  render(<VideoDrawer videos={[{name: "stuff", path: "stuff"}]}></VideoDrawer>)
})