import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
    id?: number;
    name: string;
    mobile_no: string;

    @IsNotEmpty()
    @IsEmail()
    email_id: string;

    @IsNotEmpty()
    password: string;
}