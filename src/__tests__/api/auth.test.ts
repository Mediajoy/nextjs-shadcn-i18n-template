import { NextRequest } from 'next/server';
import { POST as loginHandler } from '@/app/api/auth/login/route';
import { POST as registerHandler } from '@/app/api/auth/register/route';
import { POST as logoutHandler } from '@/app/api/auth/logout/route';

// Mock the cookies() method from next/headers
jest.mock('next/headers', () => {
  const mockCookies = {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  };
  
  return {
    cookies: jest.fn(() => mockCookies),
  };
});

// Helper to create mock requests
function createMockRequest(body: any): NextRequest {
  return {
    json: jest.fn().mockResolvedValue(body),
    cookies: {
      get: jest.fn(),
    },
    nextUrl: {
      pathname: '/api/auth/login',
    },
  } as unknown as NextRequest;
}

describe('Authentication API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    test('should return 400 for invalid input', async () => {
      const req = createMockRequest({
        email: 'invalid-email',
        password: '',
      });

      const response = await loginHandler(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid request');
      expect(data.details).toBeDefined();
    });

    test('should return 401 for invalid credentials', async () => {
      const req = createMockRequest({
        email: 'nonexistent@example.com',
        password: 'wrong-password',
      });

      const response = await loginHandler(req);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Invalid credentials');
    });

    test('should return 200 and user data for valid credentials', async () => {
      const req = createMockRequest({
        email: 'admin@example.com',
        password: 'Password123!',
        rememberMe: true,
      });

      const response = await loginHandler(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.user).toBeDefined();
      expect(data.user.id).toBe('1');
      expect(data.user.email).toBe('admin@example.com');
      expect(data.user.role).toBe('admin');
      // Password should not be included
      expect(data.user.password).toBeUndefined();
    });
  });

  describe('POST /api/auth/register', () => {
    test('should return 400 for invalid input', async () => {
      const req = createMockRequest({
        name: 'Test User',
        email: 'invalid-email',
        password: 'weak',
        confirmPassword: 'different',
        agreeToTerms: false,
      });

      const response = await registerHandler(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid request');
    });

    test('should return 409 if user already exists', async () => {
      const req = createMockRequest({
        name: 'Existing User',
        email: 'admin@example.com', // This email already exists in the mock DB
        password: 'StrongP@ssword123',
        confirmPassword: 'StrongP@ssword123',
        agreeToTerms: true,
      });

      const response = await registerHandler(req);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.error).toBe('A user with this email already exists');
    });

    test('should return 201 for successful registration', async () => {
      const req = createMockRequest({
        name: 'New User',
        email: 'new-user@example.com',
        password: 'StrongP@ssword123',
        confirmPassword: 'StrongP@ssword123',
        agreeToTerms: true,
      });

      const response = await registerHandler(req);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Registration successful');
    });
  });

  describe('POST /api/auth/logout', () => {
    test('should delete auth cookie and return success', async () => {
      const req = createMockRequest({});
      
      const response = await logoutHandler(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Logged out successfully');
      
      // Verify cookie was deleted
      const { cookies } = require('next/headers');
      expect(cookies().delete).toHaveBeenCalledWith('authToken');
    });
  });
});
