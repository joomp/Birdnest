<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-modal="true"
    role="dialog"
    ref="modal"
    v-on="{ 'hide.bs.modal': () => $emit('close') }"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-2">{{ title }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      modal: null as null | Modal,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    hide() {
      this.modal!.hide();
    },
    show() {
      this.modal!.show();
    },
  },
  emits: ["close"],
  expose: ["show", "hide"],
  mounted() {
    this.modal = new Modal(this.$refs.modal as Element);
  },
};
</script>
