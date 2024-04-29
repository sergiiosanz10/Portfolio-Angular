export interface CityAutocomplete {
  name:        string;
  local_names: LocalNames;
  lat:         number;
  lon:         number;
  country:     string;
  state?:      string;
}

export interface LocalNames {
  ru?: string;
  el?: string;
  fr?: string;
  ja?: string;
  oc?: string;
  mk?: string;
}
