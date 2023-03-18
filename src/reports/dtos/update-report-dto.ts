import { Expose } from 'class-transformer';

export class UpdateReportDto {
  @Expose()
  approved: boolean;
}
