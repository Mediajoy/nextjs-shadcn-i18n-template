// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: jest.fn().mockImplementation(() => {
    return {
      get: jest.fn(),
      getAll: jest.fn(),
    };
  }),
}));

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  send: jest.fn().mockResolvedValue({ status: 200, text: 'OK' }),
}));

// Mock Vercel Blob
jest.mock('@vercel/blob', () => ({
  put: jest.fn().mockImplementation((filename) => {
    return Promise.resolve({
      url: `https://files.vercel-storage.com/${filename}`,
      success: true,
    });
  }),
}));

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: 'test-service-id',
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: 'test-template-id',
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: 'test-public-key',
  NEXT_PUBLIC_VERCEL_BLOB_READ_WRITE_TOKEN: 'test-blob-token',
  DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);
