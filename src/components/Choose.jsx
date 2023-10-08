import React from "react";
import { useContextCustom } from "../context/stateContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Choose = () => {
  const { setAnsNo } = useContextCustom();
  const nums = useSelector((state) => state.baydinSlice.numberList);

  const ansHandler = (n) => {
    switch (n) {
      case "၁":
        setAnsNo(1);
        break;
      case "၂":
        setAnsNo(2);
        break;
      case "၃":
        setAnsNo(3);
        break;
      case "၄":
        setAnsNo(4);
        break;
      case "၅":
        setAnsNo(5);
        break;
      case "၆":
        setAnsNo(6);
        break;
      case "၇":
        setAnsNo(7);
      case "၈":
        setAnsNo(8);
        break;
      case "၉":
        setAnsNo(9);
        break;
      case "၁၀":
        setAnsNo(10);
        break;
    }
  };

  return (
    <div className=" container w-screen mx-auto py-10 px-5">
      <div className=" flex justify-between items-center">
        <Link to={"/"}>
          <button className="w-20 h-10 rounded-lg p-2 bg-black text-white mb-10">
            Back
          </button>
        </Link>
        <Link to={"/result"}>
          <button className="w-20 h-10 rounded-lg p-2 bg-black text-white mb-10">
            Go
          </button>
        </Link>
      </div>
      {/* choose */}
      <p className=" font-bold text-3xl text-center mb-5">Choose One</p>
      <div className="w-[315px] md:w-[720px] md:h-[720px] flex flex-wrap justify-center items-center mx-auto">
        {nums?.map((n, index) => {
          return (
            <div
              key={index}
              onClick={() => ansHandler(n)}
              className="w-[35px] h-[35px] bg-black border border-gray-400 text-white flex justify-center items-center cursor-pointer"
            >
              {n}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Choose;
