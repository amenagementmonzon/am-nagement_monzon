import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin/login");
      } else {
        setChecking(false);
      }
    }

    checkSession();
  }, []);

  if (checking) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Checking session...
      </div>
    );
  }

  return children;
}