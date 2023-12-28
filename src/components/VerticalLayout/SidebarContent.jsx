import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, useLocation } from "react-router-dom";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import { useCallback } from "react";

const SidebarContent = (props) => {
  const ref = useRef();
  const path = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState();

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    setActiveMenuItem(item);
    console.log("Active Menu: ", item);
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    console.log("Path Name: ", pathName);
    setActiveMenuItem(pathName);
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("s");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/#">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="has-arrow">
                <i className="bx bx-calendar"></i>
                <span>{props.t("MSO Master")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Access")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li
                      className={
                        activeMenuItem === "/userslist" ? "mm-active" : ""
                      }
                    >
                      <Link to="/userslist">{props.t("Users")}</Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/customer-userslist"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/customer-userslist">
                        {props.t("Customer Users")}{" "}
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/grouppolicylist" ? "mm-active" : ""
                      }
                    >
                      <Link to="/grouppolicylist">
                        <span key="#">{props.t("Group Policies")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/designationlist" ? "mm-active" : ""
                      }
                    >
                      <Link to="/designationlist">
                        <span key="#">{props.t("Designations")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/user-hierarchylist"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/user-hierarchylist">
                        <span key="#">{props.t("User Hierarchies")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/notification-templatelist"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/notification-templatelist">
                        <span key="#">{props.t("Notification Templates")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/scheduled-notificationlist"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/scheduled-notificationlist">
                        <span key="#">
                          {props.t("Scheduled Notifications")}
                        </span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/app-adbannerlist"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/app-adbannerlist">
                        <span key="#">
                          {props.t("App Advertisement Banners")}
                        </span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem ===
                        "/scheduled-customer-notificationlist"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/schedule-customer-notificationlist">
                        <span key="#">
                          {props.t("Scheule Customer Notifications")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Organization")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li
                      className={
                        activeMenuItem === "/regional-office-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/regional-office-list">
                        <span key="#">{props.t("Regional Offices")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/distributor-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/distributor-list">
                        <span key="#">{props.t("Distributors")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/LCO-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/LCO-list">
                        <span key="#">{props.t("LCOs")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Territory")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li
                      className={
                        activeMenuItem === "/state-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/state-list">
                        <span key="#">{props.t("States")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/district-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/district-list">
                        <span key="#">{props.t("Districts")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/city-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/city-list">
                        <span key="#">{props.t("Cities")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/location-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/location-list">
                        <span key="#">{props.t("Locations")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/sublocation-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/sublocation-list">
                        <span key="#">{props.t("Sublocations")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Services")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li
                      className={
                        activeMenuItem === "/broadcaster-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/broadcaster-list">
                        <span key="#">{props.t("Broadcasters")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/genre-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/genre-list">
                        <span key="#">{props.t("Genres")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/language-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/language-list">
                        <span key="#">{props.t("Languages")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/channel-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/channel-list">
                        <span key="#">{props.t("Channels")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/broadcaster-bouquet-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/broadcaster-bouquet-list">
                        <span key="#">{props.t("Broadcaster Bouquets")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/package-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/package-list">
                        <span key="#">{props.t("Packages")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/OSDConfiguration-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/OSDConfiguration-list">
                        <span key="#">{props.t("OSD Configurations")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/OSDTemplate-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/OSDTemplate-list">
                        <span key="#">{props.t("OSD Templates")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/local-channel-number-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/local-channel-number-list">
                        <span key="#">{props.t("LCNs")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/document-upload-policy-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/document-upload-policy-list">
                        <span key="#">
                          {props.t("Document Upload Policies")}
                        </span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/SMS-Message-Template-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/SMS-Message-Template-list">
                        <span key="#">{props.t("SMS Message Templates")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Inventory")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li
                      className={
                        activeMenuItem === "/company-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/company-list">
                        <span key="#">{props.t("Companies")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/brand-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/brand-list">
                        <span key="#">{props.t("Brands")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/warehouse-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/warehouse-list">
                        <span key="#">{props.t("Warehouses")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/inventory-state-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/inventory-state-list">
                        <span key="#">{props.t("Inventory States")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Billing")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li
                      className={
                        activeMenuItem === "/tax-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/tax-list">
                        <span key="#">{props.t("Taxes")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/reason-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/reason-list">
                        <span key="#">{props.t("Reasons")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/bank-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/bank-list">
                        <span key="#">{props.t("Banks")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/promo-voucher-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/promo-voucher-list">
                        <span key="#">{props.t("Promo Vouchers")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Subscription")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li
                      className={
                        activeMenuItem === "/ncf-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/ncf-list">
                        <span key="#">{props.t("NCFs")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/bouquet-list" ? "mm-active" : ""
                      }
                    >
                      <Link to="/bouquet-list">
                        <span key="#">{props.t("Bouquets")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/connection-scheme-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/connection-scheme-list">
                        <span key="#">{props.t("Connection Schemes")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Complaint")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li
                      className={
                        activeMenuItem === "/complaint-category-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/complaint-category-list">
                        <span key="#">{props.t("Complaint Categories")}</span>
                      </Link>
                    </li>
                    <li
                      className={
                        activeMenuItem === "/complaint-subcategory-list"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/complaint-subcategory-list">
                        <span key="#">
                          {props.t("Complaint Sub-Categories")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Upload Logs")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li
                      className={
                        activeMenuItem === "/configuration-upload-logs"
                          ? "mm-active"
                          : ""
                      }
                    >
                      <Link to="/configuration-upload-logs">
                        <span key="#">
                          {props.t("Configuration Upload Logs")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li
              className={
                activeMenuItem === "/inventorystock" ? "mm-active" : ""
              }
            >
              <Link to="/inventorystock">
                <i className="bx bx-chat"></i>
                <span key="#">{props.t("Inventory")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="has-arrow">
                <i className="bx bx-file"></i>
                <span>{props.t("Subscription Master")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Subscription")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Subscribers")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Bulk Operations")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Accounts Renewal")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Bouquet Renewal")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Bouquet Assignment")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Base Bouquet Replacement")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Addon Bouquet Replacement")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Accounts Suspend")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Account Resume")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Bulk Deactivate")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Bulk Activate")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Bulk Terminate")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Bulk Accounts Refresh")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Bulk Terminated Accounts Refresh")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Subscriber Shifting")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Set Auto Renewal")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Un-Set Auto Renewal")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Bulk STB Replacement")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Scheduled Jobs Logs")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Upload Logs")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Subscriber uploads")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-bitcoin"></i>
                <span>{props.t("DAS Operations")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("CAS Reconciliation")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("CAS Reconciliation Logs")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("NSTV")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("CAS Commands")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Command Logs")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Message Command Logs")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("AADHARKYC")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Command Logs")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-envelope"></i>
                <span>{props.t("Accounting")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Billing & Accounting")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("LCO Collection Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Effective Collection")} </Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Oneline SOA")} </Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Online Payment Reconcile")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("LCO Ledger")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("DebitNote/Vouchers")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Credit Note/Vouchers")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Deposit Cheques")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Reconcile Cheques")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Un-Reconcile Cheques")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Pending Recovery Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Journal Vouchers")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bill Summary Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">
                        {props.t("Productwise Billing Report")}
                      </Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("RSD Billing Report")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Customer")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Customer Ledger")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Customer Transaction")} </Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Advance Renewals")} </Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Monthly Bill Statement")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Customer Billling")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bulk Customer COllection")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Collection Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bulk Bill Payment")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bill Payment Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bulk Customer Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Discount Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Recurring Discount Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">
                        {props.t("Bulk Customer Additional Charges")}
                      </Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Additionl Charges Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">
                        {props.t("Recurring Additional Charges Report")}
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        {props.t("Bulk Customer Previous Dues")}
                      </Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Previous Dues Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bulk Customer Bad Debt")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Customer Bad Debt Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Payment Deposit")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Payment Reconcile")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Payment Un-Reconcile")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Reconcilation Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">
                        {props.t("Online Payment Reconcile Report")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-receipt"></i>
                <span>{props.t("Reports")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("TRAI Reports")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Registered Customer")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("STB Location Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Active Customer")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Inactive Customer")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Expired Customer")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Terminated Customer")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Total Customer")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Authorized Customer")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Alacarte Vs Customers")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Package Vs Customers")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bouquet Vs Customers")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bouquet Rp Vs Customers")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bouquet Configuration")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Current Subscription")}</Link>
                    </li>
                    <li>
                      <Link to="#">
                        {props.t("Current Inactive Subscription")}
                      </Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Customer Aging")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bouquet Aging")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Product Subscription")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Broadcaster Reports")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Broadcaster Subscription")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Broadcaster Bouquetwise")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("HD-SD Count")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Historical Reports")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Registered Subscription")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Active Subscription")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Expired Subscription")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Suspended Subscription")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Disconnected Subscription")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Inventory Reports")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Inventory Summary")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("CAS Summary")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Smartcard Stock")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("STB Stock")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Paired Stock")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Smartcard PO Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("STB PO Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Available Stock")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Outward Stock")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Return Stock")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Inward Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("VC Current Status")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Smartcard Status")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("STB Status")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("STB VC Replacement")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Brandwise Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Challan Summary")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Brand VS LCO")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Allotted Scheme")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Subscriber Shifting")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Device Status")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Miscellaneous")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("LCO Bouquet")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("LCO Scheme")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("LCO Vs Alacarte")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("LCO Vs Package")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("LCO Vs Bouquet")}</Link>
                    </li>
                    <li>
                      <Link to="#">
                        {props.t("Activation Deactivation Log LCO Wise")}
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        {props.t("Activation Deactivation Log Summary")}
                      </Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("History Status Linear")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Assigned NCF")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("LCO Transaction Summary")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("LCO Transaction Detail")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Combine Operator")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Auto Renewal")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bouquet Rate Bifuracation")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Daily Accounts Renewed")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Mobile SMS")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("User Activity")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Subscriber Transfer")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Package Log")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bouquet Log")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Operator Bouquet Rates")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Operator Documents")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("LCO Wise Promo Voucher")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Logs")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Package Composition")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Activation Disconnection")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Bouquet Composition")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Advanced Reports")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Download Logs")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Auto Generate Logs")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Extract History Logs")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-task"></i>
                <span>{props.t("CRM")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Tickets")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Open")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Closed")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Invalid")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Prospect")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Open")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Pending")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Closed")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Invalid")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Reporting")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Complaint Reply")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Ticket Details")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Engineers Performance")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-task"></i>
                <span>{props.t("Upload Logs")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{props.t("Configuration")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Inventory")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Subscriber")}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
