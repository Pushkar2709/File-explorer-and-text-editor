import { closeSync, existsSync, openSync, renameSync, unlinkSync } from "fs";
import { NextRequest } from "next/server";

const DIRECTORY = process.env.DIRECTORY;

export async function POST(req: NextRequest) {
    const path = await req.text();
    try {
        const fileExists = existsSync(`${DIRECTORY}/${path}`);
        if (fileExists) {
            return Response.json({success: false});
        }
        const file = openSync(`${DIRECTORY}/${path}`, 'w');
        closeSync(file);
        return Response.json({success: true});
    } catch(error) {
        console.log(error);
        return Response.json({success: false});
    }
}

export async function PUT(req:NextRequest) {
    const {oldFilePath, newFilePath} = await req.json();
    try {
        const fileExists = existsSync(`${DIRECTORY}/${oldFilePath}`);
        if (fileExists) {
            return Response.json({success: false});
        }
        renameSync(`${DIRECTORY}/${oldFilePath}`, `${DIRECTORY}/${newFilePath}`);
        return Response.json({success: true});
    } catch(error) {
        return Response.json({success: false, message: error});
    }
}

export async function DELETE(req:NextRequest) {
    const path = await req.text();
    try {
        unlinkSync(`${DIRECTORY}/${path}`);
        return Response.json({success: true});
    } catch(error) {
        console.log(error);
        return Response.json({success: false});
    }
}