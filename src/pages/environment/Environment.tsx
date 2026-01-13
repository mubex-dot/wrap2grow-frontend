import PageHeader from "@/components/PageHeader";
import temperatureIcon from "@/assets/icons/temperature-icon.svg";
import humidityIcon from "@/assets/icons/humidity-icon.svg";
import windIcon from "@/assets/icons/wind-icon.svg";
import rainIcon from "@/assets/icons/rain-icon.svg";
import { useGetWeatherInfoQuery } from "@/apis/wrapApi";
import LinearProgress from "@/components/LinearProgress";

const Environment = () => {
  const { data: weatherInfo, isLoading: isGettingWeatherInfo } =
    useGetWeatherInfoQuery();

  const cardData = [
    {
      id: 1,
      header: "Temperature",
      value: weatherInfo?.data?.current?.temp_c || 0,
      measurement_scale: "°C",
      icon: temperatureIcon,
    },
    {
      id: 2,
      header: "Humidity",
      value: weatherInfo?.data?.current?.humidity || 0,
      measurement_scale: "%",
      icon: humidityIcon,
    },
    {
      id: 3,
      header: "Wind Speed",
      value: weatherInfo?.data?.current?.wind_kph || 0,
      measurement_scale: "kph",
      icon: windIcon,
    },
    {
      id: 4,
      header: "Precipitation",
      value: weatherInfo?.data?.current?.precip_mm || 0,
      measurement_scale: "mm",
      icon: rainIcon,
    },
  ];

  return (
    <div>
      {isGettingWeatherInfo && <LinearProgress />}

      <PageHeader
        header={"Environmental Monitoring"}
        subHeader={"Track weather conditions"}
      />

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {cardData.map((item) => (
            <div
              className="border-2 border-[#1B984933] bg-[#1B98490D] px-10 py-7 rounded-lg flex justify-between"
              key={item.id}
            >
              <div className="flex flex-col gap-2">
                <p>{item.header}</p>
                <h3 className="font-bold">
                  {item.value}
                  {item.measurement_scale}
                </h3>
                {/* <p className="text-primary">{item.sideText}</p> */}
              </div>
              <div>
                <img src={item.icon} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Environment;
