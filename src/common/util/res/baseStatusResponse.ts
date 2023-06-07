//   is_success: boolean;
//   code?: number;
//   message: string;
// }
// interface ResErr {
//   [index: string]: ErrObj;

import { INDEX, RESCODE, RES_ERR_CODE } from './BaseResponseIndex';

const {
  AUTH,
  USER,
  COURSE,
  LECTURE,
  REVIEW,
  COMMENT,
  QUESTION,
  ANSWER,
  INSTRUCTOR,
  STUDENT,
  MINE,
} = INDEX;
const { EXIST, NOT_EXIST, FAILURE, EXPIRED, NOT_AUTHORIZED, INVALID } =
  RES_ERR_CODE;
export const baseResponeStatus = {
  SUCCESS: { is_success: true, code: 1000000, message: '성공' },

  OAUTH_TOKEN_FAILURE: {
    is_success: false,
    code: RESCODE + AUTH + FAILURE,
    message: '소셜 인증 실패',
  },

  AUTH_ACCESS_TOKEN_FAILURE: {
    is_success: false,
    code: RESCODE + AUTH + FAILURE,
    message: 'ACCESS_TOKEN이 유효하지 않습니다.',
  },

  AUTH_VALIDATE_FAILURE: {
    is_success: false,
    code: RESCODE + AUTH + FAILURE,
    message: 'user validate에 실패했습니다',
  },

  AUTH_PASSWORD_FAILURE: {
    is_success: false,
    code: RESCODE + AUTH + FAILURE,
    message: '비밀번호가 올바르지 않습니다',
  },

  AUTH_ACCESS_TOKEN_EXPIRED: {
    is_success: false,
    code: RESCODE + AUTH + EXPIRED,
    message: 'ACCESS_TOKEN가 만료되었습니다.',
  },

  USER_NOT_EXIST: {
    is_success: false,
    code: RESCODE + USER + NOT_EXIST,
    message: '존재하지 않는 유저입니다.',
  },

  USER_EXIST: {
    is_success: false,
    code: RESCODE + USER + EXIST,
    message: '이미 존재하는 유저입니다.',
  },

  USER_EMAIL_EXIST: {
    is_success: false,
    code: RESCODE + USER + EXIST,
    message: '이미 존재하는 이메일입니다.',
  },

  NOT_INSTRUCTOR: {
    is_success: false,
    code: RESCODE + INSTRUCTOR + EXIST,
    message: '해당 유저는 강사가 아닙니다.',
  },

  NOT_STUDENT: {
    is_success: false,
    code: RESCODE + STUDENT + EXIST,
    message: '해당 유저는 학생이 아닙니다.',
  },

  COURSE_NOT_EXIST: {
    is_success: false,
    code: RESCODE + COURSE + NOT_EXIST,
    message: '존재하지 않는 코스입니다.',
  },
  COURSE_EXIST: {
    is_success: false,
    code: RESCODE + COURSE + EXIST,
    message: '이미 존재하는 코스입니다.',
  },

  LECTURE_NOT_EXIST: {
    is_success: false,
    code: RESCODE + LECTURE + NOT_EXIST,
    message: '존재하지 않는 강의입니다.',
  },

  LECTURE_EXIST: {
    is_success: false,
    code: RESCODE + LECTURE + EXIST,
    message: '이미 존재하는 강의입니다.',
  },

  COMMENT_NOT_EXIST: {
    is_success: false,
    code: RESCODE + COMMENT + NOT_EXIST,
    message: '존재하지 않는 코멘트입니다.',
  },

  COMMENT_EXIST: {
    is_success: false,
    code: RESCODE + COMMENT + EXIST,
    message: '이미 존재하는 코멘트입니다.',
  },

  REVIEW_NOT_EXIST: {
    is_success: false,
    code: RESCODE + REVIEW + NOT_EXIST,
    message: '존재하지 않는 리뷰입니다.',
  },

  REVIEW_EXIST: {
    is_success: false,
    code: RESCODE + REVIEW + EXIST,
    message: '이미 존재하는 리뷰입니다.',
  },

  QUESTION_NOT_EXIST: {
    is_success: false,
    code: RESCODE + QUESTION + NOT_EXIST,
    message: '존재하지 않는 질문입니다.',
  },

  QUESTION_EXIST: {
    is_success: false,
    code: RESCODE + QUESTION + EXIST,
    message: '이미 존재하는 질문입니다.',
  },

  ANSWER_NOT_EXIST: {
    is_success: false,
    code: RESCODE + ANSWER + NOT_EXIST,
    message: '존재하지 않는 답변입니다.',
  },

  ANSWER_EXIST: {
    is_success: false,
    code: RESCODE + ANSWER + EXIST,
    message: '이미 존재하는 답변입니다.',
  },

  MINE_FAILURE: {
    is_success: false,
    code: RESCODE + MINE + FAILURE,
    message: 'checkMine 요청에 실패했습니다',
  },

  MINE_AMOUNT_ERROR: {
    is_success: false,
    code: RESCODE + MINE + FAILURE,
    message: 'payment amount가 적습니다',
  },
};
