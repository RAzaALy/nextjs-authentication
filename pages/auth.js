import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/client";

function AuthPage() {
  return <AuthForm />;
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {
      canYouFind: false,
    },
  };
}

export default AuthPage;
