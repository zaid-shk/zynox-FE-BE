import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import signInApi from "../../api/SignIn";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
  });
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

      const response = await signInApi(signUp);
      console.log(response.success);

      if (response.success === true) {
        console.log(response);
        
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      setError(error.message || "Someting went worng");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="h-screen w-screen flex flex-col gap-5 items-center justify-center"
    >
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
      <button
        type="submit"
        disabled={loading}
        className="h-11 w-50 rounded-md bg-white px-4 text-sm font-semibold text-black transition hover:bg-gray-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      <Link to={"/register"} className="text-white">
        Dont Have any Account
      </Link>
    </form>
  );
};

export default SignIn;
