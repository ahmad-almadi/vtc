import { Request, Response } from 'express';

const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API_KEY || '';
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    if (!CLOUDFLARE_API_KEY || !CLOUDFLARE_ACCOUNT_ID) {
      return res.status(500).json({ error: 'Cloudflare credentials not configured' });
    }

    const formData = new FormData();
    formData.append('file', new Blob([file.buffer as unknown as ArrayBuffer], { type: file.mimetype }), file.originalname);

    const cfResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${CLOUDFLARE_API_KEY}` },
        body: formData,
      },
    );

    const cfData = await cfResponse.json() as {
      success: boolean;
      result?: { id: string; variants: string[] };
      errors?: { message: string }[];
    };

    if (!cfData.success) {
      const errorMsg = cfData.errors?.[0]?.message || 'Cloudflare upload failed';
      console.error('Cloudflare upload error:', cfData.errors);
      return res.status(502).json({ error: errorMsg });
    }

    const imageUrl = cfData.result?.variants?.[0] || '';

    return res.json({
      url: imageUrl,
      id: cfData.result?.id,
      variants: cfData.result?.variants,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
};
