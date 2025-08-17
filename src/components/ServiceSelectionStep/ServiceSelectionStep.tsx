import { useState } from "react";
import type { StepProps } from "../../models/Helpers/StepProps";
import Dropdown from "../Dropdown/Dropdown";

const ServiceSelectionStep: React.FC<StepProps> = ({
  services,
  setFormData,
  errors,
  setErrors,
  nextStep,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleNext = () => {
    if (selectedServices.length === 0) {
      setErrors((prev) => ({ ...prev, usluge: true }));
      return;
    }

    const newUsluge = selectedServices.map((serviceId) => ({
      serviceId,
      subservicesIds: [] as number[],
    }));

    setFormData((prev) => ({
      ...prev,
      usluge: newUsluge,
    }));
    setErrors((prev) => ({ ...prev, usluge: false }));
    nextStep();
  };

  return (
    <div className="step-container">
      <h3>Korak 1: Odaberite usluge</h3>
      <div className="form-group">
        <label>Usluge*</label>
        <Dropdown<string>
          options={services.map((s) => ({ label: s.name, value: s.serviceId }))}
          selected={selectedServices}
          onSelect={(ids) => setSelectedServices(ids)} 
          placeholder="Izaberite usluge"
          required
          hasError={errors.usluge}
        />
      </div>
      <button type="button" className="next-btn" onClick={handleNext}>
        Dalje
      </button>
    </div>
  );
};

export default ServiceSelectionStep;
