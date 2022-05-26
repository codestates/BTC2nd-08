/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

import Header from "./Header";
import log from "../utils.js";
import { hashed } from "../utils.js";

const MainPage = () => {
  const navigate = useNavigate();
  const [savedPassword, setSavedPassword] = useState();
  const [firstPassword, setFirstPassword] = useState();

  chrome.storage.local.get("password", (data) => {
    setSavedPassword(data.password);
  });

  const unlockClick = () => {
    const hashedPassword = hashed(firstPassword);
    if (savedPassword === hashedPassword) {
      navigate("/MyWallet");
    }
  };
  const recoveryClick = () => {
    navigate("/RecoveryPassword");
  };
  const initClick = () => {
    navigate("/InitPage");
  };

  const enterKeyUp = (e) => {
    if (e.key === "Enter") {
      unlockClick();
    }
  };

  return (
    <Box>
      <Header />
      <Typography variant="body1" sx={{ mt: "1em" }}>
        현's 솔라나 지갑에 오신것을 환영합니다!
      </Typography>
      <Typography variant="body1" sx={{ mt: "1em" }}>
        암호
      </Typography>
      <input
        name="firstPassword"
        onChange={(e) => {
          setFirstPassword(e.target.value);
        }}
        placeholder="비밀번호"
        onKeyUp={enterKeyUp}
      />
      <Button variant="outlined" onClick={unlockClick} sx={{ m: "1em 0" }}>
        잠금 해제
      </Button>
      <Button variant="outlined" onClick={recoveryClick} sx={{ m: "1em 0" }}>
        비밀 복구 구문을 사용해 가져오기
      </Button>
      <Button variant="outlined" onClick={initClick} sx={{ m: "1em 0" }}>
        초기화
      </Button>
    </Box>
  );
};

export default MainPage;
