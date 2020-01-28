import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import StarWarsCharacters from "./StarWarsCharacters";
// import {getData as mockGetData} from "../api/getData";
import { getData as mockGetData } from "../api";

// component mounting tests
test("renders the StarWarsCharacters component", () => {
    render(<StarWarsCharacters />);
})

test("renders the Previous button", () => {
    const { queryByText } = render(<StarWarsCharacters />);
    const previousButton = queryByText(/previous/i);
})

test("renders the Next button", () => {
    const { queryByText } = render(<StarWarsCharacters />);
    const nextButton = queryByText(/next/i);
})

// button click tests
test("Previous button can be clicked", () => {
    const { queryByText } = render(<StarWarsCharacters />);
    const previousButton = queryByText(/previous/i);
    fireEvent.click(previousButton);
})

test("Next button can be clicked", () => {
    const { queryByText } = render(<StarWarsCharacters />);
    const nextButton = queryByText(/next/i);
    fireEvent.click(nextButton);
})

const testData = {
    prev: null,
    next: "text",
    results: [
        { name: "character1", url: "url1" },
        { name: "Test Name Two", url: "url2" },
        { name: "Test Name Three", url: "url3" }
    ]
}

jest.mock("../api");

// // API call tests with mockGetData
test("API call is made", async () => {

    console.log(mockGetData);

    mockGetData.mockResolvedValue(testData);
    const { queryByText } = render(<StarWarsCharacters />);

    await wait(() => expect(queryByText(/character1/i)));
    queryByText("character1");

    expect(mockGetData).toHaveBeenCalledTimes(6);
    expect(mockGetData).toHaveBeenCalledWith("https://swapi.co/api/people");

})