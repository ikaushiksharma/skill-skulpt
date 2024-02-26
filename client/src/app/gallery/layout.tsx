import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen min-h-screen patternBg dark:bg-[#020817] bg-zinc-50">
      {children}
    </div>
  );
};

export default Layout;
