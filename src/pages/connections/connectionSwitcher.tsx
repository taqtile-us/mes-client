import React, { useState } from "react";
import { IonContent, IonButton, IonPage } from "@ionic/react";
import { useCookies } from "react-cookie";
import { changeDataSource } from "../../api/connections";
import { Header } from "../../components/header/Header";
import { ROUTES } from "../../shared/constants/routes";
import { useTranslation } from "react-i18next";
import "./ConnectionSwitcher.scss";

const ConnectionSwitcher: React.FC = () => {
  const [cookies] = useCookies(["token"]);
  const [currentConnection, setCurrentConnection] = useState<string>("Default");
  const { t } = useTranslation();

  const switchConnection = async (connection: string) => {
    try {
      const data = await changeDataSource(cookies.token, connection);
      if (data) {
        setCurrentConnection(connection);
        console.log(`${connection} connection selected`);
      }
    } catch (error) {
      console.error("Error changing data source:", error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <Header title={t("config.dbConnections")} backButtonHref={ROUTES.MENU} />
        
        <div className="connection-info">
          <h2>{t("menu.currentConnection")}: {currentConnection}</h2>
        </div>

        <div className="button-container">
          <IonButton onClick={() => switchConnection("default")} className="switch-button">
            {t("menu.switchToDefault")}
          </IonButton>
          <IonButton onClick={() => switchConnection("odoo")} className="switch-button">
            {t("menu.switchToOdoo")}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConnectionSwitcher;
