import { Body, Controller, Post } from '@nestjs/common';
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
import { LectureService } from './provider/lecture.service';

@ApiExtraModels(LectureCreateInputDTO)
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
}
