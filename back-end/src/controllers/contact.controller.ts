import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const createContactRequest = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database
    const contact = await prisma.contactRequest.create({
      data: { name, email, message }
    });

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Form Submission from ${name}`,
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
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, data: contact, message: 'Contact request submitted and email sent successfully' });
  } catch (error) {
    console.error('Contact error:', error);
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
