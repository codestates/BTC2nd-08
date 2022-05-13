/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

import Header from "./Header";
import * as sol from "../solana";
import { hashed } from "../utils.js";
import log from "../utils.js";

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const [mnemonic, setMnemonic] = useState();
  const [firstPassword, setFirstPassword] = useState();
  const [lastPassword, setLastPassword] = useState();
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  // 니모닉 입력 받고 진행
  // const account = generateAccount(mnemonic);
  // const publicKey = account.publicKey.toString();
  // const secretKey = account.secretKey.toString();

  const handleClick = () => {
    if (sol.validateMnemonic(mnemonic)) {
      const hashedPassword = hashed(firstPassword);
      chrome.storage.local.set({ password: hashedPassword });

      const account = sol.generateAccount(mnemonic);
      const publicKey = account.publicKey.toString();
      // const secretKey = account.secretKey.toString();
      const secretKey = JSON.stringify(Array.from(account.secretKey));
      chrome.storage.local.set({ publicKey: publicKey });
      chrome.storage.local.set({ secretKey: secretKey });

      navigate(`/MainPage`);
    }
  };
  useEffect(() => {
    if (firstPassword === lastPassword && firstPassword !== undefined) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  }, [lastPassword]);
  return (
    <Box>
      <Header />
      <Typography variant="body1" sx={{ mt: "1em" }}>
        니모닉 입력
      </Typography>
      <input
        name="mnemonic"
        onChange={(e) => {
          setMnemonic(e.target.value);
        }}
        placeholder="니모닉"
      />
      <Typography variant="body1" sx={{ mt: "1em" }}>
        새 암호
      </Typography>
      <Box>
        <input
          name="firstPassword"
          onChange={(e) => {
            setFirstPassword(e.target.value);
          }}
          placeholder="비밀번호"
        />
      </Box>
      <Box>
        <input
          name="lastPassword"
          onChange={(e) => {
            setLastPassword(e.target.value);
          }}
          placeholder="비밀번호 확인"
        />
      </Box>
      {isPasswordSame ? (
        <Box>
          <Box>✅ 일치 ✅</Box>
          <Typography variant="body1" sx={{ mt: "1em" }}>
            확인
          </Typography>
          <Button variant="outlined" onClick={handleClick} sx={{ m: "1em 0" }}>
            복구
          </Button>
        </Box>
      ) : (
        <Box>❌ 불일치 ❌</Box>
      )}
    </Box>
  );
};

export default RecoveryPassword;
