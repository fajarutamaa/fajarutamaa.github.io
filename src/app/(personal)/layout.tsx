import React from "react";
import { Navbar } from "../components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="pt-12 pb-32 antialiased">{children}</main>
    </>
  );
};

export default Layout;