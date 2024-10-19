import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    rut: string | null;
    dni: string | null;
    role: string[];
  };
}

export default RequestWithUser;
