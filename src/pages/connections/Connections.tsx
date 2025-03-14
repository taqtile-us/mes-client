import React, { useEffect, useState } from "react";
import { IonContent, IonList, IonItem, IonPage } from "@ionic/react";
import { getConnectionsToDatabases } from "../../api/connections";
import { useCookies } from "react-cookie";
import { ConnectionsList } from "../../components/connectionsList/ConnectionsList";
import { Preloader } from "../../components/preloader/preloader";
import { ConnectionItem } from "../../models/interfaces/connectionItem.interface";
import { ROUTES } from "../../shared/constants/routes";
import { Header } from "../../components/header/Header";
import { useTranslation } from "react-i18next";

const Connections: React.FC = () => {
  const [cookies] = useCookies(["token"]);
  const [connectionItems, setConnectionItems] = useState<ConnectionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchConnections = async () => {
      setIsLoading(true);
      try {
        const response = await getConnectionsToDatabases(cookies.token);
        setConnectionItems(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, [cookies.token]);

  return (
    <IonPage>
      <IonContent>
        <Header title={t("config.erp")} backButtonHref={ROUTES.CONFIGURATION} />
        {isLoading ? (
          <div className="preloader">
            <Preloader />
          </div>
        ) : connectionItems.length === 0 ? (
          <IonList inset={true}>
            <IonItem>{t("messages.noDatabases")}</IonItem>
          </IonList>
        ) : (
          <ConnectionsList items={connectionItems} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Connections;
