

export const request = async (method, url, data) => {
    try {

        const user = localStorage.getItem('auth')
        const auth = JSON.parse(user || '{}')

        let headers = {}
        console.log(auth)

        if (auth.accessToken) {
            headers['X-Authorization'] = auth.accessToken;
        }


        let buildRequest;

        if (method === 'GET') {
            buildRequest = fetch(url, {headers});
        } else {
            buildRequest = fetch(url, {
                method,
                withCredentials: true,
                headers: {
                    ...headers,
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        }

        const response = await buildRequest;
     
      
        const result = await response.json()

        return result;

    } catch (error) {
        console.log(error);
    }
}

export const get = request.bind({}, 'GET')
export const post = request.bind({}, 'POST')
export const put = request.bind({}, 'PUT')
export const del = request.bind({}, 'DELETE')