<template>
  <div class="container">
    <div class="vstack gap-5 my-4">
      <header class="vstack align-items-start bg-red">
        <h1 class="mb-0">Infractions</h1>
        <h5 class="text-body text-opacity-75">
          List of NDZ (no drone zone) violations around the monadikuikka nest
        </h5>
        <div class="lead mt-1">
          This view lists all the infractions stored to the database. Click the
          button to see the details of the NDZ violation and the pilot
          information. The listing reports the time of each NDZ infraction, the
          serial number of the drone, and the distance form the bird nest.
        </div>
      </header>

      <main class="row justify-content-center">
        <div v-if="errorMsg" class="alert alert-danger" role="alert">
          {{ errorMsg }}
        </div>
        <div v-else-if="isFirstLoad" class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else-if="infractions" class="col col-xl-10">
          <table
            class="table table-hover table-striped table-bordered align-middle"
          >
            <caption>
              List of infractions
            </caption>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Time</th>
                <th scope="col">Serial number</th>
                <th scope="col">Distance</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody class="table-striped text-center">
              <tr v-if="!infractions.length">
                <td colspan="5">No recent NDZ violations</td>
              </tr>
              <tr v-for="(inf, index) in infractions" :key="inf.serialNumber">
                <th scope="row">{{ index + 1 }}.</th>
                <td>{{ string2date(inf.snapshotTimestamp) }}</td>
                <td>{{ inf.serialNumber }}</td>
                <td>{{ inf.distance.toFixed(2) }} metres</td>
                <td class="">
                  <button
                    class="btn btn-sm btn-secondary"
                    @click="() => selectInfraction(inf)"
                  >
                    Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <div>
      <Modal
        title="Infraction Details"
        ref="modal"
        @close="() => (selectedInfraction = null)"
      >
        <div v-if="selectedInfraction">
          <InfractionDetails :infraction="selectedInfraction!" />
        </div>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import InfractionDetails from "./components/InfractionDetails.vue";
import Modal from "./components/ModalVue.vue";
import type { infraction } from "./types";
import env from "./config";

export default {
  name: "App",
  components: {
    InfractionDetails,
    Modal,
  },
  data() {
    return {
      selectedInfraction: null as null | infraction,
      infractions: null as null | infraction[],
      isFirstLoad: true,
      errorMsg: null as null | string,
    };
  },
  created() {
    this.updateInfractions();
    this.poll(3000);
  },
  methods: {
    string2date(str: string) {
      try {
        const date = new Date(str);
        return `${date.toLocaleTimeString()},  ${date.toLocaleDateString()}`;
      } catch {
        return "Invalid Datetime";
      }
    },
    selectInfraction(infraction: infraction) {
      this.selectedInfraction = infraction;
      this.showModal();
    },
    showModal() {
      (this.$refs.modal as any).show();
    },
    poll(poll_interval: number) {
      setTimeout(() => {
        this.updateInfractions();
        this.poll(poll_interval);
      }, poll_interval);
    },
    async updateInfractions() {
      try {
        const url = `${env.VITE_BACKEND_URL}/infractions`;
        const response = await fetch(url, {
          headers: {
            accept: "application/json",
          },
        });
        const data = await response.json();
        if (response.status !== 200) {
          this.errorMsg = `An error occurred while fetching the list of NDZ violations. ${data.error}`;
        } else {
          this.infractions = data;
        }
      } catch (e) {
        console.error(e);
        this.errorMsg =
          "An error occurred while fetching the list of NDZ violations.";
      }
      this.isFirstLoad = false;
    },
  },
};
</script>

<style lang="scss">
@import "./style/custom.scss";

body {
  background-color: $light;
}
</style>
