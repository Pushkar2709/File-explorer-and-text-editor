import DisplayFiles from "@/components/DisplayFiles";
import DisplayPath from "@/components/DisplayPath";
import TextEditor from "@/components/TextEditor";
import { readFileSync, statSync } from "fs";

export default function Page({ params }: { params: { path: string[] } }) {

    const path = params.path.join('/');
    const filePath = `${process.env.DIRECTORY}/${path}`
    const isDir = statSync(`${filePath}`).isDirectory();

    const text = isDir ? '' : readFileSync(filePath).toString();

    return (
        <div className="h-screen w-screen flex flex-col items-center">
            <DisplayPath path={`./${path}`} />
            {
                isDir ?
                    <DisplayFiles dir={`${path}`} /> :
                    <TextEditor text={text} filePath={filePath} />
            }
        </div>
    )
}