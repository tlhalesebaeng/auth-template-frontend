import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useFetch } from './useFetch.js';

describe('useFetch hook', () => {
    vi.mock('../utils/requestInstance.js', () => {
        const get = vi.fn(() => ({
            status: 200,
            data: 'get-request-test-data',
        }));

        const post = vi.fn(() => ({
            status: 200,
            data: 'post-request-test-data',
        }));

        const patch = vi.fn(() => ({
            status: 200,
            data: 'patch-request-test-data',
        }));

        return { default: { get, post, patch } };
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

    it('should return the expected response data for a "GET" request', async () => {
        const { result } = renderHook(() => useFetch());
        let response;
        await act(async () => {
            response = await result.current.res('/url', 'get');
        });

        expect(response.status).toBe(200);
        expect(response.data).toBe('get-request-test-data');
    });

    it('should return the expected response data for a "POST" request', async () => {
        const { result } = renderHook(() => useFetch());
        let response;
        await act(async () => {
            response = await result.current.res('/url', 'post');
        });

        expect(response.status).toBe(200);
        expect(response.data).toBe('post-request-test-data');
    });

    it('should return the expected response data for a "PATCH" request', async () => {
        const { result } = renderHook(() => useFetch());
        let response;
        await act(async () => {
            response = await result.current.res('/url', 'patch');
        });

        expect(response.status).toBe(200);
        expect(response.data).toBe('patch-request-test-data');
    });
});
