import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Control, FieldErrors } from "react-hook-form";
import { NavigatorParamList } from "~navigators/app-navigator";

export type ValidationRules = {
  required: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  validate?: (value: any) => boolean | string;
  message?: string;
};

export type Validations = {
  email: ValidationRules;
  password: ValidationRules;
  confirmPassword: ValidationRules;
  username: ValidationRules;
  size: ValidationRules;
  weight: ValidationRules;
  gender: ValidationRules;
  birthdayDate: ValidationRules;
};

export type SignupInformations = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  size: string;
  weight: string;
  birthdayDate: string;
  gender: string;
  goal: string;
  activityLevel: string;
};

export type SignupStepsProps = {
  control: Control<SignupInformations>;
  errors: FieldErrors<SignupInformations>;
  validations: Validations;
};
