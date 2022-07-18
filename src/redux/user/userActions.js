import { USER_ACTIONS } from "./userTypes";

import { createAction } from "../../utils/others/reducersUtils";

export const setCurrentUser = (user) =>
  createAction(USER_ACTIONS.SET_CURRENT_USER, user);
