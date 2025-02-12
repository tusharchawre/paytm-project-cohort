import { useState } from "react";
import { Button } from "../ui/Button";
import { registerAction } from "../../actions/register";

export const RegisterForm = () => {
  const [formData , setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const onSubmit = () => {

  }

  return (
    <div className="h-fit w-lg rounded-md border-[0.5px] border-black/10 flex items-center justify-around flex-col px-8 py-4">
      <h1 className="text-3xl font-semibold mb-1">Sign Up</h1>
      <p className="text-black/30">Create an account.</p>

      <div className="my-2 w-full">
        <p>Username</p>
        <input

          className="border-[0.5px] w-full border-black/10 outline-none rounded-md px-4 py-1"
          type="text"
          placeholder="John_Doe"
        />
      </div>

      <div className="my-2 w-full">
        <p>Email</p>
        <input

          className="border-[0.5px] w-full border-black/10 outline-none rounded-md px-4 py-1"
          type="email"
          placeholder="John_Doe@email.com"
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

      <Button onClick={onSubmit}>Sign Up</Button>
    </div>
  );
};
