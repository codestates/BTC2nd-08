/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import { hashed } from "../utils.js";
import { Button, Box, Typography } from "@mui/material";
import log from "../utils.js";

const InputPassword = () => {
  const navigate = useNavigate();
  const [firstPassword, setFirstPassword] = useState();
  const [lastPassword, setLastPassword] = useState();
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  const handleClick = () => {
    const hashedPassword = hashed(firstPassword);
    chrome.storage.local.set({ password: hashedPassword });

    navigate(`/ShowMnemonic`);
    // navigate(`/ShowMnemonic`, {
    //   state: {
    //     password: hashedPassword,
    //   },
    // });
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
      <Box>
        <Typography>암호 생성</Typography>
        <input
          name="firstPassword"
          onChange={(e) => {
            setFirstPassword(e.target.value);
          }}
          placeholder="비밀번호"
        />
      </Box>
      <Box>
        <Typography>새 암호</Typography>
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
          <Typography>확인</Typography>
          <Button variant="outlined" onClick={handleClick} sx={{ m: "1em 0" }}>
            생성
          </Button>
        </Box>
      ) : (
        <Box>❌ 불일치 ❌</Box>
      )}
    </Box>
  );
};

export default InputPassword;
