<template>
  <div>
    <div v-if="errorMsg" class="alert alert-danger" role="alert">
      {{ errorMsg }}
    </div>
    <div v-else-if="isLoading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="vstack gap-4 my-3">
      <section>
        <h3>Pilot</h3>
        <div class="information-group">
          <div>
            <div class="key">Name</div>
            <div class="value">
              {{ pilot ? `${pilot.firstName} ${pilot.lastName}` : "-" }}
            </div>
          </div>
          <div>
            <div class="key">Phone</div>
            <div class="value">
              {{ pilot?.phoneNumber || "-" }}
            </div>
          </div>
          <div>
            <div class="key">Email</div>
            <div class="value">{{ pilot?.email || "-" }}</div>
          </div>
          <div>
            <div class="key">Pilot ID</div>
            <div class="value">{{ pilot?.pilotId || "-" }}</div>
          </div>
        </div>
      </section>
      <section>
        <h3>Infraction</h3>
        <div class="information-group">
          <div>
            <div class="key">Distance from the nest</div>
            <div class="value">{{ infraction.distance.toFixed(2) }} metres</div>
          </div>
          <div>
            <div class="key">Time</div>
            <div class="value">
              {{ new Date(infraction.snapshotTimestamp).toLocaleTimeString() }}
              <br />
              {{ new Date(infraction.snapshotTimestamp).toLocaleDateString() }}
            </div>
          </div>
          <div>
            <div class="key">Position</div>
            <div class="value">
              x: {{ infraction.positionX.toFixed() }} <br />
              y: {{ infraction.positionY.toFixed() }}
            </div>
          </div>
        </div>
      </section>
      <section>
        <h3>Drone</h3>
        <div class="information-group">
          <div>
            <div class="key">Serial Number</div>
            <div class="value">
              {{ infraction.serialNumber }}
            </div>
          </div>
          <div>
            <div class="key">Model</div>
            <div class="value">
              {{ infraction.model }}
            </div>
          </div>
          <div>
            <div class="key">Manufacturer</div>
            <div class="value">
              {{ infraction.manufacturer }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import type { infraction, pilot } from "../types";
import type { PropType } from "vue";
import env from "../config";

export default {
  name: "App",
  components: {},
  emits: ["close"],
  data() {
    return {
      pilot: null as null | pilot,
      isLoading: false,
      errorMsg: null as null | string,
    };
  },
  props: {
    infraction: {
      type: Object as PropType<infraction>,
      required: true,
    },
  },
  methods: {
    async getPilot() {
      this.isLoading = true;
      try {
        const url = `${env.VITE_BACKEND_URL}/pilots/${this.infraction.serialNumber}`;
        const response = await fetch(url, {
          headers: {
            accept: "application/json",
          },
        });
        const data = await response.json();
        if (response.status !== 200) {
          this.errorMsg = `Error while fetching pilot data. ${data.error}`;
        } else {
          this.pilot = data;
        }
      } catch (e) {
        console.error(e);
        this.errorMsg = "Error while fetching pilot data.";
        this.pilot = null;
      }
      this.isLoading = false;
    },
  },
  created() {
    this.getPilot();
  },
};
</script>

<style lang="scss" scoped>
@import "../style/custom.scss";
.key {
  font-size: 110%;
}

.value {
  @extend .text-body, .text-opacity-75;
  margin-left: 0.5ch;
}

.information-group {
  margin-left: 0.4ch;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 0.5em 9ch;
}
</style>
