import { createModel } from '@rematch/core';
import { RootModel } from './index';

type AppState = {
  collapsed: boolean
}

export const app = createModel<RootModel>()({
  state: {
    collapsed: false,
  },
  reducers: {

    toggleCollapse: (state: AppState) => {
      return {...state,collapsed:!state.collapsed}
    },
  },
  effects: (dispatch) => ({

  }),
});
