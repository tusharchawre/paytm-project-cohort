import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const UserItem = ({
  username,
  to,
}: {
  username: string;
  to: string;
}) => {
  const navigate = useNavigate();


  const handleRedirect = () => {
    navigate(`/send?to=${to}&username=${username}`);
  };

  return (
    <div className="w-full rounded-md px-4 py-2 flex items-center justify-between bg-gray-400/5">
      <div className="flex gap-2 items-center">
        <div className="aspect-square h-8 rounded-full bg-amber-300"></div>
        <h1>{username}</h1>
      </div>

      <div className="w-36 ">
        <Button onClick={handleRedirect}>Send</Button>
      </div>
    </div>
  );
};
