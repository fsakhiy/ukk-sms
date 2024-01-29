'use client'

import { useFormStatus } from "react-dom"
import {Button} from "@/components/ui/Button";
import {Loader2} from "lucide-react";

export default function FormButton() {
    const { pending } = useFormStatus()

    // return (
    //     // <Button
    //     //     type="submit"
    //     // >
    //     //     {pending ? "adding data ..." : "add"}
    //     // </Button>
    //
    //
    //     {pending ? (<Button>adding data</Button>) : (<Button>add</Button>)}
    //
    // )

    if(pending) {
        return (
            <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                adding data
            </Button>
        )
    } else {
        return (
            <Button >
                add data
            </Button>
        )
    }
}