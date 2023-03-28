import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "../../src/components/AdminSidebar";

function Admin(props) {
  const router = useRouter();
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    setApiKey(localStorage.getItem("api-key"));
  }, []);

  if (apiKey)
    return (
      <div className="w-screen h-screen flex font-medium">
        <AdminSidebar />
        <div className="w-full h-full"></div>
      </div>
    );
}

export default Admin;
