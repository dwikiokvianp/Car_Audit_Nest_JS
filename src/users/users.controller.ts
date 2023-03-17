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
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Get('/')
  async getAllUser(@Query() query: { email: string }) {
    const { email } = query;
    return await this.userService.find(email);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const mantap = await this.userService.findOne(parseInt(id));
    return mantap;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body.email, body.password);
  }

  @Post('/signin')
  async signUser(@Body() body: CreateUserDto) {
    return await this.authService.signIn(body.email, body.password);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
