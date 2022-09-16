export interface LatLng {
  lat: any;
  lng: any;
}
export interface LocationInfoObject {
  coordinates: {
    lat: number;
    lng: number;
  };
  address: {
    city: any | undefined | null;
    unit?: any | undefined | null;
    state: any | undefined | null;
    country?: any | undefined | null;
    postalCode: any | undefined | null;
    formattedAddress: any | undefined | null;
  };
}
