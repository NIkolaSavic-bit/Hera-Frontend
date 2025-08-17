import type { StepProps } from "../../models/Helpers/StepProps";
import Dropdown from "../Dropdown/Dropdown";

const SubserviceSelectionStep: React.FC<StepProps> = ({
  services,
  formData,
  setFormData,
  errors,
  setErrors,
  nextStep,
  prevStep,
  currentServiceIndex = 0,
}) => {
  const currentService = formData.usluge[currentServiceIndex];
  const serviceData = services.find(
    (s) => s.serviceId === currentService.serviceId
  );

  const handleNext = () => {
    if (currentService.subservicesIds.length === 0) {
      setErrors((prev) => ({ ...prev, detalji: true }));
      return;
    }

    setErrors((prev) => ({ ...prev, detalji: false }));

    if (currentServiceIndex < formData.usluge.length - 1) {
      nextStep();
    } else {
      nextStep();
    }
  };

  return (
    <div className="step-container">
      <h3>
        Korak {currentServiceIndex + 2}: Odaberite detalje za{" "}
        {serviceData?.name}
      </h3>
      <div className="form-group">
        <label>Detalji usluge*</label>
        <Dropdown<number>
          options={
            serviceData?.subservices?.map((s) => ({
              label: s.name,
              value: s.subserviceId,
            })) || []
          }
          selected={currentService.subservicesIds}
          onSelect={(selectedIds: number[]) => {
            const updatedUsluge = [...formData.usluge];
            updatedUsluge[currentServiceIndex].subservicesIds = selectedIds;
            setFormData((prev) => ({ ...prev, usluge: updatedUsluge }));
          }}
          required
          hasError={errors.detalji}
        />
      </div>
      <div className="step-buttons">
        <button type="button" className="prev-btn" onClick={prevStep}>
          Nazad
        </button>
        <button type="button" className="next-btn" onClick={handleNext}>
          {currentServiceIndex < formData.usluge.length - 1
            ? "Dalje"
            : "Završi"}
        </button>
      </div>
    </div>
  );
};

export default SubserviceSelectionStep;
