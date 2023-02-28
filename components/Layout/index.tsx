import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setScrolled(window.scrollY !== 0);
    };
    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div className="layout-container">
      <div className={`layout-header ${scrolled ? "sticky" : ""}`}>
        <Header />
      </div>
      <div className="layout-body">{children}</div>
      <div className="layout-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
