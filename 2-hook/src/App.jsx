// const App = () => <>2-hook</>;

// export default App;

import MyReact from "./lib/MyReact";

export default function NameField() {
  const [firstName, setFirstName] = MyReact.useState(0, "사용자1");
  const [lastName, setLastName] = MyReact.useState(1, "김");

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  return (
    <>
      <input value={firstName} onChange={handleChangeFirstName} />
      <input value={lastName} onChange={handleChangeLastName} />
    </>
  );
}
