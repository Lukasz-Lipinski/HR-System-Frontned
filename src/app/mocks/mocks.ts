import {
  AdminCredential,
  IBackendReponse,
  IBodyRequestLogin,
  IBodyRequestRegister,
} from '../auth/auth.service';

export const mockedEmail = 'test@example.com';
export const mockedPassword = 'testpassword';
export const mockedInvalidEmail = 'test@com';
export const mockedInvalidPassword = 'pA';
export const mockBodyRequestLogin: IBodyRequestLogin =
  {
    email: 'example@example.com',
    password: 'password123',
  };
export const mockedBodyRequestRegister: IBodyRequestRegister =
  {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  };
export const mockedBodyRequestLogin: IBodyRequestLogin =
  {
    email: 'john.doe@example.com',
    password: 'password123',
  };

export const mockedAdminCredential: AdminCredential =
  {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    token: 'your-auth-token',
  };

export const mockedBackendResponse: IBackendReponse =
  {
    code: 200,
    data: mockedAdminCredential,
    error: false,
    message: 'Success',
  };
export const mockedEnvironment = {
  production: false,
  apiUrl: 'test-host-api',
};
