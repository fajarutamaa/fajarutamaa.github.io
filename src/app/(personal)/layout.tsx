import React from "react";
import { Navbar } from "../components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="pt-12 antialiased">{children}</main>
    </>
  );
};

export default Layout;