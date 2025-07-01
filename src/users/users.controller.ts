import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreteUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo usuário',
  })
  @ApiBody({
    type: CreteUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso!',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar usuário.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  create(@Body() data: CreteUserDto) {
    return this.usersService.create(data);
  }

  //--------------------------------------------------------------------------------------------------------------------------//

  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso!',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  //--------------------------------------------------------------------------------------------------------------------------//

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um usuário pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário a ser buscado',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  //--------------------------------------------------------------------------------------------------------------------------//

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar um novo usuário',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário a ser atualizado',
    type: String,
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso!',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao atualizar usuário.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }

  //--------------------------------------------------------------------------------------------------------------------------//

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover um usuário pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário a ser removido',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
