import { test, expect } from '@playwright/test';

test.describe('FakeStore API - Users', () => {
  const BASE_URL = 'https://fakestoreapi.com';

  test('Listar usuários', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);
    expect(response.ok()).toBeTruthy();

    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);

    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('username');
    expect(firstUser).toHaveProperty('email');
  });

  test('Buscar usuário por id', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);
    expect(response.ok()).toBeTruthy();

    const user = await response.json();
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('name');
  });

  test('Criar usuário', async ({ request }) => {
    const payload = {
      email: 'joao.silva@example.com',
      username: 'joaosilva',
      password: 'Teste123!@#',
      name: {
        firstname: 'João',
        lastname: 'Silva'
      },
      address: {
        city: 'Porto Alegre',
        street: 'Rua das Flores',
        number: 100,
        zipcode: '90000-000',
        geolocation: {
          lat: '-30.0346',
          long: '-51.2177'
        }
      },
      phone: '51999990000'
    };

    const response = await request.post(`${BASE_URL}/users`, {
      data: payload
    });

    expect(response.ok()).toBeTruthy();

    const createdUser = await response.json();
    expect(createdUser).toHaveProperty('id');
    // A API retorna apenas o id fake do registro criado.
    expect(typeof createdUser.id).toBe('number');
  });
});
