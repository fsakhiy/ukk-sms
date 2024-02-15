"use client"

import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent, DialogContentLarge,
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
import CreateClassForm from "@/app/admin/class/CreationForm";
import {CreateClassAndSchedule} from "@/app/admin/class/action";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";


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

export interface ClassCreationData {
    className: string,
    scheduleData: SubmissionState[]
}

interface  SubmissionState {
    id: number;
    selectedValue: string;
}


export default function NewClassCreationForm({scheduleData, subjectData}: SchedulesData) {

    const [className, setClassName] = useState('')

    const submissionState: SubmissionState[] = []

    scheduleData.map((schedule) => {
        submissionState.push({
            id: schedule.id,
            selectedValue: ''
        })
    })

    const handleDataSubmission = async () => {

        if(submissionState.some(data => data.selectedValue === '')) {
            toast({description: 'data tidak boleh kosong', variant: 'destructive'})
            return
        }

        console.log(submissionState)
        // console.log(scheduleData)

        await CreateClassAndSchedule({className: className, scheduleData: submissionState})

        toast({description: "data dibuat"})
    }

    const onChangeFunction = (id: number, value: string) => {
        // @ts-ignore
        submissionState.find((data) => data.id === id).selectedValue = value
    }

    const handleClassNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(e.target.value)
    }


    return (
        <Dialog>
            <Toaster />

            <DialogTrigger asChild>
                <Button variant={'outline'}>
                    Buat Data Kelas Baru
                </Button>
            </DialogTrigger>

            <DialogContentLarge>
                <DialogHeader>
                    <DialogTitle>Buat Kelas Baru</DialogTitle>
                </DialogHeader>

                <div className={'flex flex-col gap-5'}>

                    <div className={'flex flex-col gap-3'}>
                        <h2 className={'font-bold text-xl'}>Nama Kelas</h2>
                        <Input value={className} onChange={handleClassNameChange} placeholder={'X DKV 1, XI PS 2, dll'} />
                    </div>

                    <div className={'flex flex-col gap-3'}>
                        <h2 className={'font-bold text-xl'}>Data Jadwal Kelas</h2>
                        <div className={'flex flex-col gap-5'}>
                            <div className={'grid grid-cols-4 gap-3'}>
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
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}
                                </div>
                            </div>
                    </div>

                    <Button onClick={handleDataSubmission} >submit</Button>
                </div>


            </DialogContentLarge>
        </Dialog>
        )
}