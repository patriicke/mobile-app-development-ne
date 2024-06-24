import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '~/common/dtos/base.dto';

export class RoleDto extends BaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  active: boolean;
}
