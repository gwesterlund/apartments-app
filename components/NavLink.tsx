import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren, useState, useEffect } from "react";

type NavLinkProps = LinkProps & {
  className?: string;
  activeClassName?: string;
};

const NavLink = ({
  children,
  activeClassName = "active",
  className,
  ...props
}: PropsWithChildren<NavLinkProps>) => {
  const { asPath, isReady } = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      setIsActive(linkPathname === activePathname);
    }
  }, [asPath, isReady, props.as, props.href]);

  return (
    <Link
      className={[className, isActive && activeClassName]
        .filter((e) => e)
        .join(" ")}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
