import Cookie from "universal-cookie";
let cookies = new Cookie();
const createCookies = (data) => {
  if (data) {
    cookies("userPayLoad", data.headers, {
      sameSite: "strict",
      path: "/",
      expires: new Date(new Date().getTime() + 100000 * 10000),
    });

    cookies("userData", data.userDetails, {
      sameSite: "strict",
      path: "/",
      expires: new Date(new Date().getTime() + 100000 * 10000),
    });

    cookies("signature", data.signature, {
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
