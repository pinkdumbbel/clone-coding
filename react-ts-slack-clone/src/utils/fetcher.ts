import axios from 'axios';

function fetcher(url: string) {
    const response = axios.get(url, { withCredentials: true });

    return response
        .then((res) => (res.data))
        .catch(e => e);
}

export default fetcher;