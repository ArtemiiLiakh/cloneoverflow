class URLS {
  API = process.env.REACT_APP_API_URL + '/api';

  private AUTH = this.API+'/auth';
  login = this.AUTH + '/login';
  signup = this.AUTH + '/signup'
  signout = this.AUTH + '/signout';
  me = this.AUTH + '/me';
  refreshToken = this.AUTH+'/refreshToken';
  changePassword = this.AUTH+'/changePassword';

  private USER = this.API+'/users';
  getUser = (userId: string) => `${this.USER}/${userId}/get`;
  getQuestions = (userId: string) => `${this.USER}/${userId}/questions`;
  getAnswers = (userId: string) => `${this.USER}/${userId}/answers`;
  getProfile = (userId: string) => `${this.USER}/${userId}/profile`;
  updateUser = (userId: string) => `${this.USER}/${userId}/update`;

  private QUESTION = this.API+'/questions';
  createQuestion = this.QUESTION + '/create';
  getQuestion = (questionId: string) => `${this.QUESTION}/${questionId}`;
  updateQuestion = (questionId: string) => `${this.QUESTION}/${questionId}/update`;
  closeQuestion = (questionId: string) => `${this.QUESTION}/${questionId}/closed`;
  voteQuestion = (questionId: string) => `${this.QUESTION}/${questionId}/vote`;
  deleteQuestion = (questionId: string) => `${this.QUESTION}/${questionId}/delete`;
  searchQuestion = this.QUESTION + '/search';

  private ANSWER = this.API+'/answers';
  createAnswer = this.ANSWER + '/create';
  updateAnswer = (answerId: string) => `${this.ANSWER}/${answerId}/update`;
  deleteAnswer = (answerId: string) => `${this.ANSWER}/${answerId}/delete`;
  voteAnswer = (answerId: string) => `${this.ANSWER}/${answerId}/vote`;

  private TAG = this.API+'/tags';
  searchTags = this.TAG + '/search';
}

const urls = new URLS()

export default urls;