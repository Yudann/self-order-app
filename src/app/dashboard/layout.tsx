"use client";

import DashboardSidebar from "@/components/templates/Sidebar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Pastikan sidebar hanya terbuka setelah client mount
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className="flex bg-[#f6f6f6] ">
      <Button
        variant="outline"
        className="lg:hidden fixed top-4 left-4 z-50 text-black bg-white"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </Button>

      <DashboardSidebar isOpen={isSidebarOpen} />
      <div className="flex-1 lg:ml-[380px] pt-10 ">{children}</div>
    </div>
  );
}
