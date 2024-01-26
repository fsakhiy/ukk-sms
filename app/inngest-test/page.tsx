"use client"

import {ChangeEvent, useState} from "react";
import {SendEventTest} from "@/app/inngest-test/action";
import toast, { Toaster} from "react-hot-toast";

export default function InngetTest() {
    const [title, setTitle] = useState("")
    const [data, setData] = useState("")

    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }
    function changeData(e: React.ChangeEvent<HTMLInputElement>) {
        setData(e.target.value);
    }

    async function sendEvent() {
        const loadSendEvent = toast.loading("creating event")
        const status = await SendEventTest({title: title, data: data})

        if(!status) {
            toast.error("cannot create event", { id: loadSendEvent })
            return
        }

        toast.success("event successfully created", { id: loadSendEvent })
    }

    return (
        <div>
            <Toaster />
            this page is dedicated to test inngest

            <input className={'border'} type="text" value={title} onChange={changeTitle}/>
            <input className={'border'} type="text" value={data} onChange={changeData}/>
            <button onClick={sendEvent}>add event</button>
        </div>
    )
}