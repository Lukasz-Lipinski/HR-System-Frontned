import {
  AdminCredential,
  IBackendReponse,
  IBodyRequestLogin,
  IBodyRequestRegister,
} from '../auth/auth.service';
import { ILink } from '../components/navigation/navigation.component';

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
export const mockedLinks: ILink[] = [
  {
    href: '/',
    label: 'Home',
    icon: 'home',
  },
  {
    href: '/create-user',
    label: 'Add User',
    icon: 'add',
  },
  {
    href: '/update-user-credential',
    label: 'Modify User Credential',
    icon: 'edit',
  },
  {
    href: '/account',
    label: 'Account',
    icon: 'person',
  },
];
