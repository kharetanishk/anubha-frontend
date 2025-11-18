import { useBookingForm } from "./BookingFormContext";
import { validationConfig } from "./validationConfig";
import { BookingForm } from "./BookingFormContext";

// Allowed step IDs inferred from validationConfig
type StepId = keyof typeof validationConfig;

export function useStepValidator(stepId: StepId) {
  const { form } = useBookingForm();

  const requiredFields = validationConfig[stepId];

  function validate() {
    return requiredFields.every((field) => {
      const value = form[field as keyof BookingForm];
      return value !== null && value !== "" && value !== undefined;
    });
  }

  function getFirstMissingField() {
    return requiredFields.find((field) => {
      const value = form[field as keyof BookingForm];
      return value === null || value === "" || value === undefined;
    });
  }

  return { validate, getFirstMissingField };
}
