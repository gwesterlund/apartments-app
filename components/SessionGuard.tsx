import { useSession } from "next-auth/react";
import Link from "next/link";
import { Alert, Button } from "react-bootstrap";

type SessionGuardProps = {
  accountType: "LANDLORD" | "TENANT";
  children: React.ReactNode;
};

/**
 * Guards content from being displayed to unauthorised users
 * @param accountType Expected user account type
 */
const SessionGuard = ({
  accountType,
  children,
}: SessionGuardProps): JSX.Element => {
  const { data: session } = useSession();

  const accountTypes = {
    LANDLORD: {
      errorMessage: <p>This area is restricted to landlords only.</p>,
      usefulLinks: [
        <Link key="landlord-portal" href="/app/landlords">
          <Button>Go to Landlord Portal</Button>
        </Link>,
      ],
    },
    TENANT: {
      errorMessage: <p>This area is restricted to tenants only.</p>,
      usefulLinks: [
        <Link key="tenant-portal" href="/app/tenants">
          <Button>Go to Tenant Portal</Button>
        </Link>,
      ],
    },
  };

  if (accountType === session?.user?.accountType) return <>{children}</>;

  return (
    <Alert>
      <h2>You are not supposed to be here!</h2>
      {accountTypes[accountType]?.errorMessage}
      <Link key="landing-page" href="/">
        <Button>Go to Home page</Button>
      </Link>
      {accountTypes[session?.user?.accountType]?.usefulLinks}
    </Alert>
  );
};

export default SessionGuard;
