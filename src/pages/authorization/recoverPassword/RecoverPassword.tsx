import { useTranslation } from "react-i18next";
import { FiveS } from "../../../assets/svg/SVGcomponent";
import RequestReset from "./requestReset/RequestReset";
import VerifyCode from "./verifyCode/VerifyCode";
import ResetPassword from "./resetPassword/ResetPassword";
import { useHistory } from "react-router";
import Success from "./success/Success";
import useSessionStorage from "../../../utils/useSessionStorage";

interface IRecoverData {
  email: string;
  code: string;
}

export interface IRecoverPasswordStepProps {
  onPrevStep: () => void;
  onNextStep: () => void;
  recoverData: IRecoverData;
  setRecoverData: (value: IRecoverData) => void;
}

const RecoverPassword = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [currentStep, setCurrentStep] = useSessionStorage('currentStep', 1);
  const [recoverData, setRecoverData] = useSessionStorage<IRecoverData>('recoverData', { email: "", code: "" });

  const onPrevStep = () => {
    if (currentStep === 1) {
      history.push("/");
    }
    setCurrentStep(1);
  };

  const onNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return currentStep == 4 ? (
    <Success />
  ) : (
    <div className="authorization">
      <img className="authorization__logo" src={FiveS} />
      <h2 className="authorization__title">{`${t("form.auth.signin")} 5S Control`}</h2>
      <div className="authorization__container">
        {currentStep == 1 && (
          <RequestReset
            onPrevStep={onPrevStep}
            onNextStep={onNextStep}
            recoverData={recoverData}
            setRecoverData={setRecoverData}
          />
        )}
        {currentStep == 2 && (
          <VerifyCode
            onPrevStep={onPrevStep}
            onNextStep={onNextStep}
            recoverData={recoverData}
            setRecoverData={setRecoverData}
          />
        )}
        {currentStep == 3 && (
          <ResetPassword
            onPrevStep={onPrevStep}
            onNextStep={onNextStep}
            recoverData={recoverData}
            setRecoverData={setRecoverData}
          />
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
