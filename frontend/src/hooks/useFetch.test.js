import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import api from '../utils/requestInstance.js';
import { useFetch } from './useFetch.js';

describe('useFetch hook', () => {
    vi.mock('../utils/requestInstance.js', () => ({
        default: {
            get: vi.fn(),
            post: vi.fn(),
            patch: vi.fn(),
        },
    }));

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return an isLoading property', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.isLoading).toBeDefined();
    });

    it('should return an error property', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.error).toBeDefined();
    });

    it('should return a res property', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.res).toBeDefined();
    });

    it('should return a setError property', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.setError).toBeDefined();
    });

    it('should return a res property with the type of function', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.res).toBeTypeOf('function');
    });

    it('should return a setError property with the type of function', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.setError).toBeTypeOf('function');
    });

    it('should have isLoading property set to false initially', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.isLoading).toBe(false);
    });

    it('should have an empty string error property initially', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.error).toBe('');
    });

    it('should update the error property correctly', () => {
        const { result } = renderHook(() => useFetch());
        act(() => result.current.setError('test-error'));
        expect(result.current.error).toBe('test-error');
    });

    it('should return the expected response data for a successful "GET" request', async () => {
        api.get.mockResolvedValueOnce({
            status: 200,
            data: 'get-request-test-data',
        });
        const { result } = renderHook(() => useFetch());
        let response;
        await act(async () => {
            response = await result.current.res('/url', 'get');
        });

        expect(response.status).toBe(200);
        expect(response.data).toBe('get-request-test-data');
        expect(api.get).toHaveBeenCalled();
    });

    it('should return the expected response data for a successful "POST" request', async () => {
        api.post.mockResolvedValueOnce({
            status: 200,
            data: 'post-request-test-data',
        });
        const { result } = renderHook(() => useFetch());
        let response;
        await act(async () => {
            response = await result.current.res('/url', 'post');
        });

        expect(response.status).toBe(200);
        expect(response.data).toBe('post-request-test-data');
        expect(api.post).toHaveBeenCalled();
    });

    it('should return the expected response data for a successful "PATCH" request', async () => {
        api.patch.mockResolvedValueOnce({
            status: 200,
            data: 'patch-request-test-data',
        });
        const { result } = renderHook(() => useFetch());
        let response;
        await act(async () => {
            response = await result.current.res('/url', 'patch');
        });

        expect(response.status).toBe(200);
        expect(response.data).toBe('patch-request-test-data');
        expect(api.patch).toHaveBeenCalled();
    });

    it('should update the error state correcly for unsuccessful "GET" requests', async () => {
        api.get.mockResolvedValueOnce({
            status: 500,
            data: { message: 'get-request-test-error' },
        });
        const { result } = renderHook(() => useFetch());
        await act(async () => await result.current.res('/url', 'get'));
        expect(result.current.error).toBe('get-request-test-error');
    });

    it('should update the error state correcly for unsuccessful "POST" requests', async () => {
        api.post.mockResolvedValueOnce({
            status: 500,
            data: { message: 'post-request-test-error' },
        });
        const { result } = renderHook(() => useFetch());
        await act(async () => await result.current.res('/url', 'post'));
        expect(result.current.error).toBe('post-request-test-error');
    });

    it('should update the error state correcly for unsuccessful "GET" requests', async () => {
        api.patch.mockResolvedValueOnce({
            status: 500,
            data: { message: 'patch-request-test-error' },
        });
        const { result } = renderHook(() => useFetch());
        await act(async () => await result.current.res('/url', 'patch'));
        expect(result.current.error).toBe('patch-request-test-error');
    });
});
