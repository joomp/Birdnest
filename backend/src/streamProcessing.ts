import {getReport} from './services/droneService';
import Infraction from './models/infraction';
import {distanceFromNest} from './utils';

/**
 * Start polling the drones API and updating infractions to the database.
 *
 * @param poll_interval Poll interval in milliseconds
 */
export const start = (poll_interval: number) => {
  update();

  /** Start polling */
  const loop = () => {
    setTimeout(() => {
      update();
      loop();
    }, poll_interval);
  };
  loop();
};

/**
 * Fetch drone data from the API and and save infractions to the database
 *
 * @returns Void promise
 */
const update = async () => {
  const report = await getReport();
  if (!report) return;
  const drones = report.capture.drone;
  drones.forEach(d => {
    d.positionX = Number(d.positionX);
    d.positionY = Number(d.positionY);
    d.distance = distanceFromNest(d.positionX, d.positionY);
  });
  // Flying within 100 meters is too close
  const dronesInNDZ = drones.filter(d => d.distance! < 100);
  // Update existing document if new distance is smaller than previous
  const updateExistingOps = dronesInNDZ.map(d => ({
    updateOne: {
      filter: {
        serialNumber: d.serialNumber,
        distance: {$gt: d.distance!},
      },
      update: {
        positionX: d.positionX,
        positionY: d.positionY,
        distance: d.distance!,
        snapshotTimestamp: new Date(report.capture.$.snapshotTimestamp),
      },
    },
  }));
  // Add document if it does not exist in the db.
  const insertNewOps = dronesInNDZ.map(d => ({
    updateOne: {
      filter: {
        serialNumber: d.serialNumber,
      },
      update: {
        $setOnInsert: {
          ...d,
          distance: d.distance!,
          snapshotTimestamp: new Date(report.capture.$.snapshotTimestamp),
        },
      },
      upsert: true,
    },
  }));
  // Refresh the TTL for all the drones in the db included in the report
  const refreshTTLOp = {
    updateMany: {
      filter: {
        serialNumber: {$in: drones.map(d => d.serialNumber)},
      },
      update: {
        lastModified: new Date(),
      },
    },
  };
  try {
    Infraction.bulkWrite([...updateExistingOps, ...insertNewOps, refreshTTLOp]);
  } catch (e) {
    console.error(e);
  }
};

export default {start};
