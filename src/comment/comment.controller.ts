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
import { CommentCreateInputDTO } from './dto/create_comment.dto';
import { CommentService } from './provider/comment.service';

@ApiExtraModels(CommentCreateInputDTO)
@ApiTags('Comment API')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiOperation({
    summary: '코멘트(댓글) 생성 API',
    description: `
      코멘트 생성 API입니다
    
      필요한정보.
      - lecture_id: 강의 id - String
      - user_id: 유저 id - String
      - contents: 코멘트 내용 - String
      `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(CommentCreateInputDTO) },
    examples: {
      CREATE_COMMENT: {
        description: '코멘트 생성 예시',
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
  @Post('/') //코멘트 생성
  async createComment(@Body() commentInputDTO: CommentCreateInputDTO) {
    const result = await this.commentService.createComment(commentInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
