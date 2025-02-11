import axios from "axios";
import { useEffect, useState } from "react";

export const getBalance = () => {
  const [balance, setBalance] = useState(0);

  async function fetchBalance() {
    const response = await axios.get(
      `http://localhost:3000/api/v1/account/balance`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    );

    setBalance(Math.round(response.data.balance));
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  return balance;
};
