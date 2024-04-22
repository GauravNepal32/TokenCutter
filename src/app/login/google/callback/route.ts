import { github, lucia, google } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    console.log(code)
    const state = url.searchParams.get("state");
    const codeVerifier = cookies().get("code_verifier")?.value ?? null;
    const storedState = cookies().get("google_oauth_state")?.value ?? null;
    if (!code || !codeVerifier || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }
    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const googleUserResponse = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.accessToken}`);
        const googleUser: GoogleUser = await googleUserResponse.json();

        // Replace this with logic to fetch Google user info from tokens

        const existingUser = await prisma.oAuthAccount.findFirst({ where: { 'provider': 'google', 'provider_user_id': parseFloat(googleUser.sub.toString()) } });

        if (existingUser) {
            console.log(existingUser)
            const session = await lucia.createSession(existingUser.userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/"
                }
            });
        }

        const userId = generateId(15);
        const accountID = generateId(15);

        // Create user and OAuth account (similar to Github logic)
        const user = await prisma.user.create({
            data: {
                id: userId,
                image: googleUser.picture,
                username: googleUser.email // Use email or username based on your preference
            }
        });
        await prisma.oAuthAccount.create({
            data: {
                id: accountID,
                provider: 'google',
                provider_user_id: Number(googleUser.sub),
                userId: user.id
            }
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        console.log(e);
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }

}
interface GoogleUser {
    // Update this interface based on the data you fetch from Google user info endpoint
    sub: number;
    picture: string;
    email: string;
}