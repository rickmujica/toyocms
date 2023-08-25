
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs-react';
import { signJWT } from "../../../lib/token";
const secretKey = process.env.SECRETKEY; // Configura tu clave secreta para JWT
import sequelize from "@/database/config/connect";
import initModels from "@/database/models/init-models";
const db = initModels(sequelize);


export async function POST(req) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      // console.log("ACA ESTAAAAAAAA EL REQ BODY", body)
      const { username, password } = body;
      const user = await db.users.findOne({
        where: { username: username, password: password},
      });

      // if (!user || !(await bcrypt.compareSync(password, user.password))) {
      //   return getErrorResponse(401, "Invalid email or password");
      // }
      // if (user && bcrypt.compareSync(password, user.password)) {
      if (user) {
        // Las credenciales son correctas, inicia sesión
        // const token = SignJWT({ userId: user.id }, secretKey, { expiresIn: '1h' });
        const token = await signJWT(
          { sub: user.id },
          { exp: '60m' }
        );
    
        const tokenMaxAge = parseInt(60) * 60;
        const cookieOptions = {
          name: "token",
          value: token,
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          maxAge: tokenMaxAge,
        };

        const response = new NextResponse(
          JSON.stringify({
            status: "success",
            token,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
        await Promise.all([
          response.cookies.set(cookieOptions),
          response.cookies.set({
            name: "logged-in",
            value: "true",
            maxAge: tokenMaxAge,
          }),
        ]);
    
        return response;
      } else {
        // Credenciales incorrectas
        return NextResponse.json({ success: false, message: 'Credenciales incorrectas'}, {status: 401})
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
     return NextResponse.json({ success: false}, {status: 500})
    }
  } else {
    // Método no permitido
    NextResponse.json({ success: false}, {status: 405}).end()
    
  }
}
