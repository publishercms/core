import { encode, verify } from "jsr:@hig/jwt";
import { hash, verify as verifyPassword } from "jsr:@felix/bcrypt@^1.0.5";
import { database } from "../db/connection.ts";

export class AuthenticationService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  };

  verifyJwtToken(token: string) {
    return verify(token, this.secretKey);
  };

  async isJwtTokenValid(token: string) {
    return await verify(token, this.secretKey) === "valid";
  };

  createJwt(userId: string) {
    const payload = {
      userId,
      exp: (Math.floor(Date.now() / 1000) + 60 * 60) * 24, // 24hr expiry
    };

    return encode(payload, this.secretKey);
  };

  async protectedRequest(request: Request) {
    const token = request.headers.get('Authorization');

    if (token == null) {
      return new Response("No Authentication header provided", {
        status: 401,
      });
    }

    if (!await this.isJwtTokenValid(token.replace('Bearer ', ''))) {
      return new Response("Invalid or expired token provided", {
        status: 401,
      });
    }

    return undefined;
  };
};
