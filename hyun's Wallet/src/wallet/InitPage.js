/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Box, Typography } from "@mui/material";
import log from "../utils.js";

const InitPage = () => {
  const navigate = useNavigate();
  chrome.storage.local.set({ password: 0 });
  // chrome.storage.local.get("password");
  chrome.storage.local.set({ publicKey: 0 });
  // chrome.storage.local.get("publicKey");
  chrome.storage.local.set({ secretKey: 0 }, () => {
    navigate("/");
  });
  // chrome.storage.local.get("secretKey");

  return <Box></Box>;
};

export default InitPage;
