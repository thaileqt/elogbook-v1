/** @format */
import api from "../utils/api";
import { createContext, useReducer, useState } from "react";
import { timetableReducer } from "../reducers/timetableReducer";
import {
  apiUrl,
  TIMETABLES_LOADED_FAIL,
  TIMETABLES_LOADED_SUCCESS,
  ADD_TIMETABLE,
  DELETE_TIMETABLE,
  UPDATE_TIMETABLE,
  FIND_TIMETABLE,
} from "./constants";

import axios from "axios";
export const TimetableContext = createContext();

const TimetableContextProvider = ({ children }) => {
  // State
  const [timetableState, dispatch] = useReducer(timetableReducer, {
    timetable: null,
    timetables: [],
    timetablesLoading: true,
  });

  const [showAddTimeTableTable, setShowAddTimeTableTable] = useState(false);
  const [showUpdateTimeTableTable, setShowUpdateTimeTableTable] =
    useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all timetables
  const getTimetables = async () => {
    try {
      const response = await api.get(`${apiUrl}/admin/timetable`);
      if (response.data.success) {
        dispatch({
          type: TIMETABLES_LOADED_SUCCESS,
          payload: response.data.timetables,
        });
      }
    } catch (error) {
      dispatch({ type: TIMETABLES_LOADED_FAIL });
    }
  };
  // Timetable year week
  const getTimetablesYearWeek = async (yearweek) => {
    try {
      const response = await api.get(
        `${apiUrl}/api/v1/schools/timetable/${yearweek.year}/${yearweek.week}`
      );
      if (response.status == 200) {
        dispatch({
          type: TIMETABLES_LOADED_SUCCESS,
          payload: response.data,
        });
        console.log("Sucessfull");
      }
    } catch (error) {
      console.log("Fail");
      // dispatch({ type: TIMETABLES_LOADED_FAIL });
    }
  };

  // Add post
  const addTimeTable = async (newTimeTable) => {
    try {
      const response = await api.post(
        `${apiUrl}/api/v1/schools/createTimeTable`,
        newTimeTable
      );
      if (response.status == 200) {
        return {
          message: response.data.msg ? response.data.msg : "Successfull",
        };
      }
    } catch (error) {
      return { message: "Fail" };
    }
  };

  // Delete post
  const deleteTimetable = async (timetableId) => {
    try {
      const response = await api.delete(
        `${apiUrl}/admin/timetable/${timetableId}`
      );
      if (response.data.success)
        dispatch({ type: DELETE_TIMETABLE, payload: timetableId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findTimetable = (timetableId) => {
    const timetable = timetableState.timetables.find(
      (timetable) => timetable.id === timetableId
    );
    dispatch({ type: FIND_TIMETABLE, payload: timetable });
  };

  // Update post
  const updateTimetable = async (updatedTimeTable) => {
    try {
      const response = await api.put(
        `${apiUrl}/api/v1/schools/editTimetable/${updatedTimeTable.id}`,
        updatedTimeTable
      );
      if (response.status == 200) {
        // dispatch({ type: UPDATE_TIMETABLE, payload: response.data.timetable });
        // return response.data;
        console.log("Successfull");
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  // Post context data
  const timetableContextData = {
    timetableState,
    getTimetables,
    showAddTimeTableTable,
    setShowAddTimeTableTable,
    showUpdateTimeTableTable,
    setShowUpdateTimeTableTable,
    addTimeTable,
    showToast,
    setShowToast,
    deleteTimetable,
    findTimetable,
    updateTimetable,
    getTimetablesYearWeek,
  };

  return (
    <TimetableContext.Provider value={timetableContextData}>
      {children}
    </TimetableContext.Provider>
  );
};

export default TimetableContextProvider;
