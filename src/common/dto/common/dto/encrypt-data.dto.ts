import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EncryptDataRequestDto {
  @ApiProperty({
    description: 'Plaintext payload to encrypt',
    minLength: 0,
    maxLength: 2000,
    example: 'Pichaya Pairin',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  payload!: string;
}

export class EncryptDataResultDto {
  @ApiProperty({ example: 'base64-part-1' })
  data1!: string;

  @ApiProperty({ example: 'base64-part-2' })
  data2!: string;
}
