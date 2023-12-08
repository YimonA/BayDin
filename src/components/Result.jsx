import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContextCustom } from "../context/stateContext";

const Result = () => {
  const { qNO, ansNo,setAnsNo,setQNO } = useContextCustom();
  const ans = useSelector((state) => state.baydinSlice.answers);
  const questions = useSelector((state) => state.baydinSlice.questions);

  const nav = useNavigate();

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
  return (
    <div className="container mx-auto py-10 px-5">
      <button
        onClick={backHandler}
        className="w-20 h-10 rounded-lg p-2 bg-black text-white mb-10"
      >
        Back
      </button>
      <div className="w-full md:w-[500px] mx-auto">
      <p className=" font-bold text-xl mb-2">Question</p>
      <p className=" mb-5 cursor-pointer py-2">{questions[qNO+1]?.questionName}</p>
      <p className=" font-bold text-xl mb-3 md:mb-7">Answer</p>
      <div className="w-full h-[100px] mb-5 border border-black p-3 ">
        {findAnswerHandler
          ? findAnswerHandler?.answerResult
          : "There is no result"}
      </div>
      </div>
    </div>
  );
};

export default Result;
