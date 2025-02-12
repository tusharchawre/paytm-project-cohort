import { useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const [searchParmas, setSearchParams] = useSearchParams()

  const username = searchParmas.get("username")
  const to = searchParmas.get("to")

  return (
    <>
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-xl h-1/2 rounded-md border-[0.5px] border-black/10 shadow-2xl flex flex-col items-center justify-around">
      <h1 className="text-2xl font-medium">Send Money</h1>
      

      </div>

    </div>
    </>
  );
};

export default SendMoney;
