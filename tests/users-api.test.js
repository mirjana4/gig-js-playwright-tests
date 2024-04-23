const { test, expect } = require('@playwright/test');
const { UsersApi } = require('../api/users-api');

test.describe('Users Api', () => {

  test('get all users', async ({ request }) => {
    const usersApi = new UsersApi(request);
    const users = await usersApi.getAllUsers(true);

    await expect(users).not.toBeNull();
    await expect(users.length).toBeGreaterThan(0);
  });

  test('user name starts with c', async ({ request }) => {
    test.slow();
  
    const usersApi = new UsersApi(request);
    const users = await usersApi.getAllUsers(false);

    await expect(users).not.toBeNull();
    await expect(users.length).toBeGreaterThan(0);

    const usersStartsWithC = users.filter(user => user.name.toLowerCase().startsWith('c'));
    await expect(usersStartsWithC.length).toBeGreaterThan(0);
  });

  test('get all users print', async ({ request }) => {
    test.slow();

    const usersApi = new UsersApi(request);
    const users = await usersApi.getAllUsers(false);
    
    await expect(users).not.toBeNull();
    await expect(users.length).toBeGreaterThan(0);

    for (const user of users) {
      console.log(user);
    }
  });
});
  