import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { getBodyParserOptions } from '@nestjs/platform-express/adapters/utils/get-body-parser-options.util';
import { LoggingInterceptor } from '../interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/')
  async getAllUser(@Query() query: { email: string; password: string }) {
    const { email, password } = query;
    return await this.userService.find(email, password);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const mantap = await this.userService.findOne(parseInt(id));
    console.log('kena');
    return mantap;
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService
      .create(body.email, body.password)
      .then(() => console.log('berhasil'));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
