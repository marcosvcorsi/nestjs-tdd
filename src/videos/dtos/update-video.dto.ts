import { IsNotEmpty, IsString } from "class-validator";

export class UpdateVideoDto {
  
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}