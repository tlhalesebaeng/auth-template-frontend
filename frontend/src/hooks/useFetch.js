import { useState } from 'react';
import api from '../utils/requestInstance';

// An object with functions for performing http requests
const functions = {
    get: (url) => {
        return api.get(url);
    },
    post: (url, data) => {
        return api.post(url, data);
    },
    patch: (url, data) => {
        return api.patch(url, data);
    },
};

export function useFetch() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function res(url, method, data = {}) {
        setIsLoading(true);
        const response = await functions[method](url, data);
        setIsLoading(false);

        if (response.status < 200 || response.status >= 300) {
            // Set the error
            const responseData = response.data;
            if (responseData) {
                setError(responseData.message);
            } else {
                setError('Could not process login request');
            }

            return undefined;
        }

        return response;
    }

    return { isLoading, error, res, setError };
}
