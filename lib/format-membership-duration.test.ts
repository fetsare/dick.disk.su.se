import { describe, it, expect, beforeAll, vi } from 'vitest';
import { formatMembershipDuration } from './format-membership-duration';

const FIXED_NOW = new Date('2025-01-15T12:00:00Z');

beforeAll(() => {
  vi.setSystemTime(FIXED_NOW);
});

describe('formatMembershipDuration', () => {
  it('returns null for null/undefined', () => {
    expect(formatMembershipDuration(null)).toBeNull();
    expect(formatMembershipDuration(undefined)).toBeNull();
  });

  it('returns null for invalid date', () => {
    expect(formatMembershipDuration('not-a-date')).toBeNull();
  });

  it('formats only days when less than a month', () => {
    const createdAt = new Date('2025-01-10T00:00:00Z');
    expect(formatMembershipDuration(createdAt)).toBe('5 dagar');
  });

  it('formats months and days correctly across month boundary', () => {
    const createdAt = new Date('2024-12-20T00:00:00Z');
    expect(formatMembershipDuration(createdAt)).toBe('26 dagar');
  });

  it('formats years and months and days', () => {
    const createdAt = new Date('2023-10-10T00:00:00Z');
    const result = formatMembershipDuration(createdAt);
    expect(result).toMatch(/år/);
  });
});
