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
      <button onClick={onClick} className="menu-trigger">
        <User size={24} />
      </button>
      <nav className={`menu ${isActive ? "active" : "inactive"}`}>
        {children}
      </nav>
    </div>
  );
};

export default function UserProfile() {
  const { data: session } = useSession();

  return session ? (
    <Dropdown>
      <div className="profile-card" style={{ padding: "15px" }}>
        {session?.user?.displayName}
      </div>
      <Button
        className="mx-2 my-2"
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        Sign Out
      </Button>
      {session?.user?.accountType === "LANDLORD" && (
        <ListGroup>
          <ListGroup.Item action href="#/action-1">
            Landlord Action 1
          </ListGroup.Item>
          <ListGroup.Item action href="#/action-2">
            Landlord Action 2
          </ListGroup.Item>
        </ListGroup>
      )}
      {session?.user?.accountType === "TENANT" && (
        <ListGroup>
          <ListGroup.Item action href="#/action-1">
            Tenant Action 1
          </ListGroup.Item>
          <ListGroup.Item action href="#/action-2">
            Tenant Action 2
          </ListGroup.Item>
        </ListGroup>
      )}
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
