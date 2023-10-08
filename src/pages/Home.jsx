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
import { Link } from "react-router-dom";
import { useContextCustom } from "../context/stateContext";

const Home = () => {
  const{setQNO}=useContextCustom();
  const dispatch = useDispatch();
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
          className=" flex cursor-pointer border border-gray-400 hover:bg-gray-800"
        >
          <span className=" w-20 h-20 bg-black text-white flex justify-center items-center cursor-pointer">{q?.questionNo}</span>
          <span className="w-full h-20 bg-black text-white flex justify-start items-center px-3 cursor-pointer">
            {q?.questionName}
          </span>
        </div>
      );
    });
//   console.log("rows", rows);

  return (
    <div className="w-screen container mx-auto py-10 min-h-screen px-5">
      <p className=" font-bold text-3xl text-center mb-5 md:mb-7">Choose Question</p>

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
      <Link to={"/choose"}>
        <button className="w-20 h-10 rounded-lg p-2 bg-black text-white">Go</button>
      </Link></div>
      {/* search result */}
      <div className="w-full h-full overflow-auto border border-black mb-5">
        {rows}
      </div>
    </div>
  );
};

export default Home;
