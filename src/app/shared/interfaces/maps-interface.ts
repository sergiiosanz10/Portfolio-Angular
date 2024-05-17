export interface Province {
  total_count: number;
  results:     Result[];
}

export interface Result {
  acom_name: string;
  prov_name: string;
  mun_name:  string;
  geo_point_2d: GeoPoint2D;
}
export interface GeoPoint2D {
  lon: number;
  lat: number;
}
