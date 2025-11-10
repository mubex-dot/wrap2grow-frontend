import logo from "@/assets/icons/connected-logo-dark.svg";
import planet from "@/assets/icons/planet.png";

const SideBanner = () => {
  return (
    <div className="bg-linear-to-b from-[#025692] to-[#011A2C] h-full w-full">
      <div className="p-12 flex flex-col justify-between items-center h-full">
        <img src={logo} alt="ConnectED Logo" />
        <div className="text-center">
          <h1 className="font-bold text-white">Welcome to ConnectED</h1>
          <h3 className="font-bold text-white">
            Bridging information gaps through AI
          </h3>
        </div>
        <img src={planet} alt="Planet" className="h-130" />
      </div>
    </div>
  );
};

export default SideBanner;
