import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

/**
 * This page is used as default callbackUrl after signIn to determine where to navigate the user next
 */
export default function SuccessfulLogin() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user.accountType === "LANDLORD") router.push("/app/landlords");
  if (session?.user.accountType === "TENANT") router.push("/app/tenants");

  return <>hang on, we will redirect you to the right page...</>;
}
