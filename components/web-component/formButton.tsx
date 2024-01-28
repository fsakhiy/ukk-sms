'use client'

import { useFormStatus } from "react-dom"

export default function FormButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit">
            {pending ? "adding data ..." : "add"}
        </button>
    )
}