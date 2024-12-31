<script setup>
// 1. Imports
import { apiList } from "@/APIs/list.api";
import { apiUnshipped } from "@/APIs/unshipped.api";
import DataGrid from "@/components/common/DataGrid.vue";
import { DATE_FORMAT } from "@/constants/date-format.constant";
import { lookUpOptions } from "@/constants/options.constant";
import { locateInMenu } from "@/utils/media-query.util";
import { useQuery } from "@tanstack/vue-query";
import dayjs from "dayjs";
import { DxColumn, DxLookup } from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import "devextreme/ui/lookup";
import { reactive, ref, watch } from "vue";

// 2. Hooks

// 3. Define props, emits, models

// 4. Define refs and reactive variables
const toolbarRef = ref();
const formData = reactive({
  from: dayjs().subtract(3, "months").toDate(),
  to: dayjs().toDate(),
});

// 5. APIs
const { data: company, isFetched: isFetchedCompany } = useQuery({
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
  key: "explainKey",
  load: async () => {
    const data = await apiUnshipped.getUnshippeds({
      ...formData,
      from: dayjs(formData.from).format(DATE_FORMAT.YYYY_MM_DD),
      to: dayjs(formData.to).format(DATE_FORMAT.YYYY_MM_DD),
    });
    return { data };
  },
});

// 6. Computed properties

// 7. Watchers
/**
 * Watches the `isFetchedCompany` reactive variable and triggers a repaint of the toolbar component when the value changes and the company data has been fetched.
 */
watch(
  () => isFetchedCompany.value,
  () => {
    if (isFetchedCompany.value) {
      toolbarRef.value.component.repaint();
    }
  },
);

// 8. Methods
const onSearch = () => {
  store.reload();
};

const onToolbarPreparing = (e) => {
  toolbarRef.value = e;
  e.toolbarOptions.items.unshift({
    locateInMenu,
    location: "after",
    widget: "dxForm",
    options: {
      labelLocation: "left",
      formData,
      showRequiredMark: false,
      showColonAfterLabel: false,
      colCountByScreen: {
        xs: 1,
        sm: 3,
        md: 3,
        lg: 3,
      },
      items: [
        {
          dataField: "from",
          editorType: "dxDateBox",
          cssClass: "item-filter",
          label: {
            text: "수주일",
          },
          editorOptions: {
            displayFormat: DATE_FORMAT.yyyy_MM_dd,
          },
        },
        {
          dataField: "to",
          editorType: "dxDateBox",
          cssClass: "item-filter",
          label: {
            text: "~",
          },
          editorOptions: {
            displayFormat: DATE_FORMAT.yyyy_MM_dd,
          },
        },
        {
          dataField: "receiving",
          editorType: "dxLookup",
          cssClass: "item-filter",
          label: {
            text: "입고처",
          },
          editorOptions: {
            dataSource: company.value,
            displayExpr: "compName",
            valueExpr: "compKey",
            ...lookUpOptions,
          },
        },
      ],
    },
  });
};

// 9. Lifecycle hooks

// 10. Others
</script>

<template>
  <data-grid
    key-expr="explainKey"
    :data-source="store"
    @on:search="onSearch"
    @on:toolbar-preparing="onToolbarPreparing"
  >
    <template #columns>
      <dx-column
        data-field="explainKey"
        caption="수주번호"
        alignment="center"
        data-type="number"
        :width="100"
      />
      <dx-column
        data-field="orderDate"
        caption="수주일자"
        data-type="date"
        alignment="center"
        :format="DATE_FORMAT.yyyy_MM_dd"
      />
      <dx-column
        data-field="goodsName"
        caption="상품명"
        data-type="string"
        :min-width="325"
      />
      <dx-column
        data-field="receiving"
        caption="입고처"
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
        caption="부품"
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
        caption="발주수량"
        data-type="number"
        format=",##0"
      />
      <dx-column
        data-field="quantity"
        caption="출고수량"
        data-type="number"
        format=",##0"
      />
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
:deep(.dx-box-flex) {
  gap: 10px;
}

:deep(.item-filter) {
  &:not(.dx-last-col) {
    padding: 0;
  }

  &.dx-last-col {
    padding: 0 5px 0 0;
  }
}
</style>
