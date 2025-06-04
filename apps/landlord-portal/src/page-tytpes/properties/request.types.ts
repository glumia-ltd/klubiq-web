// ... existing code ...

export interface PropertyAddress {
    addressLine1: string;
    addressLine2: string;
    unit: string;
    city: string;
    state: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    country: string;
    isManualAddress: boolean;
  }
  
  export interface PropertyImage {
    isMain: boolean; // mapped to favorited image. If none is favorited, the first image is the main image
    fileSize: number;
    url: string;
    unitNumber?: string;
    id?: number;
    externalId: string;
    fileName: string; // use a uuid for the file name
  }
  
  export interface UnitArea {
    value: number;
    unit: string;
  }
  
  export interface PropertyUnit {
    id: string;
    unitNumber: string;
    rentAmount: number;
    floor: number;
    bedrooms: number;
    bathrooms: number;
    toilets: number;
    area: UnitArea;
    status: string;
    rooms: number;
    offices: number;
    images: PropertyImage[];
    amenities: string[];
  }
  
  export interface Property {
    customAmenities?: string[];
    address: PropertyAddress;
    categoryId: number;
    description: string;
    images: PropertyImage[];
    isMultiUnit: boolean;
    managerUid?: string;
    name: string;
    note?: string;
    ownerUid?: string;
    purposeId: number;
    statusId?: number;
    tags?: string[];
    typeId: number;
    units: PropertyUnit[];
    orgUuid?: string;
    sellingPrice?: number;
    marketValue?: number;
  }