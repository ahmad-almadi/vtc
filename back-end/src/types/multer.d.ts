declare namespace Express {
  namespace Multer {
    interface File {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      buffer: Buffer;
    }
  }

  interface Request {
    file?: Multer.File;
  }
}

declare module 'multer' {
  interface MulterOptions {
    storage?: unknown;
    limits?: {
      fileSize?: number;
    };
  }

  interface MulterInstance {
    single(fieldName: string): import('express').RequestHandler;
  }

  interface MulterStatic {
    (options?: MulterOptions): MulterInstance;
    memoryStorage(): unknown;
  }

  const multer: MulterStatic;
  export default multer;
}

declare module 'bcryptjs' {
  const bcrypt: {
    hash(data: string, saltOrRounds: string | number): Promise<string>;
    compare(data: string, encrypted: string): Promise<boolean>;
  };

  export default bcrypt;
}
