import { writeFileSync } from "fs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const {filePath, content} = await req.json();
    writeFileSync(filePath, content);
    return Response.json({success: true});
}