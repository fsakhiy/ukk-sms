"use client"

import {createDummyData} from "@/app/test-data-audit/action";
import { useRef } from "react";
import FormButton from "@/components/web-component/formButton";

export default function TestForm() {
    const ref = useRef<HTMLFormElement>(null)

    return (
        <div>
            <form
                ref={ref}
                action={async (formData) => {
                await createDummyData(formData);
                ref.current?.reset()
            }}>
                <input type="text" name="first" id="first" placeholder={'first data'}/>
                <input type="text" name="second" id="second" placeholder={'second data'}/>
                <FormButton />
            </form>
        </div>
    )
}