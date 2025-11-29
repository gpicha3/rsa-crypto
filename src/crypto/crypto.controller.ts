import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptoService } from './crypto.service';
import { BaseResponse } from 'src/common/dto/common/dto/base-response.dto';
import { DecryptDataRequestDto, DecryptDataResultDto } from 'src/common/dto/common/dto/decrypt-data.dto';
import { EncryptDataRequestDto, EncryptDataResultDto } from 'src/common/dto/common/dto/encrypt-data.dto';


@ApiTags('crypto')
@Controller()
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post('get-encrypt-data')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: EncryptDataRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Encryption result',
    schema: {
      example: {
        successful: true,
        error_code: '',
        data: {
          data1: 'base64-part-1',
          data2: 'base64-part-2',
        },
      },
    },
  })
  getEncryptData(
    @Body() body: EncryptDataRequestDto,
  ): BaseResponse<EncryptDataResultDto> {
    const response = new BaseResponse<EncryptDataResultDto>();

    try {
      const result = this.cryptoService.encryptPayload(body.payload);
      response.successful = true;
      response.error_code = '';
      response.data = result;
    } catch (e) {
      response.successful = false;
      response.error_code = 'ENCRYPT_ERROR';
      response.data = null;
    }

    return response;
  }

  @Post('get-decrypt-data')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: DecryptDataRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Decryption result',
    schema: {
      example: {
        successful: true,
        error_code: '',
        data: {
          payload: 'Hello world',
        },
      },
    },
  })
  getDecryptData(
    @Body() body: DecryptDataRequestDto,
  ): BaseResponse<DecryptDataResultDto> {
    const response = new BaseResponse<DecryptDataResultDto>();

    try {
      const result = this.cryptoService.decryptPayload(body.data1, body.data2);
      response.successful = true;
      response.error_code = '';
      response.data = result;
    } catch (e) {
      response.successful = false;
      response.error_code = 'DECRYPT_ERROR';
      response.data = null;
    }

    return response;
  }
}
