import Cookie from "universal-cookie";
const cookies = new Cookie();
export const generateToken = () => {
  const userPayLoad = cookies.get("userPayLoad");
  const signature = cookies.get("signature");
  //   console.log(`${userPayLoad.header}.${userPayLoad.payload}.${signature}`);
  return `${userPayLoad.header}.${userPayLoad.payload}.${signature}`;
};
