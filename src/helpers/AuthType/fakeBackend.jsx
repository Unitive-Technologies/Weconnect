import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";
import accessToken from "../jwt-token-access/accessToken";
import {
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
} from "../../common/data";
let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    // email: "admin@themesbrand.com",
    email: "admin",
  },
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

  mock.onPost(url.POST_FAKE_REGISTER).reply((config) => {
    const user = JSON.parse(config["data"]);
    users.push(user);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-fake-login").reply((config) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
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
    users.push(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-login").reply((config) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
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

    const validUser = users.filter((usr) => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validUser["length"] === 1) {
            let objIndex;

            //Find index of specific object using findIndex method.
            objIndex = users.findIndex((obj) => obj.uid === user.idx);

            //Update object's name property.
            users[objIndex].username = user.username;

            // Assign a value to locastorage
            localStorage.removeItem("authUser");
            localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

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

    const validUser = users.filter((usr) => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          let objIndex;

          //Find index of specific object using findIndex method.
          objIndex = users.findIndex((obj) => obj.uid === user.idx);

          //Update object's name property.
          users[objIndex].username = user.username;

          // Assign a value to locastorage
          localStorage.removeItem("authUser");
          localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

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

  mock.onGet(url.GET_USERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (members) {
          // Passing fake JSON data as response
          console.log("users on mock:" + JSON.stringify(members));
          resolve([200, members]);
        } else {
          reject([400, "Cannot get users"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CUSTOMERUSERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (custusers) {
          // Passing fake JSON data as response
          resolve([200, custusers]);
        } else {
          reject([400, "Cannot get Customer users"]);
        }
      });
    });
  });

  mock.onGet(url.GET_GROUPPOLICY).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (gppolicy) {
          // Passing fake JSON data as response

          resolve([200, gppolicy]);
        } else {
          reject([400, "Cannot get Group Policy"]);
        }
      });
    });
  });

  mock.onGet(url.GET_DESIGNATION).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (designation) {
          // Passing fake JSON data as response

          resolve([200, designation]);
        } else {
          reject([400, "Cannot get Designation List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_NOTIFICATIONTEMPLATE).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (notemplate) {
          // Passing fake JSON data as response

          resolve([200, notemplate]);
        } else {
          reject([400, "Cannot get NotificationTemplate"]);
        }
      });
    });
  });

  mock.onGet(url.GET_SCHEDULECUSTOMERNOTIFICATION).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (schCusNotification) {
          // Passing fake JSON data as response
          resolve([200, schCusNotification]);
        } else {
          reject([400, "Cannot get Schedule Customer Notification"]);
        }
      });
    });
  });

  mock.onGet(url.GET_BROADCASTER).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (broadcast) {
          // Passing fake JSON data as response
          resolve([200, broadcast]);
        } else {
          reject([400, "Cannot get BroadCaster List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_GENRELIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (genre) {
          // Passing fake JSON data as response

          resolve([200, genre]);
        } else {
          reject([400, "Cannot get Genre list"]);
        }
      });
    });
  });

  mock.onGet(url.GET_LANGUAGELIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (langlist) {
          // Passing fake JSON data as response
          console.log("langlist:" + JSON.stringify(langlist));
          resolve([200, langlist]);
        } else {
          reject([400, "Cannot get Language list"]);
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

  mock.onGet(url.GET_STATEUSERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (stateUser) {
          // Passing fake JSON data as response
          resolve([200, stateUser]);
        } else {
          reject([400, "Cannot get State User List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CITY).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cits) {
          // Passing fake JSON data as response
          resolve([200, cits]);
        } else {
          reject([400, "Cannot get City User List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_LOCATION).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (locations) {
          // Passing fake JSON data as response
          resolve([200, locations]);
        } else {
          reject([400, "Cannot get Location List"]);
        }
      });
    });
  });

  mock.onGet(url.GET_SUBLOCATION).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (subloc) {
          // Passing fake JSON data as response
          resolve([200, subloc]);
        } else {
          reject([400, "Cannot get Sub Location List"]);
        }
      });
    });
  });

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

  mock.onGet(url.GET_DISTRICT).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (disTrict) {
          // Passing fake JSON data as response
          resolve([200, disTrict]);
        } else {
          reject([400, "Cannot get District List"]);
        }
      });
    });
  });

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
};

export default fakeBackend;
