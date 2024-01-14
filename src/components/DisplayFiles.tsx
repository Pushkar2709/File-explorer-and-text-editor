import { readdirSync, statSync } from "fs"
import { File, Folder } from "lucide-react";
import Link from "next/link";
import FileNameRow from "./FileNameRow";

export default function DisplayFiles({ dir }: { dir: string }) {

    let x = dir.split('/');
    const popped = x.pop();
    const upLevelDir = x.join('/');

    const path = `${process.env.DIRECTORY}/${dir}`;

    const getFiles = () => {
        return readdirSync(path);
    }

    return (
        <div className="w-5/6 m-5 border border-neutral-600 rounded-lg bg-neutral-950">
            {!(popped === '.') && <div key={`/${upLevelDir}`} className="p-2 border-b border-neutral-600 last:border-0">
                <Link href={`/${upLevelDir}`}>..</Link>
            </div>}
            {
                getFiles().map(file => {
                    const isDir = statSync(`${path}/${file}`).isDirectory();
                    return <div key={`/${dir}/${file}`} className="border-b border-neutral-600 last:border-0">
                        <FileNameRow fileName={file} dir={dir} isDir={isDir} />
                    </div>
                })
            }
        </div>
    )
}
