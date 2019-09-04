import { useEffect, useCallback, useRef, useReducer } from "react";
import axios from "axios";

/**
 * Uses Axios to make http calls.  Return values are the current state of the request.
 * error - null or the error returned from the call.
 * loading - boolean - is the http call in progress.
 * response - null or the completed http response.
 * data - shortcut to the `data` property of the response.
 * cancel- Function which can be called in order to cancel the current request.
 * @param  {object} config - Axios config which describes the http call to make
 * @param  {array} dependencies - Dependencies that should trigger the request on changes.
 * @returns {object} - { error, loading, response }
 */
export default function useAxios(config, dependencies) {
  const axiosTask = useAxiosTask(config, dependencies);
  useEffect(() => {
    axiosTask.start();
    return axiosTask.cancel;
  }, dependencies);

  return axiosTask;
}

/**
 * Uses Axios to make http calls.  Return values are the current state of the request.
 * error - null or the error returned from the call.
 * loading - boolean - is the http call in progress.
 * response - null or the completed http response.
 * data - shortcut to the `data` property of the response.
 * cancel- Function which can be called in order to cancel the current request.
 * @param  {string} url - The url to GET
 * @param  {string} params - Optional - Query string parameters
 * @param  {array} dependencies - Dependencies that should trigger the request on changes.
 * @returns {object} - { error, loading, response }
 */
export function useGet(url, params, dependencies) {
  return useAxios(
    {
      url,
      params
    },
    dependencies
  );
}

/**
 * Uses Axios to make http calls.  Return values are the current state of the request.
 * error - null or the error returned from the call.
 * loading - boolean - is the http call in progress.
 * response - null or the completed http response.
 * data - shortcut to the `data` property of the response.
 * cancel- Function which can be called in order to cancel the current request.
 * @param  {string} url - The url to GET
 * @param  {string} data - Optional - Values to send as the body of the POST request.
 * @param  {array} dependencies - Dependencies that should trigger the request on changes.
 * @returns {object} - { error, loading, response }
 */
export function usePost(url, data, dependencies) {
  return useAxios(
    {
      method: "POST",
      url,
      data
    },
    dependencies
  );
}

const initalState = {
  started: false,
  loading: true,
  response: null,
  error: null,
  data: null
};

const ACTIONS = {
  INIT: "INIT",
  START: "START",
  RESPONSE: "RESPONSE",
  ERROR: "ERROR"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INIT:
      return initalState;
    case ACTIONS.START:
      return {
        ...state,
        started: true
      };
    case ACTIONS.RESPONSE:
      return {
        ...state,
        loading: false,
        response: action.response,
        data: action.response.data
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      throw new Error(`Unexpected action type ${action.type}`);
  }
};

/**
 * Creates an async function, which can be used to make a request using Axios.
 * The call will not be created until the `started` function is called.
 * error - null or the error returned from the call.
 * loading - boolean - is the http call in progress.
 * response - null or the completed http response.
 * data - shortcut to the `data` property of the response.
 * started - boolean - True if the request has been started.  Will remain True even after it has completed.
 * start - function - The function used to trigger the request.
 * cancel- Function which can be called in order to cancel the current request.
 * @param  {object} config - Axios config which describes the http call to make
 * @param  {array} dependencies - Dependencies that should trigger the request on changes.
 * @returns {object} - { error, loading, response, started, start }
 */
export function useAxiosTask(config, dependencies) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const cancelToken = useRef(null);

  const start = useCallback(() => {
    cancelToken.current = axios.CancelToken.source();

    const requestConfig = {
      ...config,
      cancelToken: cancelToken.current.token
    };

    dispatch({ type: ACTIONS.START });
    return axios(requestConfig)
      .then(response => {
        dispatch({ type: ACTIONS.RESPONSE, response });
        return response;
      })
      .catch(e => {
        if (axios.isCancel(e)) {
          return Promise.reject();
        }

        if (e.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const error = {
            data: e.response.data,
            status: e.response.status,
            message: (e.response.data && e.response.data.message) || e.message
          };
          dispatch({
            type: ACTIONS.ERROR,
            error
          });
          return Promise.reject(error);
        }

        // Something happened in setting up the request that triggered an Error
        const error = {
          message: e.message
        };
        dispatch({
          type: ACTIONS.ERROR,
          error
        });
        return Promise.reject(error);
      });
  }, dependencies);

  const cancel = () => {
    if (cancelToken.current) {
      cancelToken.current.cancel("Request outdated");
    }
  };

  useEffect(() => {
    dispatch({ type: ACTIONS.INIT });
    return cancel;
  }, dependencies);

  return {
    ...state,
    start,
    cancel
  };
}
