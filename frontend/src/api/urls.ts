import { basePath } from '@cloneoverflow/common/api';
import { AnswerPaths } from '@cloneoverflow/common/api/answer';
import { AuthPaths } from '@cloneoverflow/common/api/auth';
import { QuestionPaths } from '@cloneoverflow/common/api/question';
import { SearchPaths } from '@cloneoverflow/common/api/search';
import { UserPaths } from '@cloneoverflow/common/api/user';
import { UrlParamsReplacer } from './utils/UrlParamsReplacer';
import config from '@/config';

class URLS {
  API = config.API_URL + basePath;

  login = this.API+AuthPaths.BasicLogin;
  createAccount = this.API+AuthPaths.CreateAccount
  signout = this.API+AuthPaths.SignOut;
  me = this.API+AuthPaths.GetMe;
  refreshToken = this.API+AuthPaths.RefeshToken;
  changePassword = this.API+AuthPaths.ChangePassword;

  getUser = (userId: string) => this.API+UrlParamsReplacer(UserPaths.Get, userId);
  updateUser = (userId: string) => this.API+UrlParamsReplacer(UserPaths.Update, userId);
  getQuestions = (userId: string) => this.API+UrlParamsReplacer(UserPaths.GetQuestions, userId);
  getAnswers = (userId: string) => this.API+UrlParamsReplacer(UserPaths.GetAnswers, userId);
  getProfile = (userId: string) => this.API+UrlParamsReplacer(UserPaths.GetProfile, userId);

  createQuestion = this.API+QuestionPaths.Create;
  getQuestion = (questionId: string) => this.API+UrlParamsReplacer(QuestionPaths.Get, questionId);
  getQuestionAnswers = (questionId: string) => this.API+UrlParamsReplacer(QuestionPaths.GetAnswers, questionId);
  updateQuestion = (questionId: string) => this.API+UrlParamsReplacer(QuestionPaths.Update, questionId);
  closeQuestion = (questionId: string) => this.API+UrlParamsReplacer(QuestionPaths.Close, questionId);
  openQuestion = (questionId: string) => this.API+UrlParamsReplacer(QuestionPaths.Open, questionId);
  voteQuestion = (questionId: string, vote: 'up' | 'down') => {
    if (vote === 'up') return this.API+UrlParamsReplacer(QuestionPaths.VoteUp, questionId);
    else return this.API+UrlParamsReplacer(QuestionPaths.VoteDown, questionId);
  }
  deleteQuestion = (questionId: string) => this.API+UrlParamsReplacer(QuestionPaths.Delete, questionId);
  addQuestionViewer = (questionId: string) => this.API+UrlParamsReplacer(QuestionPaths.AddViewer, questionId);
  makeFavorite = (questionId: string) => this.API+UrlParamsReplacer(QuestionPaths.MarkFavorite, questionId);
  removeFavorite = (questionId: string) => this.API+UrlParamsReplacer(QuestionPaths.RemoveFavorite, questionId);
  searchQuestion = this.API+SearchPaths.SearchQuestions;

  createAnswer = this.API+AnswerPaths.Create;
  updateAnswer = (answerId: string) => this.API+UrlParamsReplacer(AnswerPaths.Update, answerId);
  deleteAnswer = (answerId: string) => this.API+UrlParamsReplacer(AnswerPaths.Delete, answerId);
  voteAnswer = (answerId: string, vote: 'up' | 'down') => {
    if (vote === 'up') return this.API+UrlParamsReplacer(AnswerPaths.VoteUp, answerId);
    else return this.API+UrlParamsReplacer(AnswerPaths.VoteDown, answerId);
  };

  searchTags = this.API+SearchPaths.SearchTags;
}

const urls = new URLS()

export default urls;