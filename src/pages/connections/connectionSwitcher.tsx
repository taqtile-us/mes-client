import React, { useState } from "react";
import { IonContent, IonButton, IonPage } from "@ionic/react";
import { useCookies } from "react-cookie";
import { updateDataSource } from "../../api/connections";
import { Header } from "../../components/header/Header";
import { ROUTES } from "../../shared/constants/routes";
import { useTranslation } from "react-i18next";
import "./ConnectionSwitcher.scss";


interface ConnectionSwitcherProps {
    initialConnection?: string;
}

const ConnectionSwitcher: React.FC<ConnectionSwitcherProps> = ({ initialConnection = "5s control" }) => {
  const [cookies] = useCookies(["token"]);
  const storedConnection = localStorage.getItem("chosenConnection") || initialConnection;
  const [currentConnection, setCurrentConnection] = useState<string>(storedConnection);
  const { t } = useTranslation();

  const switchConnection = async (connection: "default" | "odoo") => {
    try {
      await updateDataSource(cookies.token, connection);
      const newConnection = connection === "default" ? "5s control" : connection;
      setCurrentConnection(newConnection);
      localStorage.setItem("chosenConnection", newConnection);
    } catch (error) {
      console.error("Error changing data source:", error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <Header title={t("config.dbConnections")} backButtonHref={ROUTES.MENU} />

        <div className="connection-switcher">
          <div className="connection-info">
            <h2 className="connection-title">
              {t("menu.currentConnection")}: <span className="connection-name">{currentConnection.toUpperCase()}</span>
            </h2>
          </div>

          <div className="button-container">
            <IonButton
              onClick={() => switchConnection("default")}
              className="switch-button default-button"
            >
              {t("menu.switchToDefault")}
            </IonButton>
            <IonButton
              onClick={() => switchConnection("odoo")}
              className="switch-button odoo-button"
            >
              {t("menu.switchToOdoo")}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConnectionSwitcher;
