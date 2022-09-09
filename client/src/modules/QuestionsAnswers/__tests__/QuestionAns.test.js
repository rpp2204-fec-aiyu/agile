require("dotenv").config()
const APIKEY = process.env.APIKEY
import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios'
import QuesAns from '../QuesAns.jsx';
import AddQuesForm from '../AddQuesForm.jsx';
import QuestionView from '../QuestionView.jsx';
import AddAnsForm from '../AddAnsForm.jsx';

let product = [
  {
      "id": 71697,
      "campus": "hr-rpp",
      "name": "Camo Onesie",
      "slogan": "Blend in to your crowd",
      "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      "category": "Jackets",
      "default_price": "140.00",
      "created_at": "2022-05-11T19:38:15.373Z",
      "updated_at": "2022-05-11T19:38:15.373Z"
  },
  {
      "id": 71698,
      "campus": "hr-rpp",
      "name": "Bright Future Sunglasses",
      "slogan": "You've got to wear shades",
      "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      "category": "Accessories",
      "default_price": "69.00",
      "created_at": "2022-05-11T19:38:15.373Z",
      "updated_at": "2022-05-11T19:38:15.373Z"
  },
  {
      "id": 71699,
      "campus": "hr-rpp",
      "name": "Morning Joggers",
      "slogan": "Make yourself a morning person",
      "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      "category": "Pants",
      "default_price": "40.00",
      "created_at": "2022-05-11T19:38:15.373Z",
      "updated_at": "2022-05-11T19:38:15.373Z"
  },
  {
      "id": 71700,
      "campus": "hr-rpp",
      "name": "Slacker's Slacks",
      "slogan": "Comfortable for everything, or nothing",
      "description": "I'll tell you how great they are after I nap for a bit.",
      "category": "Pants",
      "default_price": "65.00",
      "created_at": "2022-05-11T19:38:15.373Z",
      "updated_at": "2022-05-11T19:38:15.373Z"
  },
  {
      "id": 71701,
      "campus": "hr-rpp",
      "name": "Heir Force Ones",
      "slogan": "A sneaker dynasty",
      "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
      "category": "Kicks",
      "default_price": "99.00",
      "created_at": "2022-05-11T19:38:15.373Z",
      "updated_at": "2022-05-11T19:38:15.373Z"
  }
];

let question = {
  "question_id": 631402,
  "question_body": "Can I wash it?",
  "question_date": "2017-01-04T00:00:00.000Z",
  "asker_name": "luaulover",
  "question_helpfulness": 93,
  "reported": false,
  "answers": {
      "5897188": {
          "id": 5897188,
          "body": "I've thrown it in the wash and it seems fine",
          "date": "2017-01-04T00:00:00.000Z",
          "answerer_name": "skilover",
          "helpfulness": 22,
          "photos": [
              "https://images.unsplash.com/photo-1469504512102-900f29606341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
              "https://images.unsplash.com/photo-1510551310160-589462daf284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80"
          ]
      },
      "5897189": {
          "id": 5897189,
          "body": "It says not to",
          "date": "2017-01-04T00:00:00.000Z",
          "answerer_name": "skilover",
          "helpfulness": 15,
          "photos": []
      },
      "5897190": {
          "id": 5897190,
          "body": "Yes",
          "date": "2017-01-04T00:00:00.000Z",
          "answerer_name": "skilover",
          "helpfulness": 12,
          "photos": []
      },
      "5897221": {
          "id": 5897221,
          "body": "I wouldn't machine wash it",
          "date": "2017-11-04T00:00:00.000Z",
          "answerer_name": "skilover",
          "helpfulness": 10,
          "photos": []
      },
      "5987119": {
          "id": 5987119,
          "body": "Only if you want to destroy your shoes. ",
          "date": "2022-07-22T00:00:00.000Z",
          "answerer_name": "Seller",
          "helpfulness": 3,
          "photos": []
      },
      "5987266": {
          "id": 5987266,
          "body": "test answer",
          "date": "2022-07-26T00:00:00.000Z",
          "answerer_name": "pw123",
          "helpfulness": 0,
          "photos": []
      },
      "5987267": {
          "id": 5987267,
          "body": "test answer15",
          "date": "2022-07-26T00:00:00.000Z",
          "answerer_name": "pw123",
          "helpfulness": 1,
          "photos": [
              "https://image.shutterstock.com/image-photo/car-speed-drive-on-road-260nw-1102056875.jpg",
              "https://image.shutterstock.com/image-photo/high-fashion-young-beautiful-woman-260nw-1325789024.jpg"
          ]
      },
      "5987291": {
          "id": 5987291,
          "body": "yes you can ",
          "date": "2022-07-27T00:00:00.000Z",
          "answerer_name": "jack",
          "helpfulness": 0,
          "photos": []
      },
      "5987292": {
          "id": 5987292,
          "body": "yes you can ",
          "date": "2022-07-27T00:00:00.000Z",
          "answerer_name": "jack",
          "helpfulness": 0,
          "photos": []
      },
      "5987324": {
          "id": 5987324,
          "body": "test",
          "date": "2022-07-30T00:00:00.000Z",
          "answerer_name": "tester",
          "helpfulness": 0,
          "photos": []
      },
      "5987469": {
          "id": 5987469,
          "body": "yes!",
          "date": "2022-08-29T00:00:00.000Z",
          "answerer_name": "kl",
          "helpfulness": 0,
          "photos": []
      },
      "5987470": {
          "id": 5987470,
          "body": "NO! Don't wash your Air Force 1.",
          "date": "2022-08-29T00:00:00.000Z",
          "answerer_name": "KL",
          "helpfulness": 0,
          "photos": []
      },
      "5987475": {
          "id": 5987475,
          "body": "yes you may!",
          "date": "2022-08-29T00:00:00.000Z",
          "answerer_name": "KL",
          "helpfulness": 0,
          "photos": []
      },
      "5987943": {
          "id": 5987943,
          "body": "No",
          "date": "2022-09-03T00:00:00.000Z",
          "answerer_name": "fiona1",
          "helpfulness": 0,
          "photos": []
      },
      "5988064": {
          "id": 5988064,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988065": {
          "id": 5988065,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988066": {
          "id": 5988066,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988067": {
          "id": 5988067,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988068": {
          "id": 5988068,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988069": {
          "id": 5988069,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988070": {
          "id": 5988070,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988071": {
          "id": 5988071,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988072": {
          "id": 5988072,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988073": {
          "id": 5988073,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988074": {
          "id": 5988074,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988075": {
          "id": 5988075,
          "body": "test test test",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "test",
          "helpfulness": 0,
          "photos": []
      },
      "5988078": {
          "id": 5988078,
          "body": "blah blah blah",
          "date": "2022-09-05T00:00:00.000Z",
          "answerer_name": "Seller",
          "helpfulness": 2,
          "photos": [
              "http://res.cloudinary.com/red-bean-rulez/image/upload/v1662392911/FEC_project/b6rm3numtacphpghk4xp.jpg"
          ]
      }
  }
};

it('questions and answers matches snapshot', () => {
  const tree = renderer.create(<QuesAns product={product} productId={71701}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('add question form matches snapshot', () => {
  const tree = renderer.create(<AddQuesForm product={product}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('question view matches snapshot', () => {
  const tree = renderer.create(<QuestionView question={question} product={product}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('question view matches snapshot', () => {
  const tree = renderer.create(<AddAnsForm product={product} question={question}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
