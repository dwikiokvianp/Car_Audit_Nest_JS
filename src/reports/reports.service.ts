import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report-dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(reportDto: CreateReportDto) {
    console.log('kena', reportDto);
    const report = await this.repo.create(reportDto);
    return this.repo.save(report);
  }

  async find(): Promise<Report[]> {
    const data = await this.repo.find();
    return data;
  }
}
