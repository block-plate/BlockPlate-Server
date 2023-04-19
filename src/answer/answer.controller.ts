import { Body, Controller, Param, Patch, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseResponse } from 'src/common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { AnswerCreateInputDTO } from './dto/create_answer.dto';
import { AnswerUpdateInputDTO } from './dto/update_answer.dto';
import { AnswerService } from './provider/answer.service';

@ApiExtraModels(AnswerCreateInputDTO, AnswerUpdateInputDTO)
@ApiTags('Answer API')
@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
  @ApiOperation({
    summary: '답변 생성 API',
    description: `
      답변 생성 API입니다
    
      필요한정보.
      - question_id: 질문 id - String
      - user_id: 답변 유저 id - String
      - contents: 답변 내용 - String
      `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(AnswerCreateInputDTO) },
    examples: {
      CREATE_ANSWER: {
        description: '답변 생성 예시',
      },
    },
  })
  /*
      @ApiResponseDTO(
        200,
        new BaseResponse(baseResponeStatus.SUCCESS, courseCreateResponseEX),
        '성공',
      )
      */
  @Post('/')
  async createAnswer(@Body() answerInputDTO: AnswerCreateInputDTO) {
    const result = await this.answerService.createAnswer(answerInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Patch('/:answer_id')
  async updateAnswer(
    @Param('answer_id') answer_id: string,
    @Body() AnswerUpdateInputDTO: AnswerUpdateInputDTO,
  ) {
    const result = await this.answerService.updateAnswer({
      answer_id,
      ...AnswerUpdateInputDTO,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Put('/:answer_id')
  async deleteStatusAnswer(@Param('answer_id') answer_id: string) {
    const result = await this.answerService.deleteStatusAnswer({
      answer_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
