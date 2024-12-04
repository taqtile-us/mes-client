import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../shared/constants/routes";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Preloader } from "../../../components/preloader/preloader";
import { IonContent, IonList, IonPage, IonToast, useIonViewWillEnter } from "@ionic/react";
import { Header } from "../../../components/header/Header";
import { ConfirmationModal } from "../../../components/confirmationModal/confirmationModal";
import { createUser, getUser, updateUser } from "../../../api/users";
import { IAddUser, IUser } from "../../../models/interfaces/employee.interface";
import { Input } from "../../../components/inputs/input/Input";
import MenuListButton from "../../../components/menuListButton/MenuListButton";
import Select from "../../../components/selects/select/Select";
import { ROLE } from "../../../models/enums/roles.enum";
import BottomButton from "../../../components/bottomButton/BottomButton";
import { TOAST_DELAY } from "../../../constants/toastDelay";

const AddUser = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IAddUser>({username: "", last_name: "", first_name: "", password: "", role: ROLE.WORKER} as IAddUser);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [customRole, setCustomRole] = useState(false);
  const [highlightRequired, setHighlightRequired] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const roles = Object.values(ROLE).map(role => ({
    label: role,
    value: role
}));

  const navigateBack = () => {
    history.push(ROUTES.USERS, { direction: "back" });
  };

  const handleSave = () => {
    if (user) {
      const data: IAddUser = {
        username: `${user.first_name}_${user.last_name}`,
        last_name: user.last_name,
        first_name: user.first_name,
        password: user.password,
        role: user.role,
        workplace: user.workplace
      }
      createUser(data, cookies.token)
        .then(() => {
            navigateBack();
        })
        .catch(error => {
            setToastMessage(t("messages.employeeExists"));
            console.error(error);
        });
      return;
    }
  };

  const openModal = () => {
    if (!user.first_name || !user.last_name || !user.password) {
        setHighlightRequired(true);
        return;
    }
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    navigateBack();
  };

  const handleConfirmModal = () => {
    setIsOpenModal(false);
    handleSave();
  };

  return (
    <IonPage>
      <Header title={t("operations.add")} onBackClick={navigateBack} backButtonHref={ROUTES.USERS}></Header>
      <IonContent>
        {loading ? (
          <div className="preloader">
            <Preloader />
          </div>
        ) : (
            <>
                <Input 
                    label={t("users.lastName")} 
                    value={user?.last_name || ""} 
                    required 
                    handleChange={event => setUser({ ...user, last_name: event.target.value })}
                    state={highlightRequired && !user.last_name ? "error" : "neutral" }
                    errorMessage={t("form.required")}/>
                <Input 
                    label={t("users.firstName")} 
                    value={user?.first_name || ""} 
                    required 
                    handleChange={event => setUser({ ...user, first_name: event.target.value })}
                    state={highlightRequired && !user.first_name ? "error" : "neutral" }
                    errorMessage={t("form.required")}/>
                
                <Input 
                    label={t("users.password")} 
                    value={user.password} 
                    type="password" 
                    required 
                    handleChange={event => setUser({ ...user, password: event.target.value })}
                    state={highlightRequired && !user.password ? "error" : "neutral" }
                    errorMessage={t("form.required")}/>
                
                <IonList inset={true}>
                    <MenuListButton title={t("users.workplace")} handleItemClick={() => {}}/>
                </IonList>
                <Select value={!customRole ? t("users.role") : user.role} placeholder={!customRole ? t("users.role") : user.role} selectList={roles} handleChange={event => {
                    setUser({ ...user, role: event.target.value });
                    setCustomRole(true)}   
                }/>

                <IonToast
                isOpen={!!toastMessage}
                message={toastMessage || undefined}
                duration={TOAST_DELAY}
                onDidDismiss={() => setToastMessage("")}
                />

                <BottomButton
                handleClick={openModal}
                label={t("operations.save")}
              />
            </>
        )}
      </IonContent>
      <ConfirmationModal
        type="primary"
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        title={`${t("operations.saveChanges")}?`}
        confirmText={t("operations.save")}
        cancelText={t("operations.cancel")}
      />
    </IonPage>
  );
};

export default AddUser;
