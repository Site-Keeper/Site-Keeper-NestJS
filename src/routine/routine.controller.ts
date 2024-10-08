import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  Request,
} from '@nestjs/common';
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './entities/routine.entity';
import {
  ApiDocDeleteRoutine,
  ApiDocGelAllRoutine,
  ApiDocGelByIdRoutine,
  ApiDocGetRoutineByUserId,
  ApiDocGetRoutineToday,
  ApiDocPatchRestoreRoutine,
  ApiDocPatchRoutine,
  ApiDocPostRoutine,
} from './docs/routine.swager.decorators';
import { ApiTags } from '@nestjs/swagger';
import {
  Permissions,
  PrivateService,
  toTheEntity,
} from 'src/common/decorators/permissions.decorator';
import { UserJWT } from 'src/common/interfaces/jwt.interface';

@ApiTags('Routine')
@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @PrivateService()
  @Permissions('can_create')
  @toTheEntity('routines')
  @Post()
  @ApiDocPostRoutine(Routine)
  create(@Body() createRoutineDto: CreateRoutineDto, @Request() req) {
    const user: UserJWT = req.user;
    return this.routineService.create(createRoutineDto, user);
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('routines')
  @Get('today')
  @ApiDocGetRoutineToday(Routine)
  async getRoutinesForToday(@Request() req) {
    const user: UserJWT = req.user;
    const token: string = req.headers.authorization;
    return this.routineService.findRoutinesForToday(user.id, token);
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('routines')
  @Get()
  @ApiDocGelAllRoutine(Routine)
  findAll() {
    return this.routineService.findAll();
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('routines')
  @Get('ByUsers/:id')
  @ApiDocGetRoutineByUserId(Routine)
  findByUser(@Param('id') id: string) {
    return this.routineService.findByUser(+id);
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('routines')
  @Get(':id')
  @ApiDocGelByIdRoutine(Routine)
  findOne(@Param('id') id: string) {
    return this.routineService.findOne(+id);
  }

  @PrivateService()
  @Permissions('can_update')
  @toTheEntity('routines')
  @Patch(':id')
  @ApiDocPatchRoutine(Routine)
  update(
    @Param('id') id: string,
    @Body() updateRoutineDto: UpdateRoutineDto,
    @Request() req
  ) {
    const user: UserJWT = req.user;
    return this.routineService.update(+id, updateRoutineDto, user);
  }

  @PrivateService()
  @Permissions('can_delete')
  @toTheEntity('routines')
  @ApiDocDeleteRoutine(Routine)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const user: UserJWT = req.user;
    const token: string = req.headers.authorization;
    return this.routineService.remove(+id, user, token);
  }

  @PrivateService()
  @Permissions('can_update')
  @toTheEntity('routines')
  @Patch('restore/:id')
  @ApiDocPatchRestoreRoutine(Routine)
  restore(@Param('id') id: string, @Request() req) {
    const user: UserJWT = req.user;
    return this.routineService.restore(+id, user);
  }
}
