import { SignJWT, jwtVerify } from "jose";
const secretKey = process.env.SECRETKEY; // Configura tu clave secreta para JWT

export const signJWT = async (payload, options) => {
    try {
      const secret = new TextEncoder().encode(secretKey);
      const alg = "HS256";
      return new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setExpirationTime(options.exp)
        .setIssuedAt()
        .setSubject(payload.sub)
        .sign(secret);
    } catch (error) {
      throw error;
    }
  };

  export const verifyJWT = async (token) => {
    try {
      return (
        await jwtVerify(
          token,
          new TextEncoder().encode(secretKey)
        )
      ).payload;
    } catch (error) {
      console.log(error);
      throw new Error("Tu token ha expirado.");
    }
  };
  