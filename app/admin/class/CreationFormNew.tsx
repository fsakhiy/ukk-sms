"use client"

import { useState } from "react"

import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {Toaster} from "@/components/ui/toaster";


export interface ScheduleData {
    id: number,
    name: string
    day: string
}

export interface SubjectData {
    id: number,
    name: string
}

interface SchedulesData {
    scheduleData: ScheduleData[]
    subjectData: SubjectData[]
}

interface  SubmissionState {
    id: number;
    selectedValue: string;
}


export default function NewClassCreationForm({scheduleData, subjectData}: SchedulesData) {

    const submissionState: SubmissionState[] = []

    scheduleData.map((schedule) => {
        submissionState.push({
            id: schedule.id,
            selectedValue: ''
        })
    })

    const printToConsole = () => {

        if(submissionState.some(data => data.selectedValue === '')) {
            toast({description: 'data tidak boleh kosong', variant: 'destructive'})
            return
        }

        console.log(submissionState)
        // console.log(scheduleData)
        toast({description: "data dibuat"})
    }

    const onChangeFunction = (id: number, value: string) => {
        // @ts-ignore
        submissionState.find((data) => data.id === id).selectedValue = value
    }


    return (
        <Dialog>
            <Toaster />

            <DialogTrigger asChild>
                <Button variant={'outline'}>
                    Buat Data Kelas Baru
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Buat Kelas Baru</DialogTitle>
                    {/*<DialogDescription>*/}
                    {/*    This action cannot be undone. This will permanently delete your account*/}
                    {/*    and remove your data from our servers.*/}
                    {/*</DialogDescription>*/}
                </DialogHeader>

                <div className={'flex flex-col gap-5'}>
                    <div className={'grid grid-cols-2 gap-3'}>
                        {scheduleData.map((element) => (
                            <div key={element.id}>
                                <h2>{element.day} - {element.name}</h2>
                                <Select onValueChange={(value) => {
                                    onChangeFunction(element.id, value)
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="pilih pelajaran"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjectData.map((subject) => (

                                            <SelectItem key={subject.id} value={subject.id.toString()}>{subject.name}</SelectItem>
                                        ))}
                                        {/*<SelectItem value="m@google.com">m@google.com</SelectItem>*/}
                                        {/*<SelectItem value="m@support.com">m@support.com</SelectItem>*/}
                                    </SelectContent>
                                </Select>
                            </div>
                        ))}
                        </div>
                    </div>

                    <Button onClick={printToConsole}>submit</Button>

            </DialogContent>
        </Dialog>
        )
}