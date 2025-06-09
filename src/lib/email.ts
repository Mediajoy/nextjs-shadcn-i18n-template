import emailjs from '@emailjs/browser';

// Types for email parameters
interface EmailParams {
  to_email?: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  reply_to?: string;
}

interface AttachmentEmailParams extends EmailParams {
  attachment_urls?: string[];
}

/**
 * Send an email using EmailJS
 * @param params - Email parameters
 * @returns Promise with the result of the email sending
 */
export const sendEmail = async (params: EmailParams) => {
  try {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS configuration is missing');
    }

    const result = await emailjs.send(
      serviceId,
      templateId,
      params,
      publicKey
    );

    return { success: true, result };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};

/**
 * Send an email with attachment links using EmailJS
 * @param params - Email parameters including attachment URLs
 * @returns Promise with the result of the email sending
 */
export const sendEmailWithAttachments = async (params: AttachmentEmailParams) => {
  try {
    // Convert attachment URLs into a formatted string if they exist
    const attachmentText = params.attachment_urls && params.attachment_urls.length > 0
      ? `Attachments:\n${params.attachment_urls.join('\n')}`
      : '';

    // Append attachments to the message
    const enhancedParams: EmailParams = {
      ...params,
      message: `${params.message}\n\n${attachmentText}`,
    };

    return await sendEmail(enhancedParams);
  } catch (error) {
    console.error('Failed to send email with attachments:', error);
    return { success: false, error };
  }
};
