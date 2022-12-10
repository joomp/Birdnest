export interface pilot {
  pilotId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdDt: string;
  email: string;
}

export interface infraction {
  serialNumber: string;
  manufacturer: string;
  model: string;
  snapshotTimestamp: string;
  distance: number;
  positionX: number;
  positionY: number;
}
