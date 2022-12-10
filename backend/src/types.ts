/* eslint-disable @typescript-eslint/no-unused-vars */
interface drone {
  serialNumber: string;
  model: string;
  manufacturer: string;
  mac: string;
  ipv4: string;
  ipv6: string;
  firmware: string;
  positionY: number;
  positionX: number;
  altitude: number;
  distance?: number;
}

interface report {
  capture: {
    $: {
      snapshotTimestamp: string;
    };
    drone: drone[];
  };
  deviceInformation: deviceInformation;
}

interface deviceInformation {
  $: {
    deviceId: string;
  };
  listenRange: string;
  deviceStarted: string;
  uptimeSeconds: string;
  updateIntervalMs: string;
}
