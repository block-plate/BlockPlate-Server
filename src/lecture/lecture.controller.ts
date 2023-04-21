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
import { LectureCreateInputDTO } from './dto/create_lecture.dto';
import { LectureUpdateInputDTO } from './dto/update_lecture.dto';
import { LectureService } from './provider/lecture.service';

@ApiExtraModels(LectureCreateInputDTO, LectureUpdateInputDTO)
@ApiTags('Lecture API')
@Controller('lectures')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}
  @ApiOperation({
    summary: '강의 생성 API',
    description: `
      강의 생성 API입니다
    
      필요한정보.
      - course_id: 코스 id - String
      - title: 강의 제목 - String
      - data: 강의 내용 - String
      `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(LectureCreateInputDTO) },
    examples: {
      CREATE_LECTURE: {
        description: '강의 생성 예시',
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
  @Post('/') //강의 생성
  async createLecture(@Body() lectureInputDTO: LectureCreateInputDTO) {
    const result = await this.lectureService.createLecture(lectureInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Patch('/:lecture_id')
  async updateLecture(
    @Param('lecture_id') lecture_id: string,
    @Body() LectureUpdateInputDTO: LectureUpdateInputDTO,
  ) {
    const result = await this.lectureService.updateLecture({
      lecture_id,
      ...LectureUpdateInputDTO,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Put('/:lecture_id')
  async deleteStatusLecture(@Param('lecture_id') lecture_id: string) {
    const result = await this.lectureService.deleteStatusLecture({
      lecture_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Get('/')
  async getLectureListByCourse(@Query() query) {
    const result = await this.lectureService.getLectureList(query);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
