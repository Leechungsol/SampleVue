<script setup>
// 1. Imports
import { apiChart } from "@/APIs/chart.api";
import { themeStore } from "@/stores/theme.store";
import {
  DxChart,
  DxCommonSeriesSettings,
  DxFont,
  DxLegend,
  DxSeries,
  DxTitle,
} from "devextreme-vue/chart";
import DataSource from "devextreme/data/data_source";
import { forEach, groupBy, values } from "lodash";
import { ref } from "vue";

// 2. Hooks

// 3. Define props, emits, models
const selectedFlowerComp = defineModel();

// 4. Define refs and reactive variables
const chartRef = ref();

// 5. APIs
const store = new DataSource({
  key: "key",
  load: async () => {
    /**
     * Fetches chart data from the API and transforms it into a format suitable for the chart component.
     *
     * The function makes a request to the `apiChart.getCharts()` endpoint to retrieve the raw chart data.
     * It then groups the data by `flowerCompKey` and creates an array of objects, where each object represents
     * a data point for the chart. The object includes the `state` (flowerCompName), `flowerCompKey`, `aliveTrue`,
     * and `aliveFalse` properties, which are used to populate the chart.
     */
    const res = await apiChart.getCharts();
    const data = [];
    forEach(values(groupBy(res || [], "flowerCompKey")), (item, index) => {
      let itemBar = { key: index };
      forEach(item, (val) => {
        itemBar.state = val.flowerCompName;
        itemBar.flowerCompKey = val.flowerCompKey;
        if (val.alive) {
          itemBar.aliveTrue = val.num;
        } else {
          itemBar.aliveFalse = val.num;
        }
      });
      data.push(itemBar);
    });

    return { data };
  },
});

// 6. Computed properties

// 7. Watchers

// 8. Methods
const onOptionChanged = ({ component }) => {
  const series = component.getAllSeries();
  if (series?.length) {
    const points = series[0].getAllPoints();
    if (points?.length) {
      points[0].select();
      selectedFlowerComp.value = {
        flowerKey: points[0].data.flowerCompKey,
        alive: Number(!points[0].series.index),
      };
    }
  }
};

/**
 * Handles the click event on a data point in the chart.
 * If the data point is already selected, it will be deselected and the `selectedFlowerComp` value will be set to `undefined`.
 * If the data point is not selected, it will be selected and the `selectedFlowerComp` value will be set to an object containing the `flowerKey` and `alive` properties.
 */
const onPointClick = ({ target }) => {
  if (target.isSelected()) {
    target.clearSelection();
    selectedFlowerComp.value = undefined;
  } else {
    target.select();
    selectedFlowerComp.value = {
      flowerKey: target.data.flowerCompKey,
      alive: Number(!target.series.index),
    };
  }
};

// 9. Lifecycle hooks

// 10. Others
</script>

<template>
  <dx-chart
    ref="chartRef"
    :theme="themeStore.current"
    :data-source="store"
    @pointClick="onPointClick"
    @optionChanged="onOptionChanged"
  >
    <dx-common-series-settings
      type="bar"
      argument-field="state"
    />
    <dx-series
      value-field="aliveTrue"
      name="구대"
    />
    <dx-series
      value-field="aliveFalse"
      name="페기"
    />
    <dx-legend
      orientation="horizontal"
      vertical-alignment="top"
      horizontal-alignment="right"
    />
    <dx-title text="화분업체별 화분 구매/폐기 건수">
      <dx-font
        :size="20"
        :weight="700"
      />
    </dx-title>
  </dx-chart>
</template>

<style scoped lang="scss"></style>
