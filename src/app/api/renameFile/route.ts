import { renameSync } from "fs";
import { NextRequest } from "next/server";

const DIRECTORY = process.env.DIRECTORY;

export async function POST(req:NextRequest) {
    const {oldFilePath, newFilePath} = await req.json();
    try {
        renameSync(`${DIRECTORY}/${oldFilePath}`, `${DIRECTORY}/${newFilePath}`);
        return Response.json({success: true});
    } catch(error) {
        return Response.json({success: false, message: error});
    }
}