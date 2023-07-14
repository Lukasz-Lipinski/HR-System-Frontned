import {
  AdminCredential,
  IBackendReponse,
  IBodyRequestLogin,
  IBodyRequestRegister,
} from '../auth/auth.service';
import { ILink } from '../components/navigation/navigation.component';
import {
  IEmployee,
  ISuperior,
} from '../services/employees/employees.service';

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

export const mockedBackendResponse: IBackendReponse<AdminCredential> =
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
    href: '',
    label: 'Home',
    icon: 'home',
  },
  {
    href: 'create-user',
    label: 'Add User',
    icon: 'add',
  },
  {
    href: 'account',
    label: 'Account',
    icon: 'person',
  },
];

export const mockedSuperior: ISuperior = {
  name: 'John',
  surname: 'Doe',
  email: 'johndoe@example.com',
  area: 'Sales',
  position: 'Manager',
};

export const mockedEmployees: IEmployee[] = [
  {
    id: '1',
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    role: 1,
    position: 'Manager',
    daysoff: 10,
    status: 1,
    superior: mockedSuperior,
  },
];
