import { useState } from "react";
import { Box, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import logo from "../logo_white48.png";
// import Menu from "./Menu";

function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState();
  const handleClick = () => setOpenModal(true);

  return (
    <Box sx={{ m: "0.4em auto 2em auto", display: "flex" }}>
      <Box sx={{ ml: "0.4em", display: "flex" }}>
        <img src={logo} />
      </Box>
      <Button
        sx={{ position: "absolute", right: "0", margin: "0 0.1em" }}
        onClick={handleClick}
      >
        <AccountCircleIcon fontSize="large" sx={{ color: "#4a5a74" }} />
      </Button>
      {/* <Menu openModal={openModal} setOpenModal={setOpenModal} /> */}
    </Box>
  );
}

{
  /* <div>
  <br />
  <SimpleDialog
    selectedValue={selectedValue}
    open={open}
    onClose={handleClose}
  />
</div>; */
}

export default Header;
