import DisplayFiles from "@/components/DisplayFiles";
import DisplayPath from "@/components/DisplayPath";
import New from "@/components/New";
import TextEditor from "@/components/TextEditor";
import { readFileSync, statSync } from "fs";

export default function Page({ params }: { params: { path: string[] } }) {

    const path = params.path.join('/');
    const filePath = `${process.env.DIRECTORY}/${path}`
    const isDir = statSync(`${filePath}`).isDirectory();

    const text = isDir ? '' : readFileSync(filePath).toString();

    return (
        <div className="h-screen w-screen flex flex-col items-center">
            <div className="flex w-5/6 mt-10">
                <DisplayPath path={`./${path}`} />
                <div className="ml-auto">
                    <New isFolder={false} path={path} />
                    <New isFolder={true} path={path} />
                </div>
            </div>
            {
                isDir ?
                    <DisplayFiles dir={`${path}`} /> :
                    <TextEditor text={text} filePath={filePath} />
            }
        </div>
    )
}