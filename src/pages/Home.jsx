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
import {GiEmptyHourglass} from 'react-icons/gi'

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
        <GiEmptyHourglass className=" animate-spin mr-2" size={'2rem'}/>
        <p className=" font-semibold text-2xl text-center animate-plus	">Loading...</p>
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
          <span className="w-10 md:w-28 py-3 flex justify-center items-center cursor-pointer select-none text-[12px] md:text-[16px]">
            {q?.questionNo}
          </span>
          <span className="w-full flex justify-start items-center px-3 py-3 cursor-pointer overflow-hidden mycontent text-[12px] md:text-[16px]">
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
      <p className=" font-bold text-3xl text-center mb-5 md:mb-7 lg:mb-3">
        Choose Question
      </p>

      {/* search */}
      <div className="flex justify-between items-center gap-5 mb-5 md:mb-7 ">
        <input
          type="text"
          className="w-full h-10 p-5 border-2 border-black rounded-lg "
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
      <div className="w-full h-[85%] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-300 border border-black mb-5">
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
