# Interview Project

## Description

This project is a part of the interview process for Burningbros company. It is developed using React and yarn is used for managing the dependencies.

## Installation

To install the required dependencies, run the following command:

### `yarn`

This command will download and install the dependencies listed in the package.json file.

## Getting Started

After successfully installing the dependencies, you can start the project by running the following command:

### `yarn start`

This command will start a development server and open the application in a web browser. You can access the application at[http://localhost:3000](http://localhost:3000)

# Testing Scenarios

## Infinite Scroll:

- Scroll down the product list and verify that additional products are loaded automatically.
- Scroll up and down multiple times to ensure smooth and seamless scrolling experience.

## Product Search:

- Enter a search query in the search input
- After entering, you can click "enter" or click the "search" button to search for products

## Combination Testing:

- Perform a product search and then scroll down to load more products.
- Verify that the search results are retained and additional products are appended to the existing list.

## Error Handling:

- Test scenarios where the search query returns no results.
- Check for errors by setting the network to offline.
