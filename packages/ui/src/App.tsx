import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useContext, useState } from "react";

import { trpc } from "./utils/trpc";

const queryClient = new QueryClient();

export default function App() {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5000/trpc",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <IndexPage />
      </QueryClientProvider>
    </trpc.Provider>
  );
}




function IndexPage() {
  const todos = trpc.messages.useQuery(200);
  const addmessage = trpc.addMessage.useMutation()
  const uttils = trpc.useContext() 
  const [value, setValue ] = useState<string>("")

  const adm = () => {
    addmessage.mutate({
      todo: value 
    }, {
      onSuccess: () => {
        uttils.messages.invalidate()
      }
    })
  }
  if (!todos.data) return <div>Loading...</div>;
  return (
    <div>
      <div>
        {
          todos.data?.msgs.map((msg) =>{
            return <h1>{msg.todo}</h1>
          })

        }
      </div>
      <input type="text" value={value} onChange={(e) => {
        setValue(e.target.value)
      }}  />
      <button onClick={adm}>addmessage</button>
    </div>
  );
}
