import { mkdirSync, rm, rmSync, rmdirSync, unlinkSync } from "fs";
import { NextRequest } from "next/server";

const DIRECTORY = process.env.DIRECTORY;

export async function POST(req: NextRequest) {
    const path = await req.text();
    try {
        mkdirSync(`${DIRECTORY}/${path}`);
        return Response.json({success: true});
    } catch(error) {
        console.log(error);
        return Response.json({success: false});
    }
}

export async function DELETE(req:NextRequest) {
    const path = await req.text();
    try {
        rmSync(`${DIRECTORY}/${path}`, {recursive: true});
        return Response.json({success: true});
    } catch(error: any) {
        console.log(error.message);
        return Response.json({success: false});
    }
}