import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report-dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  async createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
