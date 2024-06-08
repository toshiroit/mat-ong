import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();
  if (session?.user) {
    return <pre>{JSON.stringify(session)}</pre>;
  }
};
export default User;
