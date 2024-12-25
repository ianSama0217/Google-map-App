import "./index.scss";
import { types } from "./searchProps";
import imgDown from "../../../public/img/down.png";
import { useState } from "react";

type PlaceType = {
  name: string;
  value: string;
};

type SearchProps = {
  value: string;
  radius: string;
};

type Props = {
  onSearch: (data: SearchProps) => void;
};

function SearchBar({ onSearch }: Props) {
  const [radius, setRadius] = useState("");
  const [current, setCurrent] = useState(types[0]);
  const [visible, setVisible] = useState(false);

  const handleOptionClick = (placeType: PlaceType) => {
    setCurrent(placeType);
    setVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (+value || value === "") {
      setRadius(value);
    }
  };

  const handleSearch = () => {
    onSearch({
      value: current.value,
      radius: radius,
    });
  };

  return (
    <div className="search z-10 bg-white rounded-xl flex justify-center items-center shadow-outer">
      <div
        onClick={() => {
          setVisible(true);
        }}
      >
        {current.name}
      </div>
      <div className="ml-1">
        <img src={imgDown} />
      </div>
      <div className="ml-2" style={{ color: "#c4c7ce" }}>
        |
      </div>
      <input
        className="search-type w-40 ml-2"
        type="text"
        onChange={handleChange}
        value={radius}
        placeholder="請輸入搜尋距離(公尺)"
      />
      <div
        className="search-btn ml-5 w-16 h-8 text-center leading-8 rounded-3xl"
        onClick={handleSearch}
      >
        搜尋
      </div>
      {visible && (
        <div className="search-select-more w-full h-44 absolute translate-y-32 rounded-xl bg-white">
          {types.map((item: PlaceType, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  handleOptionClick(item);
                }}
                style={{
                  color: item.value === current.value ? "#9a53f4" : "#707479",
                }}
                className="search-select-option ml-4 h-10 leading-10"
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
