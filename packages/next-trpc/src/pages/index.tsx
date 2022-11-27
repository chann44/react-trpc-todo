import { trpc } from "../uttils/trpc";

export default function IndexPage() {
  const hello = trpc.hello.useQuery();
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}