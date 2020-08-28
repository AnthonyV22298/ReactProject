
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userInfo');
    console.log("this is serializedState1" + serializedState)
    if (serializedState === null) {
      return console.log('state is null');
    }
    return console.log("this is in loadState2" + JSON.parse(serializedState));
  } catch (err) {
    return console.log("this is in the catch undefined");
  }
};


export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userInfo', serializedState);
    console.log("this is saveState" + serializedState);
} catch (error) {
    return console.log("error");
  }
};
