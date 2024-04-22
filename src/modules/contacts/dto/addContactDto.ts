import CustomError from "../../../shared/utils/customError";

export interface ContactDtoProps {
  userName: string;
}

export const AddContactDto = ({ userName }: ContactDtoProps) => {
  if (!userName) {
    throw new CustomError("Username is required", 400);
  }

  return {
    username: userName,
  };
};
