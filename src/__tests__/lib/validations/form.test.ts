import {
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneSchema,
  urlSchema,
  loginSchema,
  registrationSchema,
  contactFormSchema,
  newsletterSchema,
} from '@/lib/validations/form';

describe('Form Validation Schemas', () => {
  describe('Email Schema', () => {
    test('should validate correct email formats', () => {
      expect(emailSchema.safeParse('user@example.com').success).toBe(true);
      expect(emailSchema.safeParse('user.name+tag@example.co.uk').success).toBe(true);
    });
    
    test('should reject invalid email formats', () => {
      expect(emailSchema.safeParse('not-an-email').success).toBe(false);
      expect(emailSchema.safeParse('user@').success).toBe(false);
      expect(emailSchema.safeParse('@example.com').success).toBe(false);
    });
  });

  describe('Password Schema', () => {
    test('should validate strong passwords', () => {
      expect(passwordSchema.safeParse('StrongP@ss123').success).toBe(true);
      expect(passwordSchema.safeParse('Another$3cureP@ssw0rd').success).toBe(true);
    });
    
    test('should reject weak passwords', () => {
      expect(passwordSchema.safeParse('weak').success).toBe(false); // Too short
      expect(passwordSchema.safeParse('nouppercase123!').success).toBe(false); // No uppercase
      expect(passwordSchema.safeParse('NOLOWERCASE123!').success).toBe(false); // No lowercase
      expect(passwordSchema.safeParse('NoNumbers!').success).toBe(false); // No numbers
      expect(passwordSchema.safeParse('NoSymbols123').success).toBe(false); // No symbols
    });
  });

  describe('Name Schema', () => {
    test('should validate proper names', () => {
      expect(nameSchema.safeParse('John Smith').success).toBe(true);
      expect(nameSchema.safeParse('Jane-Marie O\'Connor').success).toBe(true);
    });
    
    test('should reject invalid names', () => {
      expect(nameSchema.safeParse('a').success).toBe(false); // Too short
      expect(nameSchema.safeParse('123456').success).toBe(false); // Numbers only
    });
  });

  describe('Login Schema', () => {
    test('should validate correct login data', () => {
      const validLogin = {
        email: 'user@example.com',
        password: 'StrongP@ss123',
        rememberMe: true,
      };
      
      expect(loginSchema.safeParse(validLogin).success).toBe(true);
    });
    
    test('should validate without rememberMe', () => {
      const loginWithoutRemember = {
        email: 'user@example.com',
        password: 'StrongP@ss123',
      };
      
      const result = loginSchema.safeParse(loginWithoutRemember);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.rememberMe).toBe(false); // Should default to false
      }
    });
    
    test('should reject invalid login data', () => {
      const invalidLogin = {
        email: 'not-an-email',
        password: 'weak',
      };
      
      expect(loginSchema.safeParse(invalidLogin).success).toBe(false);
    });
  });

  describe('Registration Schema', () => {
    test('should validate correct registration data', () => {
      const validRegistration = {
        name: 'John Smith',
        email: 'john@example.com',
        password: 'StrongP@ss123',
        confirmPassword: 'StrongP@ss123',
        agreeToTerms: true,
      };
      
      expect(registrationSchema.safeParse(validRegistration).success).toBe(true);
    });
    
    test('should reject registration with password mismatch', () => {
      const mismatchedPasswords = {
        name: 'John Smith',
        email: 'john@example.com',
        password: 'StrongP@ss123',
        confirmPassword: 'DifferentP@ss123',
        agreeToTerms: true,
      };
      
      expect(registrationSchema.safeParse(mismatchedPasswords).success).toBe(false);
    });
    
    test('should reject registration without agreeing to terms', () => {
      const noTermsAgreement = {
        name: 'John Smith',
        email: 'john@example.com',
        password: 'StrongP@ss123',
        confirmPassword: 'StrongP@ss123',
        agreeToTerms: false,
      };
      
      expect(registrationSchema.safeParse(noTermsAgreement).success).toBe(false);
    });
  });

  describe('Contact Form Schema', () => {
    test('should validate correct contact form data', () => {
      const validContact = {
        name: 'John Smith',
        email: 'john@example.com',
        subject: 'General Inquiry',
        message: 'This is a test message for the contact form.',
      };
      
      expect(contactFormSchema.safeParse(validContact).success).toBe(true);
    });
    
    test('should reject contact form with empty message', () => {
      const emptyMessage = {
        name: 'John Smith',
        email: 'john@example.com',
        subject: 'General Inquiry',
        message: '',
      };
      
      expect(contactFormSchema.safeParse(emptyMessage).success).toBe(false);
    });
  });

  describe('Newsletter Schema', () => {
    test('should validate newsletter subscription with defaults', () => {
      const basicSubscription = {
        email: 'user@example.com',
      };
      
      const result = newsletterSchema.safeParse(basicSubscription);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.topics).toEqual([]);
        expect(result.data.frequency).toBe('weekly'); // Default value
      }
    });
    
    test('should validate newsletter with custom options', () => {
      const customSubscription = {
        email: 'user@example.com',
        topics: ['product-updates', 'tutorials'],
        frequency: 'daily',
      };
      
      expect(newsletterSchema.safeParse(customSubscription).success).toBe(true);
    });
    
    test('should reject newsletter with invalid frequency', () => {
      const invalidFrequency = {
        email: 'user@example.com',
        frequency: 'invalid-value',
      };
      
      expect(newsletterSchema.safeParse(invalidFrequency).success).toBe(false);
    });
  });
});
