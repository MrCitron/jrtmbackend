import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICharacter, defaultValue } from 'app/shared/model/character.model';

export const ACTION_TYPES = {
  FETCH_CHARACTER_LIST: 'character/FETCH_CHARACTER_LIST',
  FETCH_CHARACTER: 'character/FETCH_CHARACTER',
  CREATE_CHARACTER: 'character/CREATE_CHARACTER',
  UPDATE_CHARACTER: 'character/UPDATE_CHARACTER',
  DELETE_CHARACTER: 'character/DELETE_CHARACTER',
  RESET: 'character/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICharacter>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CharacterState = Readonly<typeof initialState>;

// Reducer

export default (state: CharacterState = initialState, action): CharacterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHARACTER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHARACTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CHARACTER):
    case REQUEST(ACTION_TYPES.UPDATE_CHARACTER):
    case REQUEST(ACTION_TYPES.DELETE_CHARACTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CHARACTER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHARACTER):
    case FAILURE(ACTION_TYPES.CREATE_CHARACTER):
    case FAILURE(ACTION_TYPES.UPDATE_CHARACTER):
    case FAILURE(ACTION_TYPES.DELETE_CHARACTER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHARACTER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHARACTER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHARACTER):
    case SUCCESS(ACTION_TYPES.UPDATE_CHARACTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHARACTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/characters';

// Actions

export const getEntities: ICrudGetAllAction<ICharacter> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHARACTER_LIST,
  payload: axios.get<ICharacter>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICharacter> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHARACTER,
    payload: axios.get<ICharacter>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICharacter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHARACTER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICharacter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHARACTER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICharacter> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHARACTER,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
