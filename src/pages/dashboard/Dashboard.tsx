import wrapsIcon from "@/assets/icons/wraps-icon.svg";
import degradingIcon from "@/assets/icons/degrading-icon.svg";
// import moistureIcon from "@/assets/icons/moisture-icon.svg";
import temperatureIcon from "@/assets/icons/temperature-icon.svg";
import { useGetWeatherInfoQuery, useGetWrapsQuery } from "@/apis/wrapApi";
import LinearProgress from "@/components/LinearProgress";

const Dashboard = () => {
  const { data: weatherInfo, isLoading: isGettingWeatherInfo } =
    useGetWeatherInfoQuery();
  const { data: wraps, isLoading: isGettingWraps } = useGetWrapsQuery();

  const cardData = [
    {
      id: 1,
      header: "Total Wraps Active",
      value: wraps?.data?.length || 0,
      metric: "",
      sideText: "+12% from last month",
      icon: wrapsIcon,
    },
    {
      id: 2,
      header: "Currently Degrading",
      value:
        wraps?.data?.filter((wrap) => wrap.wrap_status === "degrading")
          .length || 0,
      metric: "",
      sideText: "On schedule",
      icon: degradingIcon,
    },
    // {
    //   id: 3,
    //   header: "Soil Moisture",
    //   value: "68",
    //   metric: "%",
    //   sideText: "Optimal range",
    //   icon: moistureIcon,
    // },
    {
      id: 4,
      header: "Temperature",
      value: weatherInfo?.data?.current?.temp_c || 0,
      metric: "°C",
      sideText: "Favorable conditions",
      icon: temperatureIcon,
    },
  ];

  return (
    <div>
      {isGettingWeatherInfo || (isGettingWraps && <LinearProgress />)}
      <div>
        <div className="bg-[#1B9849E5] p-25 rounded-xl flex flex-col gap-4">
          <h1 className="text-white font-bold text-4xl">
            Welcome to Wrap2Grow
          </h1>
          <p className="text-white text-lg">
            Monitor your biodegradable wraps and track soil enrichment in
            real-time
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {cardData.map((item) => (
          <div
            className="border-2 border-[#E7E2DA] bg-[#FFFFFF] px-10 py-7 rounded-lg flex justify-between"
            key={item.id}
          >
            <div className="flex flex-col gap-2">
              <p>{item.header}</p>
              <h3 className="font-bold">
                {item.value}
                {item.metric}
              </h3>
              <p className="text-primary">{item.sideText}</p>
            </div>
            <div>
              <img src={item.icon} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
