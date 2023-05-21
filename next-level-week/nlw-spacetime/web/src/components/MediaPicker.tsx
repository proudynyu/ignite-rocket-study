'use client'

import { ChangeEvent, useState } from "react"

export function MediaPicker() {
    const [preview, setPreview] = useState<string | null>(null);

    function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target;

        if (!files) {
            return
        }

        const previewUrl = URL.createObjectURL(files[0])

        setPreview(previewUrl)
    }

    return (
        <>
            <input 
                onChange={onFileSelected} 
                accept="image/*"
                name="coverUrl"
                type="file" 
                id="media" 
                className="invisible w-0 h-0" 
            />
            { preview && <img src={preview} alt="" className="w-full aspect-video rounded-lg object-cover" />}
        </>
    )
}
