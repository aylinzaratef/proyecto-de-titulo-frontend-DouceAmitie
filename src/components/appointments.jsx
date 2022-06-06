import { authContext } from "../context/contextUser";
import { useContext, useState, useEffect } from "react";

export const appointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2022, 4, 29, 9, 35),
    endDate: new Date(2022, 4, 29, 11, 30),
    id: 0,
    location: "Room 1",
  },
];
