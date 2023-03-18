import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

import { Transform, TransformFnParams } from 'class-transformer';

export class CreateReportDto {
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear())
  year: number;

  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsNumber()
  @IsLongitude()
  lng: number;

  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsNumber()
  @IsLatitude()
  lat: number;

  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
