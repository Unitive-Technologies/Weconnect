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
    const items = ul.getElementsByTagName("a");
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
              <Link to="/#" className="has-arrow">
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
                      <Link to="#">{props.t("User List")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Customer User List")} </Link>
                    </li>
                    <li>
                      <Link to="/#">
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
                  <ul>
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
                  <ul>
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
                  <ul>
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
                  <ul>
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
                  <ul>
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
              <ul>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Stock")}</span>
                  </Link>
                  <ul>
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
                  <ul>
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
                  <ul>
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
                  <ul>
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
                  <ul>
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
                  <ul>
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
              <ul>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Subscription")}</span>
                  </Link>
                  <ul>
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
                  <ul>
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
                  <ul>
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
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-bitcoin"></i>
                <span>{props.t("DAS Operations")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{props.t("Wallet")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Buy/Sell")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Exchange")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Lending")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Orders")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("KYC Application")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("ICO Landing")}</Link>
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
                  <Link to="#">{props.t("Inbox")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Read Email")} </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="#">{props.t("Templates")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="#">{props.t("Basic Action")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Alert Email")} </Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Billing Email")} </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-receipt"></i>
                <span>{props.t("Reports")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{props.t("Invoice List")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Invoice Detail")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-briefcase-alt-2"></i>
                <span>{props.t("Projects")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{props.t("Projects Grid")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Projects List")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Project Overview")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Create New")}</Link>
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
                  <Link to="#">{props.t("Task List")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Tasks Kanban")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Create Task")}</Link>
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
