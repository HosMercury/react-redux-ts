import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const searchRepositors = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SEARCH_REPOSITORS });

    try {
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: term
          }
        }
      );

      const names = data.objects.map((result: any) => {
        return result.package.name;
      });

      dispatch({ type: ActionType.SEARCH_REPOSITORS_SUCCESS, payload: names });
    } catch (error) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORS_ERROR,
        payload: error.message
      });
    }
  };
};
