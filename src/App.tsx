import { useState } from "react";
import Map from "./components/map";
import OpenScreen from "./components/openScreen";
import SearchBar from "./components/searchBar";

function App() {
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setVisible(false);
  };

  return (
    <div className="h-screen">
      {visible && <OpenScreen onClick={handleClick} />}
      <Map />
      <SearchBar
        onSearch={(data) => {
          console.log("search data", data);
        }}
      />
    </div>
  );
}

export default App;
