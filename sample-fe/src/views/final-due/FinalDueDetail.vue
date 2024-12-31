<script setup>
// 1. Imports
import { apiDelivery } from "@/APIs/delivery.api";
import { apiList } from "@/APIs/list.api";
import DataGrid from "@/components/common/DataGrid.vue";
import { useQuery } from "@tanstack/vue-query";
import {
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxLookup,
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import { useRoute } from "vue-router";

// 2. Hooks
const route = useRoute();

// 3. Define props, emits, models

// 4. Define refs and reactive variables

// 5. APIs
const { data: process } = useQuery({
  queryKey: ["get-process"],
  queryFn: apiList.getProcess,
});

const { data: company } = useQuery({
  queryKey: ["get-company"],
  queryFn: apiList.getCompany,
});

const { data: partsType } = useQuery({
  queryKey: ["get-parts-type"],
  queryFn: apiList.getPartsType,
});

const { data: partsColor } = useQuery({
  queryKey: ["get-parts-color"],
  queryFn: apiList.getPartsColor,
});

const { data: partsUse } = useQuery({
  queryKey: ["get-parts-use"],
  queryFn: apiList.getPartsUse,
});

const store = new DataSource({
  key: "itemKey",
  load: async () => {
    const data = await apiDelivery.getDeliveryByExplainKey({
      explainKey: route.params.explainKey,
    });
    return { data };
  },
});

// 6. Computed properties

// 7. Watchers

// 8. Methods
const onCellPrepared = (e) => {
  if (e.rowType === "data" && !e.component.isRowSelected()) {
    if(e.data.quantity >= e.data.receivingQuantity){
      e.cellElement.classList.add("status-10");
    }
  }
};
// 9. Lifecycle hooks

// 10. Others
</script>

<template>
  <data-grid
    key-expr="itemKey"
    :show-toolbar="false"
    :show-filter="false"
    :data-source="store"
    @on:cell-prepared="onCellPrepared"
  >
    <template #options>
      <dx-group-panel :visible="false" />
      <dx-grouping :auto-expand-all="true" />
    </template>

    <template #columns>
      <dx-column
        data-field="processCode"
        caption="작업명"
        :group-index="0"
        :editor-options="{
          dropDownOptions: {
            minWidth: '170px',
            wrapItemText: true,
          },
        }"
      >
        <dx-lookup
          value-expr="processCode"
          display-expr="processName"
          :data-source="process"
        />
      </dx-column>
      <dx-column
        data-field="vender"
        caption="업체명"
        alignment="center"
        :editor-options="{
          dropDownOptions: {
            minWidth: '170px',
            wrapItemText: true,
          },
        }"
      >
        <dx-lookup
          value-expr="compKey"
          display-expr="compName"
          :data-source="company"
        />
      </dx-column>
      <dx-column
        data-field="partsKey"
        caption="부품명"
        alignment="center"
        :editor-options="{
          dropDownOptions: {
            minWidth: '170px',
            wrapItemText: true,
          },
        }"
      >
        <dx-lookup
          value-expr="partsKey"
          display-expr="partsName"
          :data-source="partsType"
        />
      </dx-column>
      <dx-column
        data-field="colorKey"
        caption="색상"
        alignment="center"
        :editor-options="{
          dropDownOptions: {
            minWidth: '170px',
            wrapItemText: true,
          },
        }"
      >
        <dx-lookup
          value-expr="colorKey"
          display-expr="colorName"
          :data-source="partsColor"
        />
      </dx-column>
      <dx-column
        data-field="useKey"
        caption="용도"
        alignment="center"
        :editor-options="{
          dropDownOptions: {
            minWidth: '170px',
            wrapItemText: true,
          },
        }"
      >
        <dx-lookup
          value-expr="useKey"
          display-expr="useName"
          :data-source="partsUse"
        />
      </dx-column>
      <dx-column
        data-field="receivingQuantity"
        caption="총 수량"
        data-type="number"
        format=",##0"
      />
      <dx-column
        data-field="quantity"
        caption="완료수량"
        data-type="number"
        format=",##0"
      />
      <dx-column
        data-field="receiving"
        caption="후가공입고처"
        alignment="center"
        :editor-options="{
          dropDownOptions: {
            minWidth: '170px',
            wrapItemText: true,
          },
        }"
      >
        <dx-lookup
          value-expr="compKey"
          display-expr="compName"
          :data-source="company"
        />
      </dx-column>
      <dx-column
        data-field="balanceQuantity"
        caption="잔량"
        data-type="number"
        format=",##0"
      />
      <dx-column
        data-field="descr"
        caption="비고"
        data-type="string"
      />
    </template>
  </data-grid>
</template>

<style scoped lang="scss">

:deep(.dx-data-row:not(.dx-row-focused)) {
  .status-10 {
    background-color: rgb(248, 196, 196) !important;
  }
}
</style>
