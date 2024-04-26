import * as z from "zod";

export async function POST(): Promise<Response> {
    const scheme = z.object({
        requestText: z.string().min(1),
        threshold: z.enum(['Accurate', 'Moderate', 'Economy']).optional(),
    });

    return Response.json({
        originalText: ``,
        convertedText: ``,
        originalToken: 22,
        convertedToken: 22,
        differenceToken: 0
    })
}