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

    it('returns an isLoading property', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.isLoading).toBeDefined();
    });

    it('returns an error property', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.error).toBeDefined();
    });

    it('returns a res property', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.res).toBeDefined();
    });

    it('returns a setError property', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.setError).toBeDefined();
    });

    it('returns a res property with the type of function', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.res).toBeTypeOf('function');
    });

    it('returns a setError property with the type of function', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.setError).toBeTypeOf('function');
    });

    it('sets isLoading property to false initially', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.isLoading).toBe(false);
    });

    it('sets the error property to an empty string initially', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.error).toBe('');
    });

    it('updates the error property correctly', () => {
        const { result } = renderHook(() => useFetch());
        act(() => result.current.setError('test-error'));
        expect(result.current.error).toBe('test-error');
    });

    it('calls the "GET" method with the correct arguments', async () => {
        api.get.mockResolvedValueOnce({});

        const { result } = renderHook(() => useFetch());
        await act(async () => await result.current.res('/get-test-url', 'get'));

        expect(api.get).toHaveBeenCalled();
        expect(api.get).toHaveBeenCalledWith('/get-test-url');
    });

    it('calls the "POST" method with the correct arguments', async () => {
        api.post.mockResolvedValueOnce({});

        const { result } = renderHook(() => useFetch());
        await act(
            async () => await result.current.res('/post-test-url', 'post')
        );

        expect(api.post).toHaveBeenCalled();
        expect(api.post).toHaveBeenCalledWith('/post-test-url', {});
    });

    it('calls the "PATCH" method with the correct arguments', async () => {
        api.patch.mockResolvedValueOnce({});

        const { result } = renderHook(() => useFetch());
        await act(
            async () => await result.current.res('/patch-test-url', 'patch')
        );

        expect(api.patch).toHaveBeenCalled();
        expect(api.patch).toHaveBeenCalledWith('/patch-test-url', {});
    });

    it('returns the expected response data for a successful "GET" request', async () => {
        api.get.mockResolvedValueOnce({
            status: 200,
            data: 'get-request-test-data',
        });
        const { result } = renderHook(() => useFetch());
        let response;
        await act(async () => {
            response = await result.current.res('/get-test-url', 'get');
        });

        expect(response.status).toBe(200);
        expect(response.data).toBe('get-request-test-data');
    });

    it('returns the expected response data for a successful "POST" request', async () => {
        api.post.mockResolvedValueOnce({
            status: 200,
            data: 'post-request-test-data',
        });
        const { result } = renderHook(() => useFetch());
        let response;
        await act(async () => {
            response = await result.current.res('/post-test-url', 'post');
        });

        expect(response.status).toBe(200);
        expect(response.data).toBe('post-request-test-data');
    });

    it('returns the expected response data for a successful "PATCH" request', async () => {
        api.patch.mockResolvedValueOnce({
            status: 200,
            data: 'patch-request-test-data',
        });
        const { result } = renderHook(() => useFetch());
        let response;
        await act(async () => {
            response = await result.current.res('/patch-test-url', 'patch');
        });

        expect(response.status).toBe(200);
        expect(response.data).toBe('patch-request-test-data');
    });

    it('updates the error state correctly for unsuccessful "GET" requests', async () => {
        api.get.mockResolvedValueOnce({
            status: 500,
            data: { message: 'get-request-test-error' },
        });
        const { result } = renderHook(() => useFetch());
        await act(async () => await result.current.res('/url', 'get'));
        expect(result.current.error).toBe('get-request-test-error');
    });

    it('updates the error state correctly for unsuccessful "POST" requests', async () => {
        api.post.mockResolvedValueOnce({
            status: 500,
            data: { message: 'post-request-test-error' },
        });
        const { result } = renderHook(() => useFetch());
        await act(async () => await result.current.res('/url', 'post'));
        expect(result.current.error).toBe('post-request-test-error');
    });

    it('updates the error state correctly for unsuccessful "GET" requests', async () => {
        api.patch.mockResolvedValueOnce({
            status: 500,
            data: { message: 'patch-request-test-error' },
        });
        const { result } = renderHook(() => useFetch());
        await act(async () => await result.current.res('/url', 'patch'));
        expect(result.current.error).toBe('patch-request-test-error');
    });
});
