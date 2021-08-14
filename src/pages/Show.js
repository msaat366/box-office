/* eslint-disable arrow-body-style */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCEESS': {
      return { isLoading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, show: action.error };
    }
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();

  //   const [show, setShow] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCEESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', show: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log(state);

  if (state.isLoading) {
    return <div>Data is being Loaded</div>;
  }
  if (state.error) {
    return <div>An unexpected Error Occurred </div>;
  }

  return <div>this</div>;
};

export default Show;
