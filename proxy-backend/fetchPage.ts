import axios, { AxiosError, AxiosHeaders } from 'axios';

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36';

/**
 * Fetches a page described by "path" (without leading slash).
 */
export async function fetchPage(path: string, cookies: string | string[]): Promise<{status: number, body: unknown, error?: unknown}> {

  const headers = new AxiosHeaders();
  headers.set('referer', 'https://www.kingdomofloathing.com/game.php');
  headers.set('cookie', cookies);
  headers.set('user-agent', USER_AGENT);
  headers.set('authority', 'www.kingdomofloathing.com');

  try {
    const response = await axios.get(`https://www.kingdomofloathing.com/${path}`, { 
      headers,
      maxRedirects: 0,
      responseType: 'text',
      withCredentials: true,
    });

    return { body: response.data, status: response.status };
  } catch(error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 302) {
      const location = axiosError.response.headers['location'];
            
      if (location === 'login.php?notloggedin=1' || location === 'login.php?invalid=1') {
        // TOOD: handle re-login
        console.log('TODO: handle re-login');
      } else if (location === 'main.php') {
        console.log('redirect to main.php');
        // load main.php, then reload requested page
        const main = await fetchPage('main.php', cookies);
        console.log('loading main done: ', main);
        await fetchPage(path, cookies);
      } else {
        console.log('redirect to:', axiosError.response.headers['location']);
        // return { body: null, status: axiosError.response.statu}
      }
    }

    return { body: null, status: axiosError.response?.status ?? 500 };
  }
}
