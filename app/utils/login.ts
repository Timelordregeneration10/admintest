import axios from "axios";
import { error, success } from "./message";
import sha256 from "./sha256.js";
import Cookies from "js-cookie";

async function signUpClicked(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    // console.log(sha256(password));
    if (process.env.NEXT_PUBLIC_TEST === "test") {
      return "success";
    }
    let result = "failed";
    await axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/auth/register`, {
        email: email,
        password: sha256(password),
        firstname: firstName,
        lastname: lastName,
        role: "USER",
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          success("sign up successfully");
          result = "success";
        }
      })
      .catch((err: any) => {
        console.log("signup: ", err);
        error("Signup Error: " + err);
      });
    return result;
  } catch (err: any) {
    console.log("signup: ", err);
    error("Signup Error: " + err);
  }
}

async function signInClicked(email: string, password: string) {
  try {
    // console.log(sha256(password));
    if (process.env.NEXT_PUBLIC_TEST === "test") {
      return "success";
    }
    let result = "failed";
    await axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/auth/authenticate`, {
        email: email,
        password: sha256(password),
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          success("login successfully");
          Cookies.set(
            "admintestuserInfo",
            JSON.stringify({
              email: email,
              role: "USER",
            }),
            { expires: 90 }
          );
          Cookies.set("admintestAuthorization", res.data.access_token, {
            expires: 90,
          });
          result = "success";
        }
      })
      .catch((err: any) => {
        console.log("signin: ", err);
        error("Signin Error: " + err);
      });
    return result;
  } catch (err: any) {
    console.log("signin: ", err);
    error("Signin Error: " + err);
  }
}

async function logoutClicked() {
  if (process.env.NEXT_PUBLIC_TEST !== "test") {
    Cookies.remove("admintestuserInfo");
    Cookies.remove("admintestAuthorization");
  }
  if (process.env.NEXT_PUBLIC_TEST === "test") {
    window.location.href = "/admintest";
  } else {
    window.location.href = "/";
  }
}

export { logoutClicked, signUpClicked, signInClicked };
