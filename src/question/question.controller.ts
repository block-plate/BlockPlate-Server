import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseResponse } from '../common/util/res/BaseResponse';
import { baseResponeStatus } from '../common/util/res/baseStatusResponse';
import { QuestionCreateInputDTO } from './dto/create_question.dto';
import { QuestionUpdateInputDTO } from './dto/update_question.dto';
import { QuestionService } from './provider/question.service';

@ApiExtraModels(QuestionCreateInputDTO)
@ApiTags('Question API')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @ApiOperation({
    summary: '질문 생성 API',
    description: `
      질문 생성 API입니다
    
      필요한정보.
      - course_id: 코스 id - String
      - user_id: 유저 id - String
      - title: 리뷰 제목 - String
      - contents: 리뷰 내용 - String
      `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(QuestionCreateInputDTO) },
    examples: {
      CREATE_QUESTION: {
        description: '질문 생성 예시',
        //value: courseCreateInputEX,
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
  @Post('/') //질문 생성
  async createQuestion(@Body() questionInputDTO: QuestionCreateInputDTO) {
    const result = await this.questionService.createQuestion(questionInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
  /*
  @Get('/:question_id') //질문 한개 조회
  async getQuestion(@Param('question_id') question_id: string) {
    const result = await this.questionService.({
      question_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Get('/') //질문 조회
  async getQuestionList(@Query() query) {
    const result = await this.questionService.getQuestionList(query);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  */

  @Patch('/:question_id') //질문 수정
  async updateQuestion(
    @Param('question_id') question_id: string,
    @Body() questionUpdateInputDTO: QuestionUpdateInputDTO,
  ) {
    const result = await this.questionService.updateQuestion({
      question_id,
      ...questionUpdateInputDTO,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Put('/:question_id') //질문 삭제
  async deleteStatusQuestion(@Param('question_id') question_id: string) {
    const result = await this.questionService.deleteStatusQuestion({
      question_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Get('/')
  async getQuestionList(@Query() query) {
    const result = await this.questionService.getQuestionList(query);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
