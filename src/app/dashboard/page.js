"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const response = await fetch("/api/user/role");
      const data = await response.json();
      if (data.role) setUserRole(data.role);
      else window.location.href = "/unauthorized";
    };
    fetchRole();
  }, []);

  if (!userRole) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {userRole === "admin" && <p>Admin Panel</p>}
      {userRole === "viewer" && <p>Viewer Dashboard</p>}
    </div>
  );
}
