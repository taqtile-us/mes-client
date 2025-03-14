export interface State {
  email: string;
  password: string;
  correctEmail: boolean;
  correctPassword: boolean;
  errorResponse: string;
  errorPassword: boolean;
}

export type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR_RESPONSE"; payload: string }
  | { type: "SET_ERROR_PASSWORD" };