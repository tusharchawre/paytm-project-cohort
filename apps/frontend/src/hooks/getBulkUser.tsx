import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../pages/Dashboard";

export const getBulkUser = ({ filter }: { filter: string }) => {
  const [users, setUsers] = useState<User[]>([]);

  async function getUsers() {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/bulk/?filter=" + filter
    );
    setUsers(response.data.user);
  }

  useEffect(() => {
    getUsers();
  }, [filter]);

  return users;
};
