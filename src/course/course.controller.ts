import {
  BadRequestException,
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
import { CourseCreateInputDTO } from './dto/create_course.dto';
import { CourseUpdateInputDTO } from './dto/update_course.dto';
import { userCourseApplyQuery } from './interface/userCourseApplyQuery.interface';
import { CourseService } from './provider/course.service';

@ApiExtraModels(CourseCreateInputDTO, CourseUpdateInputDTO)
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
      - amount: 코스 가격 - Float
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

  @Post('apply') //user -> course 신청
  async userCourseApply(@Query() query: userCourseApplyQuery) {
    const { user, course } = query;
    if (!user || !course)
      throw new BadRequestException('user_id,course_id are all needed');
    const result = await this.courseService.userCourseApply(query);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Get('apply/:user_id')
  async userCourseList(@Param('user_id') user_id: string) {
    const result = await this.courseService.getCourseListByUser({ user_id });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  //코스 조회
  @Get('/')
  async getCourseList() {
    const result = await this.courseService.getCourseList();
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Patch('/:course_id') //코스 수정
  async updateCourse(
    @Param('course_id') course_id: string,
    @Body() CourseUpdateInputDTO: CourseUpdateInputDTO,
  ) {
    const result = await this.courseService.updateCourse({
      course_id,
      ...CourseUpdateInputDTO,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Put('/:course_id')
  async deleteStatusCourse(@Param('course_id') course_id: string) {
    const result = await this.courseService.deleteStatusCourse({
      course_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
