interface User {
  _id: string;
  firstName: string;
}

declare namespace Express {
  export interface Request {
    user: User;
  }
}
