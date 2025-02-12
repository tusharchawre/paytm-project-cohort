import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/Button";

const SendMoney = () => {
  const [searchParmas, setSearchParams] = useSearchParams()

  const [amount , setAmount] = useState(0)


  const username = searchParmas.get("username")
  const to = searchParmas.get("to")

  return (
    <>
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-xl h-1/2 rounded-md border-[0.5px] border-black/10 shadow-2xl flex flex-col items-center justify-around px-8">
      <h1 className="text-2xl font-medium">Send Money</h1>
      
      <div className="w-full">
      <input onChange={(e)=>setAmount(e.target.valueAsNumber)} type="number" placeholder="Enter the amount..." name="amount" min={0} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-4 py-2 rounded-md border-[0.5px] border-black/10 my-4" />
      <Button>
        Send Money
      </Button>
      </div>

      </div>

    </div>
    </>
  );
};

export default SendMoney;
