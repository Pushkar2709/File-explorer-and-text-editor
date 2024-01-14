'use client'
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function New({ isFolder = false, path }: { isFolder: boolean, path: string }) {

    const router = useRouter();
    const dialogRef = useRef<null | HTMLDialogElement>(null);
    const [name, setName] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const title = `New ${isFolder ? 'Folder' : 'File'}`;
    const message = 'Invalid name / Already exists!';

    const showModal = () => {
        dialogRef.current?.showModal();
    }

    const closeModal = () => {
        dialogRef.current?.close();
        setName("");
        setShowMessage(false);
    }

    const handleChange = (e: any) => {
        setName(e.target.value);
        setShowMessage(false);
    }

    const createFile = async () => {
        const data = await fetch(`/api/file`, {
            method: 'POST',
            body: `${path}/${name}`
        }).then(r => r.json())
        console.log(data.success);
        return data.success;
    }

    const createFolder = async () => {
        const data = await fetch(`/api/folder`, {
            method: 'POST',
            body: `${path}/${name}`
        }).then(r => r.json())
        return data.success;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const success = isFolder ? await createFolder() : await createFile();
        console.log(success);
        if (success) {
            router.refresh();
            closeModal();
        } else {
            setShowMessage(true);
        }
    }

    return (
        <>
            <button className="mx-3 bg-neutral-900 p-2 text-xs rounded-lg border border-neutral-600" onClick={showModal}>{title}</button>
            <dialog ref={dialogRef} className="p-4 rounded-lg bg-neutral-900 text-white border border-neutral-600 backdrop:backdrop-blur-sm">
                <div className="flex gap-3">
                    <form onSubmit={handleSubmit} className="flex gap-3">
                        <input className="bg-transparent outline-none rounded-sm border-b" type="text" name="inputName" id="inputField" placeholder={title} value={name} onChange={handleChange} />
                        <button type="submit" role="submit"><Check strokeWidth={1} size={20} /></button>
                    </form>
                    <button onClick={closeModal}><X strokeWidth={1} size={20} /></button>
                </div>
                {showMessage && <span className="text-red-500">{message}</span>}
            </dialog>
        </>
    )
}
