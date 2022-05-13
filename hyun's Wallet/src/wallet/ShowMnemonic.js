/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { Button, Box, Typography } from "@mui/material";

import Header from "./Header";
import * as sol from "../solana";
import log from "../utils.js";

const ShowMnemonic = () => {
  // 니모닉 생성 -> 시드 생성 -> 계정 생성
  const mnemonic = sol.generateMnemonic();
  const account = sol.generateAccount(mnemonic);
  const publicKey = account.publicKey.toString();
  // const secretKey = account.secretKey.toString();
  const secretKey = JSON.stringify(Array.from(account.secretKey));
  chrome.storage.local.set({ publicKey: publicKey });
  chrome.storage.local.set({ secretKey: secretKey });
  // log(`mnemonic = ${mnemonic}`);
  // log(`publicKey = ${publicKey}`);
  // log(`secretKey = ${secretKey}`);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/MainPage");
  };

  return (
    <Box>
      <Header />
      <Typography variant="body1" sx={{ mt: "1em" }}>
        니모닉 구문 확인
      </Typography>
      {mnemonic}
      <Typography variant="body1" sx={{ mt: "1em" }}>
        니모닉이 유출되면 다른 사람이 지갑에 접근할 수 있습니다.
      </Typography>
      <Button variant="outlined" onClick={handleClick} sx={{ m: "1em 0" }}>
        시작하기
      </Button>
    </Box>
  );
};

export default ShowMnemonic;
