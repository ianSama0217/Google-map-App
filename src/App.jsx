import { useState } from "react";
import OpenScreen from "./components/OpenScreen";
import Search from "./components/Search";

function App() {
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setVisible(false);
  };

  return (
    <div className="h-screen">
      {visible && <OpenScreen onClick={handleClick} />}
      <Search
        onSearch={(data) => {
          console.log("data", data);
        }}
      />
    </div>
  );
}

export default App;
