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
import { CourseCreateInputDTO } from './dto/create_course.dto';
import { CourseService } from './provider/course.service';

@ApiExtraModels(CourseCreateInputDTO)
@ApiTags('Course API')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @ApiOperation({
    summary: '코스 생성 API',
    description: `
      코스 생성 API입니다
    
      필요한정보.
      - title: 코스 제목 - String
      - description: 코스 설명 - String
      - instructor_id: 강사 유저 아이디 - String
      - student_id: 수강생 유저 아이디 - String
      `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(CourseCreateInputDTO) },
    examples: {
      CREATE_COURSE: {
        description: '코스 생성 예시',
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
  @Post('/') //코스 생성
  async createCourse(@Body() courseInputDTO: CourseCreateInputDTO) {
    const result = await this.courseService.createCourse(courseInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
