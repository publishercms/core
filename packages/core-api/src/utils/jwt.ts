import { create, verify } from "https://deno.land/x/djwt@v3.0.1/mod.ts";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
};
