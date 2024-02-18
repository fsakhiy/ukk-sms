// src/app/api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/components/inngest/client";
import {testInngestFunction} from "@/components/inngestFn/test";
import {generateScheduleDetail} from "@/components/inngestFn/scheduleGeneration";
import {generateStudentSchedule} from "@/components/inngestFn/studentScheduleGeneration";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [testInngestFunction, generateScheduleDetail, generateStudentSchedule],
});
