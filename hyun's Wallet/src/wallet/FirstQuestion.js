import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

import Header from "./Header";

const FirstQuestion = () => {
  const navigate = useNavigate();
  const recoveryPassword = () => {
    navigate("/RecoveryPassword");
  };
  const inputPassword = () => {
    navigate("/InputPassword");
  };
  return (
    <Box>
      <Header />
      <Typography variant="body1" sx={{ mt: "1em" }}>
        현's Solana Wallet 이 처음이세요?
      </Typography>
      <Typography variant="body1" sx={{ mt: "1em" }}>
        아니요, 비밀 복구 구문이 있습니다
      </Typography>
      <Button variant="outlined" onClick={recoveryPassword} sx={{ m: "1em 0" }}>
        지갑 가져오기
      </Button>
      <Typography variant="body1" sx={{ mt: "1em" }}>
        니모닉 코드 생성
      </Typography>
      <Button variant="outlined" onClick={inputPassword} sx={{ m: "1em 0" }}>
        지갑 생성
      </Button>
    </Box>
  );
};

export default FirstQuestion;
