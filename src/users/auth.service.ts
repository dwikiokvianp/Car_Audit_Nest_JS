import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { HashUtils } from '../utils/hash.utils';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashUtils: HashUtils,
  ) {}

  async signUp(email: string, password: string) {
    const user = (await this.usersService.find(email)) as User[];
    if (user.length !== 0) {
      throw new BadRequestException('Email is exist');
    }

    const hashedPassword = await this.hashUtils.hashPassword(password);
    return await this.usersService.create(email, hashedPassword);
  }

  async signIn(email: string, password: string) {
    const [user] = (await this.usersService.find(email)) as User[];
    if (!user) throw new BadRequestException('Email doesnt exist');
    const isValid = await this.hashUtils.comparePassword(
      password,
      user.password,
    );
    if (!isValid) throw new BadRequestException('Invalid Password');
    return user;
  }
}
