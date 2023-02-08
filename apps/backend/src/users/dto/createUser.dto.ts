import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  name: string;
  surname: string;
  @IsNotEmpty()
  ssn: string;
  phone: string;
  profile_picture: File;
  gender: string;
  age: number;
  birth_date: Date;
  region: string;
  disorder: string[];
}
