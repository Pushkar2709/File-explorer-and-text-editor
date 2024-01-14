'use client'
import { Check, File, Folder, Pencil, Trash, Undo } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FileNameRow({ fileName, dir, isDir }: { fileName: string, dir: string, isDir: boolean }) {

    const router = useRouter();
    const [isEditable, setIsEditable] = useState(false);
    const [form, setForm] = useState({ fileName })
    const [showMessage, setShowMessage] = useState(false);

    const filePath = `${dir}/${fileName}`;
    const message = 'Invalid name / Already exists!';

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({
            ...form,
            [name]: value
        })
        setShowMessage(false);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = await fetch(`/api/file`, {
            method: 'PUT',
            body: JSON.stringify({
                oldFilePath: filePath,
                newFilePath: `${dir}/${form.fileName}`
            })
        }).then(r => r.json());
        if (data.success) {
            setIsEditable(false);
            setShowMessage(false);
            router.refresh();
        } else {
            setShowMessage(true);
        }
    }

    const cancelChange = () => {
        setForm({ ...form, fileName });
        setIsEditable(false);
        setShowMessage(false);
    }

    const handleDelete = async () => {
        fetch(`/api/${isDir ? 'folder' : 'file'}`, {
            method: 'DELETE', 
            body: filePath
        })
        router.refresh();
    }

    return (
        <div className="flex items-center gap-3 p-2 group">
            {
                isDir ?
                    <Folder strokeWidth={1} size={20} /> :
                    <File strokeWidth={1} size={20} />
            }
            {
                isEditable ?
                    <div className="flex gap-3">
                        <form className="flex items-center gap-3" onSubmit={handleSubmit}>
                            <input className="bg-transparent outline-none rounded-sm border-b" autoFocus type="text" name="fileName" id="fileName" value={form.fileName} onChange={handleChange} />
                            <button type="submit"><Check strokeWidth={1} size={20} /></button>
                        </form>
                        <button onClick={cancelChange} ><Undo strokeWidth={1} size={20} /></button>
                        {showMessage && <span className="text-red-500">{message}</span>}
                    </div> :
                    <>
                        <Link className="hover:underline" href={`/${dir}/${fileName}`}>{fileName}</Link>
                        <div className="ml-auto flex gap-3">
                            <button className="invisible group-hover:visible" onClick={() => setIsEditable(true)} ><Pencil strokeWidth={1} size={20} /></button>
                            <button className="invisible group-hover:visible text-red-500" onClick={handleDelete} ><Trash strokeWidth={1} size={20} /></button>
                        </div>
                    </>
            }
        </div>
    )
}
