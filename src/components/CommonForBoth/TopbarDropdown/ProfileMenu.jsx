import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../Common/withRouter";
import logo from "../../../assets/images";
// users
import user1 from "../../../assets/images/users/avatar-1.jpg";
import logo1 from "../../../assets/images/clientlogo.png";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const storedAdminDetails = localStorage.getItem("authUser");
  const admindetails = storedAdminDetails ? JSON.parse(storedAdminDetails) : {};
  // console.log("admin on topbar:" + JSON.stringify(admindetails));

  const [username, setusername] = useState("Admin");

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.email);
      } else if (
        import.meta.env.VITE_APP_DEFAULTAUTH === "fake" ||
        import.meta.env.VITE_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.username);
      }
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={logo1}
            alt="Header Avatar"
          />{" "}
          {/* {admindetails.name} */}
          {/* <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> */}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem>
            <div
              style={{
                display: "flex",
                alignItems: "top",
                justifyContent: "center",
              }}
            >
              <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                <span className="avatar-title rounded-circle bg-primary font-size-16">
                  M
                </span>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  marginBottom: -5,
                }}
              >
                <li className="color-primary font-size-15">
                  <b>{admindetails.name.toUpperCase()}</b>
                </li>
                <li>Login ID: {admindetails.username}</li>
                <li>User of: {admindetails.name}</li>
                <li>
                  Type: &nbsp;<b>{admindetails.type_label}</b>
                </li>
                <li>
                  Role: &nbsp;
                  <b> {admindetails.role === 1 && "ADMIN"}</b>
                </li>
              </ul>
            </div>
          </DropdownItem>
          <div className="dropdown-divider" />
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Change Password")}{" "}
          </DropdownItem>
          <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t("View Your Permissions")}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {props.t("Menu Shortcuts")}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
          <div className="dropdown-divider" />
          <DropdownItem tag="a" href="#">
            <span
              className="badge bg-success flex-end "
              style={{ width: "100%" }}
            >
              Last Login:{" "}
              {new Date(admindetails.last_login_at).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
