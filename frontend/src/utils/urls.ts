class URLS {
  API = 'http://localhost:4000/api';

  private AUTH = this.API+'/auth';

  login = this.AUTH + '/login';
  signup = this.AUTH + '/signup'
  me = this.AUTH + '/me';
  refreshToken = this.AUTH+'/refreshToken';
}

const urls = new URLS()

export default urls;