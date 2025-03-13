import { useEffect, useState } from "react";
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

export const Authorization = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctEmail, setCorrectEmail] = useState(true);
  const [correctPassword, setCorrectPassword] = useState(true);
  const [errorResponse, setErrorResponse] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [, setCookie] = useCookies(["token"]);
  const { t } = useTranslation();

  useEffect(() => {
    if (password.length < 20) {
      setCorrectPassword(true);
    } else {
      setCorrectPassword(false);
    }
  }, [password]);

  useEffect(() => {
    if (email.length < 25) {
      setCorrectEmail(true);
    } else {
      setCorrectEmail(false);
    }
  }, [email]);

  const handleLogin = async () => {
    if (password.length === 0) {
      setErrorPassword(true);
      return;
    }
  
    try {
      const user: AuthResponse = await authorizationRequest(email, password);
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
        setErrorResponse(error.message);
      } else {
        setErrorResponse('An unknown error occurred');
      }
    }
  };

  const pressEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && correctEmail && correctPassword) {
      handleLogin();
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="authorization">
          <img className="authorization__logo" src={FiveS} />
          <h2 className="authorization__title">{`${t("form.auth.signin")} 5S Control`}</h2>
          <div className="authorization__container">
            <Input
              label={t("form.auth.login")}
              bold={false}
              value={email}
              required={true}
              type="text"
              placeholder={t("form.auth.loginPlaceholder")}
              state={errorResponse ? "error" : "neutral"}
              handleChange={e => setEmail(e.target.value)}
            />
            <Input
              label={t("form.auth.pwd")}
              bold={false}
              value={password}
              required={true}
              type="password"
              placeholder={t("form.auth.pwdPlaceholder")}
              state={errorResponse ? "error" : "neutral"}
              handleChange={e => {
                setPassword(e.target.value);
                setErrorPassword(false);
              }}
              onKeyDown={e => pressEnter(e)}
            />
            <Link className="authorization__password-recovery-link" to={ROUTES.RECOVER_PASSWORD}>
              {t("form.auth.forgotPassword")}
            </Link>
            {errorResponse && (
              <span className="authorization__error_response">{t("messages.incorrectCredentials")}</span>
            )}
            {errorPassword && <span className="authorization__error_password">{t("form.required")}</span>}
            <button className={"authorization__button"} onClick={handleLogin}>
              {t("form.auth.submit")}
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
