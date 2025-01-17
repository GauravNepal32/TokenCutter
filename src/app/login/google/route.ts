import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url: URL = await google.createAuthorizationURL(
        state,
        codeVerifier,
        {
            scopes: ['profile', 'email']
        }
    );

    cookies().set("google_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });
    cookies().set("code_verifier", codeVerifier,
        {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 60 * 10,
            sameSite: "lax"
        })
    console.log(url)
    return Response.redirect(url);
}