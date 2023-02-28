import React, { useEffect, useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { User } from "react-feather";
import Link from "next/link";
import { ListGroup, Button } from "react-bootstrap";

const Dropdown = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive]);

  const onClick = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  return (
    <div className="menu-container">
      <div onClick={onClick} className="menu-trigger">
        <User size={24} />
      </div>
      <nav className={`menu ${isActive ? "active" : ""}`}>{children}</nav>
    </div>
  );
};

export default function UserProfile() {
  const { data: session } = useSession();

  return session ? (
    <Dropdown>
      <ListGroup>
        <ListGroup.Item
          style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
        >
          {session?.user?.displayName}
        </ListGroup.Item>
        {session?.user?.accountType === "LANDLORD" && (
          <>
            <ListGroup.Item action href="#/action-1">
              Landlord Action 1
            </ListGroup.Item>
            <ListGroup.Item action href="#/action-2">
              Landlord Action 2
            </ListGroup.Item>
          </>
        )}
        {session?.user?.accountType === "TENANT" && (
          <>
            <ListGroup.Item action href="#/action-1">
              Tenant Action 1
            </ListGroup.Item>
            <ListGroup.Item action href="#/action-2">
              Tenant Action 2
            </ListGroup.Item>
          </>
        )}
        <ListGroup.Item
          action
          className="text-primary font-weight-bold"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign Out
        </ListGroup.Item>
      </ListGroup>
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
