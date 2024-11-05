// const App = () => <>2-hook</>;

// export default App;

import MyReact from "./lib/MyReact";

export default function NameField() {
  const [firstName, setFirstName] = MyReact.useName("사용자1");

  const handleChange = (e) => {
    setFirstName(e.target.value);
  };

  return <input value={firstName} onChange={handleChange} />;
}
