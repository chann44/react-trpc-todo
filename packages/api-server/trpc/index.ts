import {initTRPC} from "@trpc/server"
const t = initTRPC.create();
import {z} from "zod"

interface Todo {
    todo: string
}


const mesages: Todo[] = [
    
] 

export const appRouter = t.router({
    hi: t.procedure.query(() => {
        return "hi"
    }),
    messages: t.procedure.input(z.number().default(10)).query((req) => {
        return {
            msgs: mesages.slice(-req.input)
        }
    }),
    addMessage: t.procedure.input(z.object({
        todo: z.string()
    })).mutation((req) => {
        mesages.push(req.input)
        return req.input
    })
});
