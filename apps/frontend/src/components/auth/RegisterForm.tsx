import { useState } from "react";
import { Button } from "../ui/Button";
import { registerAction } from "../../actions/register";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);
      await registerAction(formData);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-fit w-lg rounded-md border-[0.5px] border-black/10 flex items-center justify-around flex-col px-8 py-4">
      <h1 className="text-3xl font-semibold mb-1">Sign Up</h1>
      <p className="text-black/30">Create an account.</p>

      <div className="my-2 w-full">
        <p>Username</p>
        <input
          onChange={handleChange}
          className="border-[0.5px] w-full border-black/10 outline-none rounded-md px-4 py-1"
          type="text"
          placeholder="John_Doe"
        />
      </div>

      <div className="my-2 w-full">
        <p>Email</p>
        <input
          onChange={handleChange}
          className="border-[0.5px] w-full border-black/10 outline-none rounded-md px-4 py-1"
          type="email"
          placeholder="John_Doe@email.com"
        />
      </div>

      <div className="my-2 w-full">
        <p>Password</p>
        <input
          onChange={handleChange}
          className="border-[0.5px] w-full border-black/10 outline-none rounded-md px-4 py-1"
          type="password"
          placeholder="******"
        />
      </div>

      <Button onClick={handleSubmit}
      >Sign Up</Button>
    </div>
  );
};
