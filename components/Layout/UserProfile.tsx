import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/react";

export default function UserProfile() {
  const { data: session } = useSession();

  return session ? (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        {session?.user?.displayName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {session?.user?.accountType === "LANDLORD" && (
          <>
            <Dropdown.Item href="#/action-1">Landlord Action 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Landlord Action 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Landlord Action 3</Dropdown.Item>
          </>
        )}
        {session?.user?.accountType === "TENANT" && (
          <>
            <Dropdown.Item href="#/action-1">Tenant Action 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Tenant Action 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Tenant Action 3</Dropdown.Item>
          </>
        )}
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <Button
      variant="primary"
      onClick={() => {
        signIn("Credentials", { callbackUrl: "/auth/success" });
      }}
    >
      Sign In
    </Button>
  );
}
