import { Controller } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { QuestionCreateInputDTO } from './dto/create_question.dto';
import { QuestionService } from './provider/question.service';

@ApiExtraModels(QuestionCreateInputDTO)
@ApiTags('Question API')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
}
