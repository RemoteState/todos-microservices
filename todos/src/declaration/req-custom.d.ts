interface User {
  _id: string;
}

declare namespace Express {
  export interface Request {
    user: User;
  }
}
