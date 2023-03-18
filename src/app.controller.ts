import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/sandbox')
  findAll(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
  }

  @Get('/sandboxi')
  findSession(@Session() session) {
    const { visits } = session;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { originalname, buffer } = file;
    const writeStream = createWriteStream(`./uploads/${originalname}`);
    writeStream.write(buffer);
    writeStream.end();
    return { message: `File ${originalname} saved` };
  }
}
