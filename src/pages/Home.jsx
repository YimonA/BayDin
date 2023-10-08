import React, { useEffect, useState } from "react";
import {
  useGetAnswersQuery,
  useGetNumberListQuery,
  useGetQuestionsQuery,
} from "../redux/api/baydinApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addNumberList,
  addQuestions,
  addAnswers,
  setSearchTerm,
} from "../redux/services/baydinSlice";
import { Link, useNavigate } from "react-router-dom";
import { useContextCustom } from "../context/stateContext";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const { qNO, setQNO } = useContextCustom();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { data: numData, isLoading } = useGetNumberListQuery();
  const { data: questionsData } = useGetQuestionsQuery();
  const { data: ansData } = useGetAnswersQuery();
  const questions = useSelector((state) => state.baydinSlice.questions);
  const searchTerm = useSelector((state) => state.baydinSlice.searchTerm);

  useEffect(() => {
    dispatch(addQuestions(questionsData));
  }, [questionsData]);
  useEffect(() => {
    dispatch(addNumberList(numData));
  }, [numData]);

  useEffect(() => {
    dispatch(addAnswers(ansData));
  }, [ansData]);

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center w-screen h-screen">
        {/* <Loader variant="dots" /> */}
        <p>Loading...</p>
      </div>
    );
  }

  const rows = questions
    ?.filter((q) => {
      if (searchTerm === "") {
        return q;
      } else if (q?.questionName.includes(searchTerm)) {
        return questions;
      }
    })
    ?.map((q) => {
      return (
        <div
          onClick={() => setQNO(q?.questionNo)}
          key={q?.questionNo}
          className=" flex cursor-pointer border border-gray-400  bg-black text-white hover:bg-zinc-900"
        >
          <span className=" w-20 h-20 flex justify-center items-center cursor-pointer select-none">
            {q?.questionNo}
          </span>
          <span className="w-full h-20 flex justify-start items-center px-3 cursor-pointer select-none">
            {q?.questionName}
          </span>
        </div>
      );
    });

  const GoHandler = () => {
    if (qNO === null) {
      toast.error("Please choose question to go next step.");
    } else {
      nav("/choose");
    }
  };

  return (
    <div className="w-screen container mx-auto py-10 h-screen px-5">
      <p className=" font-bold text-3xl text-center mb-5 md:mb-7">
        Choose Question
      </p>

      {/* search */}
      <div className="flex justify-between items-center mb-5 md:mb-7 ">
        <input
          type="text"
          className="w-[220px] md:w-[80%] h-10 p-5 border-2 border-black rounded-lg "
          variant="filled"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <button
          onClick={GoHandler}
          className="w-20 h-10 rounded-lg p-2 bg-black text-white"
        >
          Go
        </button>
      </div>
      {/* search result */}
      <div className="w-full h-full overflow-auto border border-black mb-5">
        {rows}
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

export default Home;
