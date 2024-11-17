import MyReact from "../lib/MyReact";

export default function LectureReducer() {
  function reducer(state, action) {
    if (action.type === "count") {
      return { ...state, value: state.value + 1 };
    }

    throw "알 수 없는 액션";
  }

  const initialValue = { value: 0 };
  const store = MyReact.createStore(reducer, initialValue);

  console.log("after createStore", store.getState());

  store.subscribe(() => console.log(store.getState()));
  store.dispatch({ type: "count" });

  return <div>Lecture Reducer</div>;
}
