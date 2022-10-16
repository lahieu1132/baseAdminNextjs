import {IsEmail, IsNotEmpty, Matches, MaxLength} from "class-validator";

/* eslint-disable no-useless-escape */
export default class ForgotPasswordValidation {
  @IsEmail(
    {},
    {
      message: "common_validation.email_is_not",
    }
  )
  @MaxLength(255, {
    message: "common_validation.email_longer",
  })
  @IsNotEmpty({
    message: "common_validation.email_empty",
  })
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
    message: "common_validation.email_is_not",
  })
  public email: string | undefined;
}
