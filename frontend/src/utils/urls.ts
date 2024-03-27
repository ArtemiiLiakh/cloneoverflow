class URLS {
  API = 'http://localhost:4000/api';

  private AUTH = this.API+'/auth';
  login = this.AUTH + '/login';
  signup = this.AUTH + '/signup'
  me = this.AUTH + '/me';
  refreshToken = this.AUTH+'/refreshToken';
  changePassword = this.AUTH+'/changePassword';

  private USER = this.API+'/users';
  get = (userId: string) => `${this.USER}/${userId}/get`;
  getQuestions = (userId: string) => `${this.USER}/${userId}/questions`;
  getAnswers = (userId: string) => `${this.USER}/${userId}/answers`;
  getProfile = (userId: string) => `${this.USER}/${userId}/profile`;
  update = (userId: string) => `${this.USER}/${userId}/update`;
}

const urls = new URLS()

export default urls;