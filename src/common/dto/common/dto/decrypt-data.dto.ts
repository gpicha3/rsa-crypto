import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DecryptDataRequestDto {
  @ApiProperty({
    description: 'encrypted data part 1',
    example: 'base64-part-1',
  })
  @IsString()
  @IsNotEmpty()
  data1!: string;

  @ApiProperty({
    description: 'encrypted data part 2',
    example: 'base64-part-2',
  })
  @IsString()
  @IsNotEmpty()
  data2!: string;
}

export class DecryptDataResultDto {
  @ApiProperty({ example: 'Hello world' })
  payload!: string;
}
