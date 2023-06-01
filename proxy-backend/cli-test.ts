import { getApiStatus } from './api';
import { doLogin } from './request';
import { name, password } from '../src/app/login/login.data';

async function main(): Promise<void> {
  const cookies = await doLogin(name, password);
  console.log('cookies: ', cookies);

  const cookieString = cookies?.join('; ');

  if (cookieString) {
    const apiStatus = await getApiStatus(cookieString);
        
    console.log('api status: ', apiStatus);
  }
}

main();
