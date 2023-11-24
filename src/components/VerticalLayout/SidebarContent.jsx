import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

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
                    <li>
                      <Link to="/userslist">{props.t("User List")}</Link>
                    </li>
                    <li>
                      <Link to="/customer-userslist">
                        {props.t("Customer User List")}{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/grouppolicylist">
                        <span key="#">{props.t("Group Policy List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Designation List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Notification Template List")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Scheduled Notification List")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Scheule Customer Notification List")}
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
                    <li>
                      <Link to="#">{props.t("Regional Office List")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Distributor List")} </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("LCO List")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Territory")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("State List")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("District List")} </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("City List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Location List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Sublocation List")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Services")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Broadcaster List")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Genre List")} </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Language List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Channel List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Broadcaster Bouquet List")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Package List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("OSD Configuration List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("OSD Template List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("LCN List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("SMS Message Template List")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Inventory")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Company List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Brand List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Warehouse List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Inventory State List")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Billing")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Tax List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Reason List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Bank List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Promo Vocher List")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Subscription")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("NCF List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Bouquet List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Connection Scheme List")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Complaint")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Complaint Category List")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Complaint Sub-Category List")}
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
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Configuration Upload List")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#" className="has-arrow">
                <i className="bx bx-chat"></i>
                <span>{props.t("Inventory")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Stock")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Smartcard List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("STB List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Pairing List")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Faulty")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Faulty Smartcard List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Faulty STB List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Faulty Pairing List")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Blacklisting")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Blacklisted Smartcard List")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Blacklisted STB List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">
                          {props.t("Blacklisted Pairing List")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Allotted")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Allotted Pairing List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Allotted STB List")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Allotted Pairing List")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Track")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/#">
                        <span key="#">{props.t("Track SC/STB")}</span>
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
                        <span key="#">{props.t("Inventory Uploads")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
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
                        <span key="#">{props.t("Subscriber List")}</span>
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
                      <Link to="#">{props.t("DebitNote/Voucher List")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Credit Note/Voucher List")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Deposit Cheque List")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Reconcile Cheque List")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Un-Reconcile Cheque List")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Pending Recovery Report")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Journal Voucher List")}</Link>
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
