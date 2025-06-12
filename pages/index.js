import React,{useEffect, useState} from "react";
import { CallApi } from "../utilities/CallApi";
import {LOGIN_USER} from "../graphQL/mutation/AuthMutation";
import { GET_REGIONS } from "../graphQL/query/RegionsQry";
import Link from "next/link";

export default function Home() {
  const[loading, setLoading] = useState(false);
  useEffect(() => {
    const variables={
     userName: "user@example.com",
       password: "Password123!"
    }
    setLoading(true);
    CallApi("mutation",LOGIN_USER, variables)
      .then((res)=>{
        return res;
      }
      ).
      then((res)=>{
        if(res){
          console.log("Login successful:", res.data.login.jwtToken);
            const token = res.data.login.jwtToken;
    localStorage.setItem("jwtToken", token);
    console.log("Login successful:", token);
    setLoading(false);
        }
      }
    )
      .catch(error => {
        console.error("Login failed:", error);
      });
    setLoading(false);
  }
  , []);
  

  if(loading){
    return <p>Loading...</p>;
  }

  return (
     <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col">
      {/* Top-right Link */}
      <div className="absolute top-6 right-8">
       {loading? <span>loading...</span>: <Link
          href="/regions"
          className="px-5 py-2 rounded-full bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition"
        >
          Regions
        </Link>}
      </div>
      {/* Centered Content */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-lg text-center">
          Welcome to my app for <span className="text-blue-500">JWT token</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-xl text-center">
          This app demonstrates authentication with JWT tokens and secure API calls using GraphQL.<br />
          Explore the <span className="font-semibold text-blue-600">Regions</span> page for more features!
        </p>
      </div>
    </div>
  );
}