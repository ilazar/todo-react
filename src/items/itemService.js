import { ItemRestClient } from './ItemRestClient';

/// actions
export const ITEMS_FETCH_STARTED = 'ITEMS_FETCH_STARTED';
export const ITEMS_FETCH_FAILED = 'ITEMS_FETCH_FAILED';
export const ITEMS_SEARCH_SUCCEEDED = 'ITEMS_SEARCH_SUCCEEDED';
export const ITEMS_CREATE_SUCCEEDED = 'ITEMS_CREATE_SUCCEEDED';
export const ITEMS_UPDATE_SUCCEEDED = 'ITEMS_UPDATE_SUCCEEDED';

export const itemsFetchStarted = () => ({ type: ITEMS_FETCH_STARTED });
export const itemsFetchFailed = error => ({ type: ITEMS_FETCH_FAILED, error });
export const itemsSearchSucceeded = items => ({ type: ITEMS_SEARCH_SUCCEEDED, items });
export const itemsCreateSucceeded = item => ({ type: ITEMS_CREATE_SUCCEEDED, item });
export const itemsUpdateSucceeded = item => ({ type: ITEMS_UPDATE_SUCCEEDED, item });

const itemRestClient = new ItemRestClient();

export const fetchItems = () => dispatch => {
  dispatch(itemsFetchStarted());
  itemRestClient.search({})
    .then(itemsSearchSucceeded)
    .catch(itemsFetchFailed)
    .then(dispatch);
};

export const createItem = item => dispatch => {
  dispatch(itemsFetchStarted());
  itemRestClient.create(item)
    .then(itemsCreateSucceeded)
    .catch(itemsFetchFailed)
    .then(dispatch);
};

export const updateItem = item => dispatch => {
  dispatch(itemsFetchStarted());
  itemRestClient.update(item)
    .then(itemsUpdateSucceeded)
    .catch(itemsFetchFailed)
    .then(dispatch);
};

// reducer
export const initialState = {
  items: null,
  isFetching: false,
  error: null,
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_FETCH_STARTED:
      return { ...state, isFetching: true, error: null };
    case ITEMS_FETCH_FAILED:
      return { ...state, isFetching: false, fetchItemsError: action.error };
    case ITEMS_SEARCH_SUCCEEDED:
      return { ...state, isFetching: false, items: action.items };
    case ITEMS_CREATE_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        items: (state.items || []).concat(action.item)
      };
    case ITEMS_UPDATE_SUCCEEDED:
      const updatedItem = action.item;
      return {
        ...state,
        isFetching: false,
        items: (state.items || [])
          .map(item => (item.id === updatedItem.id ? updatedItem : item))
      };
    default:
      return state;
  }
};
