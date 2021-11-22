import Cookie from "universal-cookie";
let cookies = new Cookie();
const createCookies = (data) => {
  if (data) {
    cookies.set("userPayLoad", data.loginDetails.headers, {
      sameSite: "strict",
      path: "/",
      expires: new Date(new Date().getTime() + 100000 * 10000),
    });

    cookies.set("userData", data.loginDetails.userDetails, {
      sameSite: "strict",
      path: "/",
      expires: new Date(new Date().getTime() + 100000 * 10000),
    });

    cookies.set("signature", data.loginDetails.signature, {
      sameSite: "strict",
      path: "/",
      expires: new Date(new Date().getTime() + 100000 * 10000),
    });

    if (
      cookies.get("userPayLoad") &&
      cookies.get("userData") &&
      cookies.get("signature")
    ) {
      return true;
    } else {
      return false;
    }
  }
};

export default createCookies;
