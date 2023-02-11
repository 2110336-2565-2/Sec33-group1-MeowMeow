import { IsDate, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class GuideSearchDto {
  @IsOptional()
  location: string;
  @IsOptional()
  @IsNumber()
  fee: number; //decimal(10,2)
  @IsOptional()
  @IsNumber()
  reviewScore: number; //decimal(10,2)
  @IsOptional()
  @IsDateString()
  datetime: string;
}
