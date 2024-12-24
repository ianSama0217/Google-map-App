import "./index.scss";
import imgScreenBuilding from "../../../public/img/screen_building.png";

type props = {
  onClick: () => void;
};

function OpenScreen({ onClick }: props) {
  return (
    <div className="open-screen fixed w-full z-20 flex flex-col items-center  h-full bg-origin-padding overflow-hidden">
      <img className="mt-36 " src={imgScreenBuilding} />
      <div className="app-name text-white">Map App</div>
      <div
        className="begin text-center border text-white mt-7"
        onClick={() => {
          onClick();
        }}
      >
        開始使用
      </div>
    </div>
  );
}

export default OpenScreen;
