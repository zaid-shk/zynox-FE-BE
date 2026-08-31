import React from "react";
import { useState } from "react";
import signUpApi from "../../api/SignUp";
import { Link } from "react-router";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signUp, setSignUp] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  console.log(signUp);
  const inputHandler = (e) => {
    const { name, value } = e.target;

    setSignUp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e);

    try {
      setLoading(true);

      await signUpApi(signUp);
    } catch (error) {
      setError(error.message || "Someting went worng");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="h-screen flex flex-col items-center justify-center gap-5"
    >
      <input
        type="text"
        required
        name="name"
        placeholder="name"
        value={signUp.name}
        className="border bg-gray-700 w-50 px-3 py-2 outline-0"
        onChange={inputHandler}
      />
      <input
        type="text"
        required
        name="username"
        placeholder="UserName"
        value={signUp.username}
        className="border bg-gray-700 w-50 px-3 py-2 outline-0"
        onChange={inputHandler}
      />
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        value={signUp.email}
        onChange={inputHandler}
        className="border bg-gray-700 w-50 px-3 py-2 outline-0"
      />
      <input
        type="password"
        name="password"
        required
        value={signUp.password}
        placeholder="Password"
        onChange={inputHandler}
        className="border bg-gray-700 w-50 px-3 py-2 outline-0"
      />
      <input
        type="text"
        placeholder="Conform Password"
        className="border bg-gray-700 w-50 px-3 py-2 outline-0"
      />
      <button
        type="submit"
        disabled={loading}
        className="h-11 w-50 rounded-md bg-white px-4 text-sm font-semibold text-black transition hover:bg-gray-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      <Link to={"/login"} className="text-white">
        Already Have Account
      </Link>
    </form>
  );
};

export default Signup;
