import React, { useState, useEffect } from "react";
import "./Reservation.css";
import ServiceSelectionStep from "../../components/ServiceSelectionStep/ServiceSelectionStep";
import SubserviceSelectionStep from "../../components/SubserviceSelectionStep/SubserviceSelectionStep";
import ReviewStep from "../../components/ReviewStep/ReviewStep";
import PersonalInfoStep from "../../components/PersonalInfoStep/PersonalInfoStep";
import { ServiceService } from "../../services/ServiceService";
import type { Service } from "../../models/Service/Service";
import type { ReservationFormData } from "../../models/Helpers/ReservationFormData";


const Reservation = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ReservationFormData>({
    ime: "",
    prezime: "",
    brojTelefona: "",
    usluge: [],
    datum: "",
    vreme: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const _service = new ServiceService();

  useEffect(() => {
    _service.getAllServices().then((data) => {
      setServices(data);
    });
  }, []);

  const canGoToStep = (stepIndex: number): boolean => {
    if (stepIndex === 0) return true;

    if (stepIndex === 1) {
      return formData.usluge.length > 0;
    }

    if (stepIndex > 1 && stepIndex <= formData.usluge.length) {
      for (let i = 0; i < stepIndex - 1; i++) {
        if (
          !formData.usluge[i] ||
          formData.usluge[i].subservicesIds.length === 0
        ) {
          return false;
        }
      }
      return true;
    }

    if (stepIndex === formData.usluge.length + 1) {
      for (let i = 0; i < formData.usluge.length; i++) {
        if (
          !formData.usluge[i] ||
          formData.usluge[i].subservicesIds.length === 0
        ) {
          return false;
        }
      }
      return true;
    }

    if (stepIndex === formData.usluge.length + 2) {
      for (let i = 0; i < formData.usluge.length; i++) {
        if (
          !formData.usluge[i] ||
          formData.usluge[i].subservicesIds.length === 0
        ) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <ServiceSelectionStep
          services={services}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          nextStep={nextStep}
        />
      );
    }

    if (currentStep <= formData.usluge.length) {
      return (
        <SubserviceSelectionStep
          services={services}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          nextStep={nextStep}
          prevStep={prevStep}
          currentServiceIndex={currentStep - 1}
        />
      );
    }

    if (currentStep === formData.usluge.length + 1) {
      return (
        <PersonalInfoStep
          services={services}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    }

    if (currentStep === formData.usluge.length + 2) {
      return (
        <ReviewStep
          services={services}
          formData={formData}
          prevStep={prevStep}
          setFormData={function (value: React.SetStateAction<ReservationFormData>): void {
            throw new Error("Function not implemented.");
          }}
          errors={{}}
          setErrors={function (
            value: React.SetStateAction<{ [key: string]: boolean }>
          ): void {
            throw new Error("Function not implemented.");
          }}
          nextStep={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      );
    }

    return null;
  };

  const totalSteps = formData.usluge.length + 3;

  return (
    <div id="reservation" className="appointment-container">
      <h2>Zakažite termin</h2>
      <div className="step-indicator">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const enabled = canGoToStep(index);
          return (
            <div
              key={index}
              className={`step-circle ${currentStep >= index ? "active" : ""} ${
                enabled ? "" : "disabled"
              }`}
              onClick={() => enabled && setCurrentStep(index)}
              style={{ cursor: enabled ? "pointer" : "default" }}
              title={
                enabled
                  ? undefined
                  : "Popunite prethodne korake pre nego što nastavite"
              }
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      {renderStep()}
    </div>
  );
};

export default Reservation;
