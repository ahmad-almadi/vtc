import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { Resend } from 'resend';

// Initialize Resend with validation
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error('❌ RESEND_API_KEY is not set in environment variables!');
} else {
  console.log('✅ Resend API Key is configured');
  console.log('🔑 Key starts with:', apiKey.substring(0, 5) + '...');
}

const resend = new Resend(apiKey);

export const createContactRequest = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    console.log('� Received contact form submission:', { name, email });

    if (!name || !email || !message) {
      console.log('❌ Validation failed: missing fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database
    console.log('💾 Saving to database...');
    const contact = await prisma.contactRequest.create({
      data: { name, email, message }
    });
    console.log('✅ Saved to database with ID:', contact.id);

    // Check if Resend is configured
    if (!apiKey) {
      console.error('❌ Cannot send email: RESEND_API_KEY not configured');
      return res.status(201).json({ 
        success: true, 
        data: contact, 
        message: 'Contact saved but email not configured',
        emailSent: false
      });
    }

    console.log('📧 Attempting to send email via Resend...');
    console.log('📝 From:', name, '(' + email + ')');
    console.log('📬 To:', process.env.EMAIL_USER || 'ahmadalmadi2005@gmail.com');

    try {
      // Send email using Resend
      const emailData = {
        from: 'VTC Contact Form <onboarding@resend.dev>',
        to: [process.env.EMAIL_USER || 'ahmadalmadi2005@gmail.com'],
        replyTo: email,
        subject: `🔔 New Contact: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #FF9FFC; border-bottom: 2px solid #FF9FFC; padding-bottom: 10px;">New Contact Form Submission</h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 10px 0;"><strong style="color: #333;">Name:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
              </div>
              
              <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #FF9FFC; border-radius: 5px;">
                <p style="margin: 0;"><strong style="color: #333;">Message:</strong></p>
                <p style="margin: 10px 0; color: #555; line-height: 1.6;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
                <p>This email was sent from VTC Website Contact Form</p>
                <p>Reply directly to this email to respond to ${name}</p>
              </div>
            </div>
          </div>
        `,
      };

      console.log('📤 Sending email with data:', JSON.stringify({ ...emailData, html: '[HTML CONTENT]' }));

      const { data, error } = await resend.emails.send(emailData);

      if (error) {
        console.error('❌ Resend API returned error:', JSON.stringify(error, null, 2));
        return res.status(201).json({ 
          success: true, 
          data: contact, 
          message: 'Contact request submitted but email failed to send',
          emailSent: false,
          emailError: error.message || JSON.stringify(error)
        });
      }

      console.log('✅ Email sent successfully via Resend!');
      console.log('📬 Email ID:', data?.id);
      console.log('📊 Full response:', JSON.stringify(data, null, 2));
      
      res.status(201).json({ 
        success: true, 
        data: contact, 
        message: 'Contact request submitted and email sent successfully',
        emailSent: true,
        emailId: data?.id
      });
    } catch (emailError: any) {
      console.error('❌ Exception while sending email:', emailError);
      console.error('Error name:', emailError.name);
      console.error('Error message:', emailError.message);
      console.error('Error stack:', emailError.stack);
      
      res.status(201).json({ 
        success: true, 
        data: contact, 
        message: 'Contact request submitted but email failed to send',
        emailSent: false,
        emailError: emailError.message
      });
    }
  } catch (error: any) {
    console.error('❌ Contact controller error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ error: 'Failed to submit contact request' });
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};
