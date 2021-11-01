import Cookie from "universal-cookie";

export let getUserDAta = () => {
  let cookie = new Cookie();
  let userData = cookie.get("userData");
  return userData;
};
