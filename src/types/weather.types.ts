export interface WeatherResponse {
  current: {
    humidity: number;
    precip_mm: number;
    raw: {
      cloud: number;
      condition: {
        code: number;
        icon: string;
        text: string;
      };
      dewpoint_c: number;
      dewpoint_f: number;
      diff_rad: number;
      dni: number;
      feelslike_c: number;
      feelslike_f: number;
      gti: number;
      gust_kph: number;
      gust_mph: number;
      heatindex_c: number;
      heatindex_f: number;
      humidity: number;
      is_day: number;
      last_updated: string;
      last_updated_epoch: number;
      precip_in: number;
      precip_mm: number;
      pressure_in: number;
      pressure_mb: number;
      short_rad: number;
      temp_c: number;
      temp_f: number;
      uv: number;
      vis_km: number;
      vis_miles: number;
      wind_degree: number;
      wind_dir: string;
      wind_kph: number;
      wind_mph: number;
      windchill_c: number;
      windchill_f: number;
    };
    temp_c: number;
    wind_kph: number;
    wind_ms: number;
  };
  location: {
    country: string;
    localtime: string;
    name: string;
    region: string;
    tz_id: string;
  };
  raw: {
    current: {
      cloud: number;
      condition: {
        code: number;
        icon: string;
        text: string;
      };
      dewpoint_c: number;
      dewpoint_f: number;
      diff_rad: number;
      dni: number;
      feelslike_c: number;
      feelslike_f: number;
      gti: number;
      gust_kph: number;
      gust_mph: number;
      heatindex_c: number;
      heatindex_f: number;
      humidity: number;
      is_day: number;
      last_updated: string;
      last_updated_epoch: number;
      precip_in: number;
      precip_mm: number;
      pressure_in: number;
      pressure_mb: number;
      short_rad: number;
      temp_c: number;
      temp_f: number;
      uv: number;
      vis_km: number;
      vis_miles: number;
      wind_degree: number;
      wind_dir: string;
      wind_kph: number;
      wind_mph: number;
      windchill_c: number;
      windchill_f: number;
    };
    location: {
      country: string;
      lat: number;
      localtime: string;
      localtime_epoch: number;
      lon: number;
      name: string;
      region: string;
      tz_id: string;
    };
  };
  requested_coords: {
    lat: number;
    lon: number;
  };
}
