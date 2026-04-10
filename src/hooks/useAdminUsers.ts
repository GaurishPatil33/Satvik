import { useEffect, useState } from "react";
import { IUser } from "@/src/types/user-types";
import { getAllUsers } from "../services/user.services";

export const useAdminUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null)

    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message)

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers()
  }, [])

  return { users, error, loading, refetch: fetchUsers };
};
