"use client"

import {createDummyData} from "@/app/test-data-audit/action";
import { useRef } from "react";
import FormButton from "@/components/web-component/formButton";
import {Input} from "@/components/ui/input";

export default function TestForm() {
    const ref = useRef<HTMLFormElement>(null)

    return (
        <div className={'justify-center items-center border p-5 '}>
            <form
                ref={ref}
                action={async (formData) => {
                await createDummyData(formData);
                ref.current?.reset()
            }}
                className={'flex flex-col space-y-5'}
            >
                <Input type="text" name="first" id="first" placeholder={'first data'} />
                <Input type="text" name="second" id="second" placeholder={'second data'} />
                <FormButton />
            </form>
        </div>
    )
}