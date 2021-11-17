import Cookie from "universal-cookie";

export let getUserDAta = () => {
  let cookie = new Cookie();
  let userData = cookie.get("userData");
  return userData;
};

export let userLogout = () => {
  let cookie = new Cookie();
  cookie.remove("userData");
  cookie.remove("userPayLoad");
  cookie.remove("signature");

  if (
    !cookie.get("userData") &&
    !cookie.get("userPayLoad") &&
    !cookie.get("signature")
  ) {
    return true;
  } else {
    return false;
  }
};
