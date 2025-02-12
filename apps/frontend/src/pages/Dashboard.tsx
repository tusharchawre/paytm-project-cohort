import { useState } from "react";
import { Navbar } from "../components/ui/Navbar";
import { UserItem } from "../components/ui/UserItem";
import { getBalance } from "../hooks/getBalance";
import { getBulkUser } from "../hooks/getBulkUser";
import { getUser } from "../hooks/getUser";

export interface User {
  username: string;
  _id: string
}

const Dashboard = () => {
  const [filter, setFilter] = useState("");

  const balance = getBalance();
  const users: User[] = getBulkUser({ filter });

  const currentUser = getUser()

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Navbar username={currentUser.username} />
      <div className="px-8 py-4">
        <div className=" flex justify-between">
          <h1>Users</h1>
          <h1>Balance : ₹ {balance}</h1>
        </div>
        <div className="my-4">
          <input
            onChange={(e) => setFilter(e.target.value)}
            className="border-[0.5px] border-black/40 rounded-md px-4 py-2 w-full"
            type="text"
            placeholder="Enter the username..."
          />
        </div>
        <div className="flex flex-col gap-2">
          {users.length ? (
            <>
              {users.map((user, idx) => (
                (user.username === currentUser.username) ? (null) :
                  <UserItem username={user.username} to={user._id} key={idx} />
              ))}
            </>
          ) : (
            <div className="w-full items-center justify-center text-center text-black/30">
              <p>User Not Found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
