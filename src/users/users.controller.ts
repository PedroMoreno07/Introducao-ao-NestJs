import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() user: { name: string; email: string }) {
    return this.userService.createUser(user);
  }
}
