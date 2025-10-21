import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useFetch } from './useFetch.js';

describe('useFetch hook', () => {
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
});
