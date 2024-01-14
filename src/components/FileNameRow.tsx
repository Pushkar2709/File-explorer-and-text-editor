'use client'
import { Check, File, Folder, Pencil, Undo } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FileNameRow({ fileName, dir, isDir }: { fileName: string, dir: string, isDir: boolean }) {

    const router = useRouter();
    const [isEditable, setIsEditable] = useState(false);
    const [form, setForm] = useState({fileName})
    const [showMessage, setShowMessage] = useState(false);

    const filePath = `${dir}/${fileName}`;
    const message = 'Invalid name / Already exists!';

    const handleChange = (e : any) => {
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
        const data = await fetch(`/api/renameFile`, {
            method: 'POST', 
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
        setForm({...form, fileName});
        setIsEditable(false);
        setShowMessage(false);
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
                    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
                        <input className="bg-transparent outline-none rounded-sm border-b" type="text" name="fileName" id="fileName" value={form.fileName} onChange={handleChange} />
                        <button type="submit"><Check strokeWidth={1} size={20} /></button>
                        <button onClick={cancelChange} ><Undo strokeWidth={1} size={20} /></button>
                        {showMessage && <span className="text-red-500">{message}</span>}
                    </form> :
                    <>
                        <Link className="hover:underline" href={`/${dir}/${fileName}`}>{fileName}</Link>
                        <button className="ml-auto invisible group-hover:visible" onClick={() => setIsEditable(true)} ><Pencil strokeWidth={1} size={20} /></button>
                    </>
            }
        </div>
    )
}
