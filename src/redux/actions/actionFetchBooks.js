import {
  FETCH_BOOKS_LOADING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
} from "../constants";
import axios from "axios";

const fetchBooksLoading = () => {
  return {
    type: FETCH_BOOKS_LOADING,
  };
};

const fetchBooksSuccess = (data) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: data,
  };
};

const fetchBooksError = (err) => {
  return {
    type: FETCH_BOOKS_ERROR,
    payload: err,
  };
};

export const fetchBooks = (title) => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  return (dispatch) => {
    dispatch(fetchBooksLoading());

    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${GOOGLE_API_KEY}&maxResults=${30}`
      )
      .then((res) => {
        const booksItemsArray = res.data.items;
        dispatch(fetchBooksSuccess(booksItemsArray));
      })
      .catch((err) => {
        dispatch(fetchBooksError(err.message));
      });
  };
};
