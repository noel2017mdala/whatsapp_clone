import Cookie from "universal-cookie";
let cookies = new Cookie();
const createCookies = (data) => {
  if (data) {
    cookies("userPayLoad", data.headers, {
      sameSite: "strict",
      secure: true,
      path: "/",
      expires: new Date(new Date().getTime() + 100000 * 10000),
    });

    cookie("userData", data.userDetails, {
      sameSite: "strict",
      secure: true,
      path: "/",
      expires: new Date(new Date().getTime() + 100000 * 10000),
    });

    cookie("signature", signature, {
      sameSite: "none",
      secure: true,
      path: "/",
      expires: new Date(new Date().getTime() + 100000 * 10000),
      httpOnly: true,
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
