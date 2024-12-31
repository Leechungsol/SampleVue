<script setup>
// 1. Imports
import { DxTabPanel } from "devextreme-vue/tab-panel";
import ShipmentTab from "./MouldedShipmentGrid.vue";
import WarehousingTab from "./MouldedWarehousingGrid.vue";

// 2. Hooks

// 3. Define props, emits, models

// 4. Define refs and reactive variables

// 5. APIs

// 6. Computed properties

// 7. Watchers

// 8. Methods

// 9. Lifecycle hooks

// 10. Others
const tabs = [
  {
    icon: "fas fa-box",
    title: "생산관리 물류창고 입고",
  },
  {
    icon: "fas fa-cart-arrow-down",
    title: "물류창고 맨사출 재고분 출고",
  },
];
</script>

<template>
  <dx-tab-panel
    item-template="tabPanelItem"
    icon-position="start"
    :data-source="tabs"
    :swipe-enabled="false"
    :element-attr="{
      class: 'mould-detail-tab-panel',
    }"
  >
    <template #tabPanelItem="{ index }">
      <warehousing-tab v-if="index === 0" />
      <shipment-tab v-if="index === 1" />
    </template>
  </dx-tab-panel>
</template>

<style lang="scss">
.mould-detail-tab-panel {
  .screen-x-small & {
    .dx-tab-text-span,
    .dx-tab-text-span-pseudo {
      width: 100px !important;
    }
  }
}
</style>
