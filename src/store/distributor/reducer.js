import {
  GET_DISTRIBUTORS_SUCCESS,
  GET_DISTRIBUTORS_FAIL,
  ADD_DISTRIBUTORS_SUCCESS,
  ADD_DISTRIBUTORS_FAIL,
  UPDATE_DISTRIBUTORS_SUCCESS,
  UPDATE_DISTRIBUTORS_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  distributors: [],
  error: {},
  loading: true,
};

const Distributors = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DISTRIBUTORS_SUCCESS:
      console.log("Distributor data in reducer:", action.payload);
      return {
        ...state,
        distributors: action.payload,
        loading: false,
      };

    case GET_DISTRIBUTORS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        distributors: [...state.distributors, action.payload],
      };

    case ADD_DISTRIBUTORS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        distributors: state.distributors.map((distributor) =>
          distributor.id.toString() === action.payload.id.toString()
            ? { distributor, ...action.payload }
            : distributor
        ),
      };

    case UPDATE_DISTRIBUTORS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Distributors;
