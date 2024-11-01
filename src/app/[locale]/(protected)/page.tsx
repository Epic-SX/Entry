'use client';
import { HOME_URL } from "@/constants";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.location.href = HOME_URL;
  }, []);
  return null;
};

export default Home;
