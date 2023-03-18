import { Transform, Expose } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: string;
  @Expose()
  price: string;
  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  @Expose()
  @Transform(({ obj }) => {
    return obj.user.id;
  })
  userId: any;
}
