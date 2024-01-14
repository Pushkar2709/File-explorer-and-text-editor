'use client';
import { useState } from "react";

export default function TextEditor({ text, filePath }: { text: string, filePath: string }) {

    const [content, setContent] = useState(text);
    const [updated, setUpdated] = useState(false);

    if (updated) {
        fetch(`/api/saveData`, {
            method: 'POST',
            body: JSON.stringify({ filePath, content })
        })
        setUpdated(false);
    }

    const handleChange = async (e: any) => {
        setUpdated(true);
        setContent(e.target.value);
    }

    return (
        <textarea className="h-5/6 w-5/6 m-5 bg-neutral-950 resize-none" name="text" id="text" value={content} onChange={handleChange}></textarea>
    )
}
