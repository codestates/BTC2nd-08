/*global chrome*/
import { Keypair } from "@solana/web3.js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

import Header from "./Header";
import * as sol from "../solana";
import log from "../utils.js";

const MyWallet = () => {
  const navigate = useNavigate();
  const [publicKeyString, setPublicKeyString] = useState();
  const [secretKeyString, setSecretKeyString] = useState();
  const [recipientPublicKey, setRecipientPublicKey] = useState();
  const [recipientAmount, setRecipientAmount] = useState();
  const [keyPair, setKeyPair] = useState();
  const [balance, setBalance] = useState(0);

  const connection = sol.createConnection();

  chrome.storage.local.get("publicKey", (data) => {
    setPublicKeyString(data.publicKey);
  });
  chrome.storage.local.get("secretKey", (data) => {
    setSecretKeyString(data.secretKey);
  });

  const sendTransaction = () => {
    sol
      .sendTransaction(connection, recipientPublicKey, recipientAmount, keyPair)
      .then((data) => {
        log(`transaction Signature : ${data}`);
        updateBalance();
      });
  };
  const logout = () => {
    navigate("/MainPage");
  };

  const updateBalance = () => {
    sol.getBalance(connection, keyPair.publicKey).then((data) => {
      setBalance(data);
    });
  };

  useEffect(() => {
    if (secretKeyString !== undefined) {
      const account = sol.getKeyPair(
        new Uint8Array(JSON.parse(secretKeyString))
      );
      setKeyPair(account);
      // updateBalance();
    }
  }, [secretKeyString]);

  useEffect(() => {
    if (keyPair !== undefined) {
      updateBalance();
    }
  }, [keyPair]);

  return (
    <Box>
      <Header />
      <Typography variant="body1" sx={{ mt: "1em" }}>
        지갑주소
      </Typography>
      <Box>{publicKeyString}</Box>
      <Box>잔고 : {balance / 1000000000} SOL</Box>
      <Box>
        받을 주소 :
        <input
          name="recipientPublicKey"
          onChange={(e) => {
            setRecipientPublicKey(e.target.value);
          }}
          placeholder="받을 주소"
        ></input>
      </Box>
      <Box>
        전달할 수량 :
        <input
          name="recipientAmount"
          onChange={(e) => {
            setRecipientAmount(e.target.value * 1000000000);
          }}
          placeholder="전달할 수량"
        ></input>
      </Box>
      <Box>
        <Button
          variant="outlined"
          onClick={sendTransaction}
          sx={{ m: "1em 0" }}
        >
          전송
        </Button>
      </Box>
      <Box>
        <Button variant="outlined" onClick={logout} sx={{ m: "1em 0" }}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default MyWallet;
