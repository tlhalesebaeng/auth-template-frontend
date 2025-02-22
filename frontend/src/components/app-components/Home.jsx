import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        async function fetch() {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:3000/quiz/app/api/v1/users',
                    {
                        withCredentials: true,
                    }
                );
                console.log(response.data);
            } catch (err) {
                const responseData = err.response;
                if (responseData) {
                    console.log(responseData.data.message);
                } else {
                    console.log('Message does not exist');
                }
            }
        }

        fetch();
    }, []);

    return <h1>Home</h1>;
}
