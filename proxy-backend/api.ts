import axios, { AxiosError, AxiosHeaders } from 'axios';
import { Express } from 'express';

import { USER_AGENT } from './constants';

/**
 * /api.php?what=status&for=kolol
 */
export async function getApiStatus(cookies: string): Promise<unknown | null> {
    const headers = new AxiosHeaders();
    headers.set('user-agent', USER_AGENT);
    headers.set('cookie', cookies);

    try {
        const apiStatus = await axios.get('https://www.kingdomofloathing.com/api.php?what=status&for=kolol', {
            headers,
            withCredentials: true,
        });

        return apiStatus.data;
    } catch(error) {
        const axiosError = error as AxiosError;

        console.log('error');

        if (axiosError.response?.status === 302) {
            if (axiosError.response.headers['location'] === 'login.php?notloggedin=1') {
                // TOOD: handle re-login
                console.log('not loggedin');
            }
        }
    }

    return null;
}

export function setupApi(app: Express): void {

    app.get('/api/status', async (req, res) => {

        const cookies = req.headers['x-session'];

        const apiStatus = await getApiStatus(cookies as string);

        if (apiStatus) {
            res.send(apiStatus);
            res.end();

            return;
        }

        res.status(500);
        res.end();
    });
}
