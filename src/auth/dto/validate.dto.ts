import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ValidEntities } from 'src/enums/entities.enum';
import { ValidPermissions } from 'src/enums/valid-permissions.enum';

export class validateUserDto {
  @ApiProperty({
    description:
      'The name of the entity you need to know if you have permissions, plural',
    example: 'users',
  })
  @IsString()
  entity: ValidEntities;

  @ApiProperty({
    description:
      'The permissions you need to know if you have in the entity, snake_case',
    example: 'can_create',
  })
  @IsString()
  permissions: ValidPermissions;
}
