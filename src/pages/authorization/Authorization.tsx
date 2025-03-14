import { useCookies } from "react-cookie";
import { authorizationRequest } from "../../api/authorization";
import { Input } from "../../components/inputs/input/Input";

import { FiveS } from "../../assets/svg/SVGcomponent";

import "./Authorization.scss";
import { useTranslation } from "react-i18next";
import { setUserRole } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../shared/constants/routes";
import { Link } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
import { AuthResponse } from "../../models/interfaces/authResponse.interface";
import React, { useReducer, KeyboardEvent } from "react";
import { State, Action } from "../../models/interfaces/authorization.interface";


export const Authorization: React.FC = () => {
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["token"]);
  const { t } = useTranslation();

  const initialState: State = {
    email: "",
    password: "",
    correctEmail: true,
    correctPassword: true,
    errorResponse: "",
    errorPassword: false,
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_EMAIL":
        return { ...state, email: action.payload, correctEmail: action.payload.length < 25 };
      case "SET_PASSWORD":
        return { ...state, password: action.payload, correctPassword: action.payload.length < 20, errorPassword: false };
      case "SET_ERROR_RESPONSE":
        return { ...state, errorResponse: action.payload };
      case "SET_ERROR_PASSWORD":
        return { ...state, errorPassword: true };
      default:
        return state;
    }
  };

  const [state, dispatchState] = useReducer(reducer, initialState);

  const handleLogin = async (): Promise<void> => {
    if (state.password.length === 0) {
      dispatchState({ type: "SET_ERROR_PASSWORD" });
      return;
    }

    try {
      const user: AuthResponse = await authorizationRequest(state.email, state.password);
      const { role, token } = user;

      if (token) {
        setCookie("token", `JWT ${token}`, { path: "/" });
      }

      if (role) {
        localStorage.setItem("userRole", role);
        dispatch(setUserRole(role));
        history.go(0);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatchState({ type: "SET_ERROR_RESPONSE", payload: error.message });
      } else {
        dispatchState({ type: "SET_ERROR_RESPONSE", payload: "An unknown error occurred" });
      }
    }
  };

  const pressEnter = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && state.correctEmail && state.correctPassword) {
      handleLogin();
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="authorization-page">
          <img className="authorization-page__logo" src={FiveS} />
          <h2 className="authorization-page__title">{`${t("form.auth.signin")} 5S Control`}</h2>
          <div className="authorization-page__form-container">
            <Input
              label={t("form.auth.login")}
              bold={false}
              value={state.email.trim()}
              required={true}
              type="text"
              placeholder={t("form.auth.loginPlaceholder")}
              state={state.errorResponse ? "error" : "neutral"}
              handleChange={(e) => dispatchState({ type: "SET_EMAIL", payload: e.target.value.trimStart() })}
            />
            <Input
              label={t("form.auth.pwd")}
              bold={false}
              value={state.password.trim()}
              required={true}
              type="password"
              placeholder={t("form.auth.pwdPlaceholder")}
              state={state.errorResponse ? "error" : "neutral"}
              handleChange={(e) => dispatchState({ type: "SET_PASSWORD", payload: e.target.value.trimStart() })}
              onKeyDown={(e) => pressEnter(e)}
            />
            <Link
              className="authorization-page__password-recovery-link"
              to={ROUTES.RECOVER_PASSWORD}
            >
              {t("form.auth.forgotPassword")}
            </Link>
            {state.errorResponse && (
              <span className="authorization-page__error-response">
                {t("messages.incorrectCredentials")}
              </span>
            )}
            {state.errorPassword && (
              <span className="authorization-page__error-password">
                {t("form.required")}
              </span>
            )}
            <button
              className={"authorization-page__submit-button"}
              onClick={handleLogin}
            >
              {t("form.auth.submit")}
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
