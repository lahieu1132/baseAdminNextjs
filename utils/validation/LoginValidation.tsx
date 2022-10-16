import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";

/* eslint-disable no-useless-escape */
export default class LoginValidation {
  @IsEmail(
    {pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
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
  public email: string | undefined;

  @MinLength(8, {
    message: "common_validation.pass_shorter",
  })
  @MaxLength(50, {
    message: "common_validation.pass_longer",
  })
  @IsNotEmpty({
    message: "common_validation.pass_empty",
  })
  public password: string | undefined;
}
