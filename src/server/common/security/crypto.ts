import crypto from 'crypto';

export const encrypt = (text: string) => {
  const salt = crypto.randomBytes(16).toString('base64');

  // const a = crypto.createCipheriv('AES-256-CTR', );
  console.log('Salt', { salt, text });
};

export const decrypt = () => {
  // crypto.createDecipheriv();
};
