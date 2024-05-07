export interface Province {
  total_count: number;
  results:     Result[];
}

export interface Result {
  acom_name: string;
  prov_name: string;
}
