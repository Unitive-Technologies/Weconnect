import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";
import accessToken from "../jwt-token-access/accessToken";
import {
  admindetails,
  userslist as members,
  customeruserlist as custusers,
  grouppolicylist as gppolicy,
  designationlist as designation,
  notificationtemplatelist as notemplate,
  schedulecustomernotificationlist as schCusNotification,
  regionalofficelist as regOff,
  stateuserlist as stateUser,
  broadcasterlist as broadcast,
  genrelist as genre,
  distributorlist as distributor,
  districtlist as disTrict,
  citylist as cits,
  locationlist as locations,
  languagelist as langlist,
  sublocationlist as subloc,
  lcolist as lcos,
  channellist as channel,
  broadcasterbouquet as broadcastbouquet,
  packagelist as packlist,
  appadbannerlist as appAdvertiseBan,
  osdconfigurationlist as osdconfig,
  osdtemplatelist as osdtem,
  localchannelnumberlist as localnum,
  userhierarchy as userHier,
  schedulednotificationlist as schedulednotify,
  ncflist as ncfl,
  documentuploadpolicylist as documentupload,
  companylist as company,
  bouquetlist as bouquets,
  smsmsgtemplatelist as smsmsg,
  connectionschemelist as connectscheme,
  brandlist as brand,
  complaintcategorylist as complaintcate,
  warehouselist as warehouse,
  inventorystatelist as inventstate,
  complaintsubcategorylist as complaintsubcate,
  configurationuploadlogs as configuplog,
  taxlist as taxes,
  reasonlist as reasons,
  banklist as banks,
  promovoucherlist as provoucher,
} from "../../common/data";

// let users = [
//   {
//     uid: 1,
//     username: "admin",
//     role: "admin",
//     password: "123456",
//     // email: "admin@themesbrand.com",
//     email: "admin",
//     loginID: "mso",
//     user: "MY MSO",
//     type: "MSO",
//     role: "ADMIN",
//   },
// ];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

  mock.onPost(url.POST_FAKE_REGISTER).reply((config) => {
    const user = JSON.parse(config["data"]);
    admindetails.push(user);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-fake-login").reply((config) => {
    const user = JSON.parse(config["data"]);
    const validUser = admindetails.filter(
      (usr) => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          resolve([200, validUser[0]]);
        } else {
          reject([
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/fake-forget-pwd").reply((config) => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost("/post-jwt-register").reply((config) => {
    const user = JSON.parse(config["data"]);
    admindetails.push(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-login").reply((config) => {
    const user = JSON.parse(config["data"]);
    const validUser = admindetails.filter(
      (usr) => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;
          const userName = user.name;

          // JWT AccessToken
          const tokenObj = { accessToken: token, username: userName }; // Token Obj
          const validUserObj = { ...validUser[0], ...tokenObj, ...user.name }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/post-jwt-profile").reply((config) => {
    const user = JSON.parse(config["data"]);

    const one = config.headers;

    let finalToken = one.Authorization;

    const validUser = admindetails.filter((usr) => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validUser["length"] === 1) {
            let objIndex;

            //Find index of specific object using findIndex method.
            objIndex = admindetails.findIndex((obj) => obj.uid === user.idx);

            //Update object's name property.
            admindetails[objIndex].username = user.username;

            // Assign a value to locastorage
            localStorage.removeItem("authUser");
            localStorage.setItem(
              "authUser",
              JSON.stringify(admindetails[objIndex])
            );

            resolve([200, "Profile Updated Successfully"]);
          } else {
            reject([400, "Something wrong for edit profile"]);
          }
        } else {
          reject([400, "Invalid Token !!"]);
        }
      });
    });
  });

  mock.onPost("/post-fake-profile").reply((config) => {
    const user = JSON.parse(config["data"]);

    const validUser = admindetails.filter((usr) => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          let objIndex;

          //Find index of specific object using findIndex method.
          objIndex = admindetails.findIndex((obj) => obj.uid === user.idx);

          //Update object's name property.
          admindetails[objIndex].username = user.username;

          // Assign a value to locastorage
          localStorage.removeItem("authUser");
          localStorage.setItem(
            "authUser",
            JSON.stringify(admindetails[objIndex])
          );

          resolve([200, "Profile Updated Successfully"]);
        } else {
          reject([400, "Something wrong for edit profile"]);
        }
      });
    });
  });

  mock.onPost("/jwt-forget-pwd").reply((config) => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost("/social-login").reply((config) => {
    const user = JSON.parse(config["data"]);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.token) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;
          const userName = user.name;

          // JWT AccessToken
          const tokenObj = { accessToken: token, username: userName }; // Token Obj
          const validUserObj = { ...user[0], ...tokenObj, ...user.name }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  // mock.onGet(url.GET_USERS).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (members) {
  //         // Passing fake JSON data as response
  //         console.log("users on mock:" + JSON.stringify(members));
  //         resolve([200, members]);
  //       } else {
  //         reject([400, "Cannot get users"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_CUSTOMERUSERS).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (custusers) {
  //         // Passing fake JSON data as response
  //         // resolve([200, custusers]);
  //       } else {
  //         reject([400, "Cannot get Customer users"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_GROUPPOLICY).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (gppolicy) {
  //         // Passing fake JSON data as response

  //         resolve([200, gppolicy]);
  //       } else {
  //         reject([400, "Cannot get Group Policy"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_DESIGNATION).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (designation) {
  //         // Passing fake JSON data as response

  //         resolve([200, designation]);
  //       } else {
  //         reject([400, "Cannot get Designation List"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_NOTIFICATIONTEMPLATE).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (notemplate) {
  //         // Passing fake JSON data as response

  //         resolve([200, notemplate]);
  //       } else {
  //         reject([400, "Cannot get NotificationTemplate"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_SCHEDULECUSTOMERNOTIFICATION).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (schCusNotification) {
  //         // Passing fake JSON data as response
  //         resolve([200, schCusNotification]);
  //       } else {
  //         reject([400, "Cannot get Schedule Customer Notification"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_BROADCASTER).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (broadcast) {
  //         // Passing fake JSON data as response
  //         resolve([200, broadcast]);
  //       } else {
  //         reject([400, "Cannot get BroadCaster List"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_GENRELIST).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (genre) {
  //         // Passing fake JSON data as response

  //         resolve([200, genre]);
  //       } else {
  //         reject([400, "Cannot get Genre list"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_LANGUAGELIST).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (langlist) {
  //         // Passing fake JSON data as response
  //         console.log("langlist:" + JSON.stringify(langlist));
  //         resolve([200, langlist]);
  //       } else {
  //         reject([400, "Cannot get Language list"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_CHANNELLIST).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (channel) {
  //         resolve([200, channel]);
  //       } else {
  //         reject([400, "Cannot get Channel list"]);
  //       }
  //     });
  //   });
  // });

  mock.onGet(url.GET_BROADCASTERBOUQUETLIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (broadcastbouquet) {
          resolve([200, broadcastbouquet]);
        } else {
          reject([400, "Cannot get Broadcaster Bouquet list"]);
        }
      });
    });
  });

  mock.onGet(url.GET_PACKAGELIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (packlist) {
          resolve([200, packlist]);
        } else {
          reject([400, "Cannot get Package list"]);
        }
      });
    });
  });

  mock.onGet(url.GET_OSDCONFIGURATIONLIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (osdconfig) {
          resolve([200, osdconfig]);
        } else {
          reject([400, "Cannot get Osd configuration list"]);
        }
      });
    });
  });

  mock.onGet(url.GET_LOCALCHANNELNUMBER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (localnum) {
          resolve([200, localnum]);
        } else {
          reject([400, "Cannot get Local Channel Number list"]);
        }
      });
    });
  });

  mock.onGet(url.GET_OSDTEMPLATE).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (osdtem) {
          resolve([200, osdtem]);
        } else {
          reject([400, "Cannot get Osd template list"]);
        }
      });
    });
  });

  mock.onGet(url.GET_DOCUMENTUPLOADPOLICY).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (documentupload) {
          resolve([200, documentupload]);
        } else {
          reject([400, "Cannot get Document Upload Policy list"]);
        }
      });
    });
  });

  mock.onGet(url.GET_REGIONALOFFICE).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (regOff) {
          // Passing fake JSON data as response

          resolve([200, regOff]);
        } else {
          reject([400, "Cannot get Regional office list"]);
        }
      });
    });
  });

  // mock.onGet(url.GET_STATEUSERS).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (stateUser) {
  //         // Passing fake JSON data as response
  //         resolve([200, stateUser]);
  //       } else {
  //         reject([400, "Cannot get State User List"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_CITY).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (cits) {
  //         // Passing fake JSON data as response
  //         resolve([200, cits]);
  //       } else {
  //         reject([400, "Cannot get City User List"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_LOCATION).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (locations) {
  //         // Passing fake JSON data as response
  //         resolve([200, locations]);
  //       } else {
  //         reject([400, "Cannot get Location List"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_SUBLOCATION).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (subloc) {
  //         // Passing fake JSON data as response
  //         resolve([200, subloc]);
  //       } else {
  //         reject([400, "Cannot get Sub Location List"]);
  //       }
  //     });
  //   });
  // });

  mock.onGet(url.GET_DISTRIBUTORS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (distributor) {
          // Passing fake JSON data as response
          resolve([200, distributor]);
        } else {
          reject([400, "Cannot get State User List"]);
        }
      });
    });
  });

  // mock.onGet(url.GET_DISTRICT).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (disTrict) {
  //         // Passing fake JSON data as response
  //         resolve([200, disTrict]);
  //       } else {
  //         reject([400, "Cannot get District List"]);
  //       }
  //     });
  //   });
  // });

  mock.onGet(url.GET_LCO).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (lcos) {
          // Passing fake JSON data as response
          resolve([200, lcos]);
        } else {
          reject([400, "Cannot get District List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_APPADBANNER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (appAdvertiseBan) {
          // Passing fake JSON data as response
          resolve([200, appAdvertiseBan]);
        } else {
          reject([400, "Cannot get appAdvertiseBanner List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_USERHIERARCHY).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userHier) {
          // Passing fake JSON data as response
          resolve([200, userHier]);
        } else {
          reject([400, "Cannot get user hierarchy List"]);
        }
      });
    });
  });

  // mock.onGet(url.GET_NCF).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (ncfl) {
  //         // Passing fake JSON data as response
  //         resolve([200, ncfl]);
  //       } else {
  //         reject([400, "Cannot get NCF List"]);
  //       }
  //     });
  //   });
  // });

  mock.onGet(url.GET_SCHEDULEDNOTIFICATION).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (schedulednotify) {
          // Passing fake JSON data as response
          resolve([200, schedulednotify]);
        } else {
          reject([400, "Cannot get scheduled notification List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_COMPANYLIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (company) {
          // Passing fake JSON data as response
          resolve([200, company]);
        } else {
          reject([400, "Cannot get Company List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_BRANDLIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (brand) {
          // Passing fake JSON data as response
          resolve([200, brand]);
        } else {
          reject([400, "Cannot get Brand List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_WAREHOUSELIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (warehouse) {
          // Passing fake JSON data as response
          resolve([200, warehouse]);
        } else {
          reject([400, "Cannot get Warehouse List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_INVENTORYSTATELIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (inventstate) {
          // Passing fake JSON data as response
          resolve([200, inventstate]);
        } else {
          reject([400, "Cannot get Inventory State List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_ADMINDETAILS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (admindetails) {
          // Passing fake JSON data as response
          resolve([200, admindetails]);
        } else {
          reject([400, "Cannot get Admin Details"]);
        }
      });
    });
  });
  mock.onGet(url.GET_SMSMESSAGETEMPLIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (smsmsg) {
          // Passing fake JSON data as response
          resolve([200, smsmsg]);
        } else {
          reject([400, "Cannot get SMS Msg Temp List"]);
        }
      });
    });
  });

  // mock.onGet(url.GET_BOUQUET).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (bouquets) {
  //         // Passing fake JSON data as response
  //         resolve([200, bouquets]);
  //       } else {
  //         reject([400, "Cannot get Bouquet List"]);
  //       }
  //     });
  //   });
  // });

  // mock.onGet(url.GET_COMPLAINTCATEGORY).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (complaintcate) {
  //         // Passing fake JSON data as response
  //         resolve([200, complaintcate]);
  //       } else {
  //         reject([400, "Cannot get complaint category List"]);
  //       }
  //     });
  //   });
  // });

  mock.onGet(url.GET_COMPLAINTSUBCATEGORY).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (complaintsubcate) {
          // Passing fake JSON data as response
          resolve([200, complaintsubcate]);
        } else {
          reject([400, "Cannot get complaint sub category List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CONFIGURATIONUPLOADLOGS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (configuplog) {
          // Passing fake JSON data as response
          resolve([200, configuplog]);
        } else {
          reject([400, "Cannot get configuration upload logs"]);
        }
      });
    });
  });

  mock.onGet(url.GET_TAX).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (taxes) {
          // Passing fake JSON data as response
          resolve([200, taxes]);
        } else {
          reject([400, "Cannot get Tax list"]);
        }
      });
    });
  });

  mock.onGet(url.GET_REASON).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (reasons) {
          // Passing fake JSON data as response
          resolve([200, reasons]);
        } else {
          reject([400, "Cannot get Reason List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_BANK).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (banks) {
          // Passing fake JSON data as response
          resolve([200, banks]);
        } else {
          reject([400, "Cannot get Bank list"]);
        }
      });
    });
  });

  mock.onGet(url.GET_PROMOVOUCHER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (provoucher) {
          // Passing fake JSON data as response
          resolve([200, provoucher]);
        } else {
          reject([400, "Cannot get Promo voucher list"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CONNECTIONSCHEME).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (connectscheme) {
          // Passing fake JSON data as response
          resolve([200, connectscheme]);
        } else {
          reject([400, "Cannot get Connection scheme List"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_USER).reply((user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot add user"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_GROUPPOLICY).reply((groupPolicy) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (groupPolicy && groupPolicy.data) {
          // Passing fake JSON data as response
          resolve([200, groupPolicy.data]);
        } else {
          reject([400, "Cannot add Group Policy"]);
        }
      });
    });
  });

  // mock.onPost(url.ADD_NEW_DESIGNATION).reply((designation) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (designation && designation.data) {
  //         // Passing fake JSON data as response
  //         resolve([200, designation.data]);
  //       } else {
  //         reject([400, "Cannot add designation"]);
  //       }
  //     });
  //   });
  // });

  // mock.onPost(url.ADD_NEW_NOTIFICATIONTEMPLATE).reply((notemplate) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (notemplate && notemplate.data) {
  //         // Passing fake JSON data as response
  //         resolve([200, notemplate.data]);
  //       } else {
  //         reject([400, "Cannot add Notification Template"]);
  //       }
  //     });
  //   });
  // });

  mock.onPost(url.ADD_NEW_COMPLAINTCATEGORY).reply((complaint) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (complaint && complaint.data) {
          // Passing fake JSON data as response
          resolve([200, complaint.data]);
        } else {
          reject([400, "Cannot add Complaint Category"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_COMPLAINTSUBCATEGORY).reply((complaintsubcate) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (complaintsubcate && complaintsubcate.data) {
          // Passing fake JSON data as response
          resolve([200, complaintsubcate.data]);
        } else {
          reject([400, "Cannot add Complaint Sub Category"]);
        }
      });
    });
  });

  mock
    .onPost(url.ADD_NEW_SCHEDULECUSTOMERNOTIFICATION)
    .reply((schCusNotification) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (schCusNotification && schCusNotification.data) {
            // Passing fake JSON data as response
            resolve([200, schCusNotification.data]);
          } else {
            reject([400, "Cannot add Schedule Customer Notification Template"]);
          }
        });
      });
    });
  mock.onPost(url.ADD_USERHIERARCHY).reply((userHierarchy) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userHierarchy && userHierarchy.data) {
          // Passing fake JSON data as response
          resolve([200, userHierarchy.data]);
        } else {
          reject([400, "Cannot add User hierarchy"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_APPADBANNER).reply((appadbanner) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (appadbanner && appadbanner.data) {
          // Passing fake JSON data as response
          resolve([200, appadbanner.data]);
        } else {
          reject([400, "Cannot add app ad banner list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_DISTRICT).reply((district) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (district && district.data) {
          // Passing fake JSON data as response
          resolve([200, district.data]);
        } else {
          reject([400, "Cannot add district list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_CITY).reply((city) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (city && city.data) {
          // Passing fake JSON data as response
          resolve([200, city.data]);
        } else {
          reject([400, "Cannot add city list"]);
        }
      });
    });
  });

  // mock.onPost(url.ADD_LOCATION).reply((location) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (location && location.data) {
  //         // Passing fake JSON data as response
  //         resolve([200, location.data]);
  //       } else {
  //         reject([400, "Cannot add location list"]);
  //       }
  //     });
  //   });
  // });

  // mock.onPost(url.ADD_SUBLOCATION).reply((sublocation) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (sublocation && sublocation.data) {
  //         // Passing fake JSON data as response
  //         resolve([200, sublocation.data]);
  //       } else {
  //         reject([400, "Cannot add sublocation list"]);
  //       }
  //     });
  //   });
  // });

  mock
    .onPost(url.ADD_NEW_SCHEDULECUSTOMERNOTIFICATION)
    .reply((schedulecustomernotification) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            schedulecustomernotification &&
            schedulecustomernotification.data
          ) {
            // Passing fake JSON data as response
            resolve([200, schedulecustomernotification.data]);
          } else {
            reject([400, "Cannot add schedulecustomernotification"]);
          }
        });
      });
    });

  mock.onPost(url.ADD_NEW_BROADCASTER).reply((broadcast) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (broadcast && broadcast.data) {
          // Passing fake JSON data as response
          resolve([200, broadcast.data]);
        } else {
          reject([400, "Cannot add broadcaster"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_GENRELIST).reply((genre) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (genre && genre.data) {
          // Passing fake JSON data as response
          resolve([200, genre.data]);
        } else {
          reject([400, "Cannot add genrelist"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_BROADCASTERBOUQUETLIST).reply((broadcastbouquet) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (broadcastbouquet && broadcastbouquet.data) {
          // Passing fake JSON data as response
          resolve([200, broadcastbouquet.data]);
        } else {
          reject([400, "Cannot add broadcastbouquet list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_CHANNELLIST).reply((channel) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (channel && channel.data) {
          // Passing fake JSON data as response
          resolve([200, channel.data]);
        } else {
          reject([400, "Cannot add channellist"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TAXLIST).reply((taxes) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (taxes && taxes.data) {
          // Passing fake JSON data as response
          resolve([200, taxes.data]);
        } else {
          reject([400, "Cannot add tax list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_BANK).reply((banks) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (banks && banks.data) {
          // Passing fake JSON data as response
          resolve([200, banks.data]);
        } else {
          reject([400, "Cannot add bank list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_PROMOVOUCHER).reply((provoucher) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (provoucher && provoucher.data) {
          // Passing fake JSON data as response
          resolve([200, provoucher.data]);
        } else {
          reject([400, "Cannot add provoucher list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_COMPLAINTCATEGORY).reply((complaintcate) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (complaintcate && complaintcate.data) {
          // Passing fake JSON data as response
          resolve([200, complaintcate.data]);
        } else {
          reject([400, "Cannot add complaint cate list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_REASON).reply((taxes) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (reasons && reasons.data) {
          // Passing fake JSON data as response
          resolve([200, reasons.data]);
        } else {
          reject([400, "Cannot add Reason list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_PACKAGELIST).reply((packlist) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (packlist && packlist.data) {
          // Passing fake JSON data as response
          resolve([200, packlist.data]);
        } else {
          reject([400, "Cannot add Packagelist"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_OSDCONFIGURATIONLIST).reply((osdconfig) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (osdconfig && osdconfig.data) {
          // Passing fake JSON data as response
          resolve([200, osdconfig.data]);
        } else {
          reject([400, "Cannot add OsdConfiguartion"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_DOCUMENTUPLOADPOLICY).reply((documentupload) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (documentupload && documentupload.data) {
          // Passing fake JSON data as response
          resolve([200, documentupload.data]);
        } else {
          reject([400, "Cannot add documentupload"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_LANGUAGELIST).reply((langlist) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (langlist && langlist.data) {
          // Passing fake JSON data as response
          resolve([200, langlist.data]);
        } else {
          reject([400, "Cannot add languagelist"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_OSDTEMPLATE).reply((osdtem) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (osdtem && osdtem.data) {
          // Passing fake JSON data as response
          resolve([200, osdtem.data]);
        } else {
          reject([400, "Cannot add osdtemplate"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_REGIONALOFFICE).reply((regionaloffice) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (regionaloffice && regionaloffice.data) {
          // Passing fake JSON data as response
          resolve([200, regionaloffice.data]);
        } else {
          reject([400, "Cannot add Regional Office"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_REGIONALOFFICE).reply((refOff) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (refOff && refOff.data) {
          // Passing fake JSON data as response
          resolve([200, refOff.data]);
        } else {
          reject([400, "Cannot update Regional Office"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_DISTRIBUTOR).reply((distributor) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (distributor && distributor.data) {
          // Passing fake JSON data as response
          resolve([200, distributor.data]);
        } else {
          reject([400, "Cannot add Distributor"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_BRANDLIST).reply((brandlist) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (brandlist && brandlist.data) {
          // Passing fake JSON data as response
          resolve([200, brandlist.data]);
        } else {
          reject([400, "Cannot add Brand list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_WAREHOUSELIST).reply((warehouselist) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (warehouselist && warehouselist.data) {
          // Passing fake JSON data as response
          resolve([200, warehouselist.data]);
        } else {
          reject([400, "Cannot add warehouse list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_INVENTORYSTATELIST).reply((inventorystatelist) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (inventorystatelist && inventorystatelist.data) {
          // Passing fake JSON data as response
          resolve([200, inventorystatelist.data]);
        } else {
          reject([400, "Cannot add Inventory state list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NCF).reply((ncf) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (ncf && ncf.data) {
          // Passing fake JSON data as response
          resolve([200, ncf.data]);
        } else {
          reject([400, "Cannot add NCF list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_BOUQUET).reply((bouquet) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (bouquet && bouquet.data) {
          // Passing fake JSON data as response
          resolve([200, bouquet.data]);
        } else {
          reject([400, "Cannot add Bouquet list"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_CONNECTIONSCHEME).reply((connectionscheme) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (connectionscheme && connectionscheme.data) {
          // Passing fake JSON data as response
          resolve([200, connectionscheme.data]);
        } else {
          reject([400, "Cannot add connection scheme list"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_DISTRIBUTOR).reply((distributor) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (distributor && distributor.data) {
          // Passing fake JSON data as response
          resolve([200, distributor.data]);
        } else {
          reject([400, "Cannot update Distributor"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_LCO).reply((lco) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (lco && lco.data) {
          // Passing fake JSON data as response
          resolve([200, lco.data]);
        } else {
          reject([400, "Cannot add LCO"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_LCO).reply((lco) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (lco && lco.data) {
          // Passing fake JSON data as response
          resolve([200, lco.data]);
        } else {
          reject([400, "Cannot update LCO"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_USER).reply((regionaloffice) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (regionaloffice && regionaloffice.data) {
          // Passing fake JSON data as response
          resolve([200, regionaloffice.data]);
        } else {
          reject([400, "Cannot update Regional Office"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_USER).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.user]);
        } else {
          reject([400, "Cannot delete user"]);
        }
      });
    });
  });
};

export default fakeBackend;
