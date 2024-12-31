<script setup>
// 1. Imports
import { apiChart } from "@/APIs/chart.api";
import DataGrid from "@/components/common/DataGrid.vue";
import { DATE_FORMAT } from "@/constants/date-format.constant";
import { DxColumn } from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import { isEqual } from "lodash";
import { ref, watch } from "vue";
import ChartView from "./ChartView.vue";

// 2. Hooks

// 3. Define props, emits, models

// 4. Define refs and reactive variables
const selectedFlowerComp = ref();

// 5. APIs
const store = new DataSource({
  key: "key",
  load: async () => {
    if (!selectedFlowerComp.value) {
      return {
        data: [],
      };
    }

    const data = await apiChart.getChartByFlowerKey(selectedFlowerComp.value);
    return {
      data: data.map((item, index) => ({
        ...item,
        key: index,
      })),
    };
  },
});

// 6. Computed properties

// 7. Watchers
/**
 * Watches the `selectedFlowerComp` reactive variable and reloads the `store` data source when the value changes.
 * This ensures that the data grid is updated with the latest data for the selected flower component.
 */
watch(
  () => selectedFlowerComp.value,
  (newVal, oldVal) => {
    if (!isEqual(newVal, oldVal)) {
      store.reload();
    }
  },
);

// 8. Methods

// 9. Lifecycle hooks

// 10. Others
</script>

<template>
  <div class="container">
    <div>
      <chart-view v-model="selectedFlowerComp" />
    </div>
    <div>
      <data-grid
        key-expr="key"
        css-class="data-grid-chart-view"
        :data-source="store"
        :show-toolbar="false"
      >
        <template #columns>
          <dx-column
            data-field="flowerCompName"
            caption="업체명"
            data-type="string"
          />
          <dx-column
            data-field="flowerPotName"
            caption="화분명"
            data-type="string"
          />
          <dx-column
            data-field="flowerPotPrice"
            caption="화분가격"
            data-type="number"
            format=",##0"
          />
          <dx-column
            data-field="orderDate"
            caption="주문일자"
            alignment="center"
            data-type="date"
            :format="DATE_FORMAT.yyyy_MM_dd"
          />
          <dx-column
            data-field="discardDate"
            caption="폐기일자"
            alignment="center"
            data-type="date"
            :format="DATE_FORMAT.yyyy_MM_dd"
          />
        </template>
      </data-grid>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.data-grid-chart-view {
  max-height: calc(100vh - 516px) !important;

  .screen-x-small & {
    max-height: calc(100vh - 598px) !important;
  }
}
</style>
