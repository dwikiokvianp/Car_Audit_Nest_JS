import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report-dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guards';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report-dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UpdateReportDto } from './dtos/update-report-dto';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @Serialize(ReportDto)
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Get()
  async findReport() {
    return this.reportsService.find();
  }

  @Patch('/:id')
  async updateApprovalStatus(@Body() body: string, @Param('id') id: string) {
    return this.reportsService.changeApproval(parseInt(id), Boolean(body));
  }
}
