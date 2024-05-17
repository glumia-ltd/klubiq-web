import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Grid,
  AppBar,
  IconButton,
  Avatar,
  Badge,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/images/blueoctagon.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
const NavBar = () => {
  const { pathname } = useLocation();
  const section = pathname.split("/")[1];

  return (
    <AppBar position="static" sx={{ color: "blue" }} elevation={1}>
      <Toolbar
        variant="regular"
        sx={{
          justifyContent: "space-between",
          padding: ".5rem",
        }}
      >
        <Grid
          container
          spacing={1}
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            container
            direction="row"
            sx={{
              width: "60%",
              alignItems: "center",
              display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" },
            }}
          >
            <Grid item xs={3} ml="2rem">
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              >
                {" "}
                {section}{" "}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            sx={{
              width: "15%",
              alignItems: "center",
              marginRight: "3rem",
              display: { xs: "none", sm: "none", md: "none", lg: "flex" },
            }}
          >
            <Grid item xs={3}>
              <TextField
                id="input-with-icon-textfield"
                // label="TextField"
                placeholder="Search Transactions,customers"
                sx={{ width: "320px", height: "44px", padding: "0 4 0 4" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />{" "}
            </Grid>
          </Grid>

          <Grid
            item
            direction="row"
            sx={{
              width: { lg: "15%", md: "20%", sm: "40%", xs: "40%" },
              cursor: "pointer",
              alignItems: "center",
              justifyContent: {
                lg: "flex-end",
                md: "flex-end",
                sm: "flex-end",
                xs: "flex-end",
              },
              display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" },
            }}
          >
            <IconButton
              size="large"
              sx={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "10px",
              }}
              // onClick={Navigate}
            >
              <Badge badgeContent={"2"} color="error">
                <NotificationsIcon
                  sx={{ color: "#075450", width: "28px", height: "28px" }}
                />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              sx={{ color: "black" }}
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
                {" "}
                Feyisetan <br />
                manager
              </Typography>
              <Avatar
                alt="Remy Sharp"
                src={Logo}
                sx={{ width: "40px", height: "40px", marginRight: "1rem" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
