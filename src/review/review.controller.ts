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
import { ReviewCreateInputDTO } from './dto/create_review.dto';
import { ReviewService } from './provider/review.service';

@ApiExtraModels(ReviewCreateInputDTO)
@ApiTags('Review API')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @ApiOperation({
    summary: '리뷰 생성 API',
    description: `
      리뷰 생성 API입니다
    
      필요한정보.
      - course_id: 코스 id - String
      - user_id: 유저 id - String
      - title: 리뷰 제목 - String
      - contents: 리뷰 내용 - String
      `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(ReviewCreateInputDTO) },
    examples: {
      CREATE_REVIEW: {
        description: '리뷰 생성 예시',
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
  @Post('/') //리뷰 생성
  async createReview(@Body() reviewInputDTO: ReviewCreateInputDTO) {
    const result = await this.reviewService.createReview(reviewInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
