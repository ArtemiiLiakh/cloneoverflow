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
  get = (userId: string) => `${this.USER}/${userId}/get`;
  getQuestions = (userId: string) => `${this.USER}/${userId}/questions`;
  getAnswers = (userId: string) => `${this.USER}/${userId}/answers`;
  getProfile = (userId: string) => `${this.USER}/${userId}/profile`;
  update = (userId: string) => `${this.USER}/${userId}/update`;

  private QUESTION = this.API+'/questions';
  create = this.QUESTION + '/create';
  searchQuestion = this.QUESTION + '/search';

  private TAG = this.API+'/tags';
  searchTags = this.TAG + '/search';
}

const urls = new URLS()

export default urls;