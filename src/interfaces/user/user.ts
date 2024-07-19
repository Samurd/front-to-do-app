export interface User {
    id: string;
    img: string | null;
    name: string | null;
    lastName: string | null;
    username: string;
    email: string;
    iat: number;
    exp: number;
  }