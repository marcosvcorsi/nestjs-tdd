import { IsNotEmpty, IsString } from "class-validator";

export class CreateVideoDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}