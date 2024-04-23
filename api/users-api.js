const { User } = require('./user');

exports.UsersApi = class UsersApi {

  constructor(request) {
	  this.request = request;
	  this.baseUrl = 'https://gorest.co.in/public';
  }

  async getAllUsers(singlePage) {
    let users = [];
    let currentPage = 1;
    let totalNumberOfPages = 1;

    while (currentPage <= totalNumberOfPages) {
      // "per_page" parameter partially works. We get corect number of items per page where max value is 100,
      // but the response headers are not updated correctly, so we cannot use it to condition exit from while loop
      // const params = {page: currentPage, per_page: 100}
      const params = {page: currentPage};

      const response = await this.request.get(this.baseUrl + '/v2/users', {params: params});
      const responseBody = await response.body();
      if (response.status() != 200 || !responseBody) {
        return null;
      }

      const jsonList = await response.json();
      for (const item of jsonList) {
        const user = new User(item['id'], item['name'], item['email'], item['gender'], item['status']);
        users.push(user);
      }

      if (singlePage) {
        return users;
      }

      currentPage += 1;
      totalNumberOfPages = parseInt(response.headers()['x-pagination-pages']);
    }

    return users;
  }
}