import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";

import { Preloader } from "../../../components/preloader/preloader";
import Card from "../../../ui/card/Card";
import { ROUTES } from "../../../shared/constants/routes";
import { Header } from "../../../components/header/Header";
import { IEmployee } from "../../../models/interfaces/employee.interface";
import { getEmployee } from "../../../api/employees";

const Employee = () => {
  const [cookies] = useCookies(["token"]);
  const { id }: { id: string } = useParams();
  const [item, setItem] = useState<IEmployee>();
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  useIonViewWillEnter(() => {
    getEmployee(Number(id), cookies.token)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => console.error(error));
  });

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const handleOpenModal = () => {
    setShowConfirmationModal(true);
  };

  const deleteCard = async (id: number, token: string) => {
    //! delete item
  };

  return (
    <IonPage>
      <Header title={item?.username} backButtonHref={ROUTES.EMPLOYEES} />
      <IonContent>
        {item ? (
          <Card
            deleteCard={deleteCard}
            itemTitle={item.username}
            backHref={ROUTES.EMPLOYEES}
            showConfirmationModal={showConfirmationModal}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <div className="preloader">
            <Preloader />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
export default Employee;
