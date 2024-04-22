import { github, lucia, google } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("github_oauth_state")?.value ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const githubUser: GitHubUser = await githubUserResponse.json();
        // Replace this with your own DB client.

        const existingUser = await prisma.oAuthAccount.findFirst({ where: { 'provider': 'github', 'provider_user_id': githubUser.id } });

        if (existingUser) {
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
        const accountID = generateId(15)

        // Replace this with your own DB client.
        const user = await prisma.user.create({
            data: {
                id: userId,
                image: `https://github.com/${githubUser.login}.png`,
                username: githubUser.login
            }
        })
        await prisma.oAuthAccount.create({
            data: {
                id: accountID,
                provider: 'github',
                provider_user_id: githubUser.id,
                userId: user.id
            }
        })
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
        console.log(e)
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

interface GitHubUser {
    id: number;
    login: string;
}

interface GoogleUser {
    // Update this interface based on the data you fetch from Google user info endpoint
    id: number;
    email: string;
}