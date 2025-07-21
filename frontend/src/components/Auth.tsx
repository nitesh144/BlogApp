
import { type SignupType} from "@sahunk/medium-common";
import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate()
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const requestBody = (type === "signup")
  ? postInputs
  : {
      email: postInputs.email,
      password: postInputs.password,
    };

  async function sendRequest(){
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? 'signup' : 'signin'}`, 
            requestBody, 
        {
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log("postInputs: ", postInputs);
        const jwt = response.data.jwt;
        localStorage.setItem("token", jwt)
        navigate('/blogs')
    } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //     console.error("Server response:", error.response?.data);
    //     alert(error.response?.data?.message || error.response?.data?.error || "Error while " + type);
    // } else {
    //     alert("Unexpected error occurred");
    // }
    alert(`Error while ${type=== "signup" ? "signing up" : "signing in"}` )
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center ">
      <div className="flex justify-center ">
        <div>
          <div className="px-4">
            <div className="text-3xl font-bold ">Create an account</div>
            <div className="text-gray-400 ">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="underline pl-2"
              >
                {type === "signin" ? "Sign up": "Sign in"}
              </Link>
            </div>
          </div>
          <div className="mt-5">
            {type === "signup" ? 
            <LabelledInput
              label="Name"
              placeholder="nitesh sahu"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            /> : null}
            <LabelledInput
              label="email"
              placeholder="your@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="123456"
              type={"password"}
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password  : e.target.value,
                });
              }}
            />
            <button onClick={sendRequest}
              type="button"
              className="w-full mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
        <input
          id="first_name"
          onChange={onChange}
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={placeholder}
          required
          type={type || "text"}
        />
      </div>
    </div>
  );
}

export default Auth;
