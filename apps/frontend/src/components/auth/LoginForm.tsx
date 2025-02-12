import { Button } from "../ui/Button";

export const LoginForm = () => {


  



  return (
    <div className="h-fit w-lg rounded-md border-[0.5px] border-black/10 flex items-center justify-around flex-col px-8 py-4">
      <h1 className="text-3xl font-semibold mb-1">Sign In</h1>
      <p className="text-black/30">Login to your account</p>

      <div className="my-2 w-full">
        <p>Username</p>
        <input
          className="border-[0.5px] w-full border-black/10 outline-none rounded-md px-4 py-1"
          type="text"
          placeholder="John_Doe"
        />
      </div>
      <div className="my-2 w-full">
        <p>Password</p>
        <input
          className="border-[0.5px] w-full border-black/10 outline-none rounded-md px-4 py-1"
          type="password"
          placeholder="******"
        />
      </div>

      <Button>Sign In</Button>
    </div>
  );
};
