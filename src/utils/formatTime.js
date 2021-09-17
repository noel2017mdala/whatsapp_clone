const formatTime = (timeString) => {
  let test = [...timeString][0];

  if (timeString) {
    let splitTimeString = test.split(":");
    return `${splitTimeString[0]}:${splitTimeString[1]}`;
  }
};

export default formatTime;
