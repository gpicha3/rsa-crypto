import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty({ example: true })
  successful!: boolean;

  @ApiProperty({ example: '' })
  error_code!: string;

  @ApiProperty({ nullable: true })
  data!: T | null;
}
