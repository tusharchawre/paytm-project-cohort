import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../pages/Dashboard";

export const getBulkUser = ({ filter }: { filter: string }) => {
  const [users, setUsers] = useState<User[]>([]);

  async function getUsers() {
    const response = await axios.get(
      `${import.meta.env.VITE_HTTP_URl}/user/bulk/?filter=` + filter,
    );
    setUsers(response.data.user);
  }

  useEffect(() => {
    getUsers();
  }, [filter]);

  return users;
};
