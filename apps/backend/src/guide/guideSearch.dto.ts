import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class GuideSearchDto {
  @IsOptional()
  location: string;

  @IsNumber()
  @IsOptional()
  fee: number; //decimal(10,2)

  @IsNumber()
  @IsOptional()
  reviewScore: number; //decimal(10,2)

  @IsDateString()
  @IsOptional()
  datetime: string;
}
