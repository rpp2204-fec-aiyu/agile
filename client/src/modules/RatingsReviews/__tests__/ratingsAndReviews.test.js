/**
 * @jest-environment jsdom
 */
import ReactDOM from 'react-dom'
import React from 'react';
import RatingsAndReviews from '../ratingsAndReviews.jsx';
import ReviewsList from '../reviewsList.jsx';
import '@testing-library/jest-dom'
import {render, fireEvent, screen, cleanup} from '@testing-library/react'
const axios = require('axios');
import regeneratorRuntime from "regenerator-runtime";
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  // Describe the requests to mock.
  rest.get('http://localhost:3000/reviews', (req, res, ctx) => {
    return res(
      ctx.json({
        "product": 71697,
        "page": 0,
        "count": 6,
        "results":
          [
            {
              "review_id": 1276238,
              "rating": 5,
              "summary": "Test",
              "recommend": true,
              "response": null,
              "body": "qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty",
              "date": "2022-08-27T00:00:00.000Z",
              "reviewer_name": "qwerty",
              "helpfulness": 0,
              "photos": []
            },
            {
              "review_id": 1276235,
              "rating": 5,
              "summary": "Testing ",
              "recommend": true,
              "response": null,
              "body": "This is a test. It is only a test. Do not be alarmed. ",
              "date": "2022-08-27T00:00:00.000Z",
              "reviewer_name": "test",
              "helpfulness": 0,
              "photos": []
            },
            {
              "review_id": 1276234,
              "rating": 5,
              "summary": "Great Product",
              "recommend": true,
              "response": null,
              "body": "I would buy these again. But you shouldn't buy them because then there are more for me!",
              "date": "2022-08-27T00:00:00.000Z",
              "reviewer_name": "guest",
              "helpfulness": 0,
              "photos": []
            },
            {
              "review_id": 1276233,
              "rating": 5,
              "summary": "Great Glasses",
              "recommend": true,
              "response": null,
              "body": "My futures so bright I gotta wear these shades. My futures so bright I gotta wear these shades.",
              "date": "2022-08-27T00:00:00.000Z",
              "reviewer_name": "timbuk",
              "helpfulness": 0,
              "photos": []
            },
            {
              "review_id": 1276232,
              "rating": 5,
              "summary": "Great",
              "recommend": false,
              "response": null,
              "body": "Error: Review body contains invalid entries Error: Review body contains invalid entries",
              "date": "2022-08-27T00:00:00.000Z",
              "reviewer_name": "qwerty",
              "helpfulness": 0,
              "photos": []
            },
            {
              "review_id": 1276241,
              "rating": 3,
              "summary": "Not so great!",
              "recommend": false,
              "response": null,
              "body": "I do not like this product. I will not buy it again. ",
              "date": "2022-08-27T00:00:00.000Z",
              "reviewer_name": "test",
              "helpfulness": 0,
              "photos": []
          }
          ]
      }),
    )
  }),
  rest.get('http://localhost:3000/reviews/meta', (req, res, ctx) => {
    return res(
      ctx.json({
          "product_id": "71697",
          "ratings": {
              "1": "5",
              "2": "12",
              "3": "13",
              "4": "19",
              "5": "39"
          },
          "recommended": {
              "false": "17",
              "true": "71"
          },
          "characteristics": {
              "Fit": {
                  "id": 240582,
                  "value": "3.1298701298701299"
              },
              "Length": {
                  "id": 240583,
                  "value": "3.0779220779220779"
              },
              "Comfort": {
                  "id": 240584,
                  "value": "3.2987012987012987"
              },
              "Quality": {
                  "id": 240585,
                  "value": "3.5263157894736842"
              }
          }
      })
    )
  })
)

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen()
})
afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close()
})

describe.only('RatingsAndReviews', () => {
  it('should render ratingsBreakdown component', () => {
    render(<RatingsAndReviews product_id={71697}/>)
    expect(screen.getByText('RATINGS & REVIEWS')).toBeInTheDocument();
  })
  it('should render productBreakdown component', async () => {
    render(<RatingsAndReviews product_id={71697}/>)
    expect(await screen.findByText('Quality')).toBeInTheDocument();
    expect(await screen.findByText('Fit')).toBeInTheDocument();
    expect(await screen.findByText('Length')).toBeInTheDocument();
    expect(await screen.findByText('Comfort')).toBeInTheDocument();
    expect(await screen.queryByText('Width')).toBeNull();
    expect(await screen.queryByText('Size')).toBeNull();
  })
  it('should render the reviewListSort component', () => {
    render(<RatingsAndReviews product_id={71697}/>)
    expect(screen.getAllByRole('option')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('option')[1]).toBeInTheDocument();
    expect(screen.getAllByRole('option')[2]).toBeInTheDocument();
  })
  it('should not render reviews until mounted', () => {
    render(<RatingsAndReviews product_id={71697}/>)
    expect(screen.queryByTestId('review1')).toBeNull();
    expect(screen.queryByTestId('review2')).toBeNull();
  })
  it('should render only 2 reviews on page load', async () => {
    render(<RatingsAndReviews product_id={71697} />);
    expect(await screen.findByTestId('review1')).toBeInTheDocument();
    expect(await screen.findByTestId('review2')).toBeInTheDocument();
    expect(await screen.queryByTestId('review3')).toBeNull();
    expect(await screen.queryByTestId('review4')).toBeNull();
  })
  it('should render 2 more reviews when MORE REVIEWS button is clicked', async () => {
    render(<RatingsAndReviews product_id={71697} />);
    fireEvent.click(await screen.findByText('MORE REVIEWS'));
    const reviewList = await screen.findAllByTestId(/review/);
    expect(reviewList).toHaveLength(4);
  })
  it('should not render MORE REVIEWS button if all reviews are present on the page', async () => {
    render(<RatingsAndReviews product_id={71697} />);
    fireEvent.click(await screen.findByText('MORE REVIEWS'));
    fireEvent.click(await screen.findByText('MORE REVIEWS'));
    const reviewList = await screen.findAllByTestId(/review/);
    expect(reviewList).toHaveLength(6);
    expect(await screen.queryByText('MORE REVIEWS')).toBeNull();
  })
  it('should filter reviews by a rating if a rating filter is clicked', async () => {
    render(<RatingsAndReviews product_id={71697} />);
    fireEvent.click(await screen.findByTestId('3-rating-filter'));
    expect(await screen.findByTestId('review1')).toBeInTheDocument();
    const reviewList = await screen.findAllByTestId(/review/);
    expect(reviewList).toHaveLength(1);
  })
  it('if filter is clicked, the user should see the Remove all filters button', async () => {
    render(<RatingsAndReviews product_id={71697} />);
    fireEvent.click(await screen.findByTestId('5-rating-filter'));
    expect(await screen.findByText('Remove all filters')).toBeInTheDocument();
    const reviewList = await screen.findAllByTestId(/review/);
    expect(reviewList).toHaveLength(2);
  })
  // it('if a filter is applied, then the user sorts the filtered list of reviews, the filter should be removed', async () => {
  //   render(<RatingsAndReviews product_id={71697} />);
  //   fireEvent.click(await screen.findByTestId('3-rating-filter'));
  //   expect(await screen.findByText('Remove all filters')).toBeInTheDocument();
  //   const reviewList1 = await screen.findAllByTestId(/review/);
  //   expect(reviewList1).toHaveLength(1);
  //   //now click sort button on newest
  //   expect(screen.getByText('Newest')).toBeInTheDocument();
  //   fireEvent.click(await screen.getByText('Newest'));
  //   screen.debug();
  //   const reviewList2 = await screen.findAllByTestId(/review/);
  //   expect(reviewList2).toHaveLength(2);
  //   // expect(screen.getAllByRole('option')[3]).toBeInTheDocument();
  // })
})

//keyword search tests
/*
if keyword search is less than 3, no search should be applied

if keyword search is 3 chars or more, search term should be applied

if keyword search is 3 chars or more, then is less than 3, all reviews should re-render

if sort is applied when a search term is filtering, sort should sort by applied filter

if keyword search and rating filter should work together

if a keyword search is applied, and a rating filter is turned off after being enabled, keyword search should not change
*/