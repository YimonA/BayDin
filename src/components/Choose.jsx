import React from "react";
import { useContextCustom } from "../context/stateContext";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Choose = () => {
  const { qNO, ansNo, setAnsNo, setQNO } = useContextCustom();
  const nums = useSelector((state) => state.baydinSlice.numberList);
    const ans = useSelector((state) => state.baydinSlice.answers);
  const questions = useSelector((state) => state.baydinSlice.questions);
  const nav = useNavigate();

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

  const backHandler = (e) => {
    e.preventDefault();
    setAnsNo(null);
    setQNO(null);
    nav("/");
  };

  const findAnswerHandler = ans?.find((a) => {
    if (qNO && ansNo) {
      return a?.questionNo === qNO && a?.answerNo === ansNo;
    } else {
      return;
    }
  });

  const GoHandler = () => {
    if (ansNo === null) {
      toast.error("Please choose number to go next step.");
    } else {
      nav("/result");
    }
  };

  return (
    <div className=" container w-screen h-screen mx-auto py-10 lg:py-5 px-5">
      <div className=" flex justify-between items-center">
        <button
          onClick={backHandler}
          className="block  w-20 h-10 rounded-lg p-2 bg-black text-white mb-10"
        >
          Back
        </button>
        <p className="hidden md:block font-bold text-3xl text-center ">
          Choose One
        </p>
        <button
          onClick={GoHandler}
          className="w-20 h-10 rounded-lg p-2 bg-black text-white mb-10 md:hidden lg:hidden xl:block 2xl:hidden"
        >
          Go
        </button>
      </div>
      {/* choose */}
      <p className="md:hidden font-bold text-3xl text-center mb-3 ">
        Choose One
      </p>
      <div className="w-full md:w-[450px] lg:w-[630px] 2xl:w-[720px] flex flex-wrap justify-center items-center mx-auto">
        {nums?.map((n, index) => {
          return (
            <div
              key={index}
              onClick={() => ansHandler(n)}
              className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] lg:w-[70px] lg:h-[70px] 2xl:w-[80px] 2xl:h-[80px] bg-black text-white hover:bg-zinc-900 border border-gray-400 flex justify-center items-center cursor-pointer"
            >
              {n}
            </div>
          );
        })}
      </div>
      <div className="hidden md:block lg:block xl:hidden 2xl:block w-[500px] mx-auto pt-10">
        <p className=" font-bold text-xl mb-2">Question</p>
        <p className=" mb-5 cursor-pointer ">
          {questions[qNO + 1]?.questionName}
        </p>
        <p className=" font-bold text-xl mb-3 md:mb-7">Answer</p>
        <div className="w-full md:w-[500px] h-[100px] mb-5 border border-black p-3">
          {findAnswerHandler
            ? findAnswerHandler?.answerResult
            : "There is no result"}
        </div>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default Choose;
