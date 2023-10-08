import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";

const initialState = {
  questions:null,
  answers:null,
  numberList:[],
  searchTerm:'',
};

export const baydinSlice = createSlice({
  name: "baydinSlice",
  initialState,
  reducers: {
    addQuestions:(state,{payload})=>{
        state.questions=payload;
    },
    addAnswers:(state,{payload})=>{
        state.answers=payload;
    },
    addNumberList:(state,{payload})=>{
        state.numberList=payload;
    },
    setSearchTerm:(state,{payload})=>{
        state.searchTerm=payload;
    }
  },
});

export const {addAnswers,addQuestions,addNumberList,setSearchTerm} = baydinSlice.actions;
export default baydinSlice.reducer;