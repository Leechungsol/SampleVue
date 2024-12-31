<script setup>
// 1. Imports
import { apiList } from "@/APIs/list.api";
import { apiManufactured } from "@/APIs/manufactured.api";
import DataGrid from "@/components/common/DataGrid.vue";
import { lookUpOptions } from "@/constants/options.constant";
import { locateInMenu } from "@/utils/media-query.util";
import { useQuery } from "@tanstack/vue-query";
import { DxButton, DxColumn, DxLookup } from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import "devextreme/ui/lookup";
import { isNumber } from "lodash";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

// 2. Hooks
const router = useRouter();

// 3. Define props, emits, models

// 4. Define refs and reactive variables
const toolbarRef = ref();
const formData = reactive({
  productKey: undefined,
  partsKey: undefined,
  colorKey: undefined,
  useKey: undefined,
});

// 5. APIs
const { data: product, isFetched: isFetchedProduct } = useQuery({
  queryKey: ["get-product"],
  queryFn: apiList.getProduct,
});

const { data: partsType, isFetched: isFetchedPartsType } = useQuery({
  queryKey: ["get-parts-type"],
  queryFn: apiList.getPartsType,
});

const { data: partsColor, isFetched: isFetchedPartsColor } = useQuery({
  queryKey: ["get-parts-color"],
  queryFn: apiList.getPartsColor,
});

const { data: partsUse, isFetched: isFetchedPartsUse } = useQuery({
  queryKey: ["get-parts-use"],
  queryFn: apiList.getPartsUse,
});

const store = new DataSource({
  key: "no",
  load: async () => {
    const data = await apiManufactured.getInventoryHistory(formData);
    return { data };
  },
});

// 6. Computed properties

// 7. Watchers
/**
 * Watches for the completion of fetching data from various APIs and triggers a repaint of the toolbar component when all data is fetched.
 * This ensures that the toolbar form is properly initialized with the fetched data.
 */
watch(
  [
    () => isFetchedProduct.value,
    () => isFetchedPartsType.value,
    () => isFetchedPartsColor.value,
    () => isFetchedPartsUse.value,
  ],
  () => {
    if (
      isFetchedProduct.value &&
      isFetchedPartsType.value &&
      isFetchedPartsColor.value &&
      isFetchedPartsUse.value
    ) {
      toolbarRef.value.component.repaint();
    }
  },
);

// 8. Methods
const onSearch = () => {
  store.reload();
};

const onDetail = (e) => {
  if (e.row.data) {
    const query = {};

    if (isNumber(e.row.data.productKey)) {
      query.productKey = e.row.data.productKey;
    }
    if (isNumber(e.row.data.partsKey)) {
      query.partsKey = e.row.data.partsKey;
    }
    if (isNumber(e.row.data.colorKey)) {
      query.colorKey = e.row.data.colorKey;
    }
    if (isNumber(e.row.data.useKey)) {
      query.useKey = e.row.data.useKey;
    }

    router.push({
      name: "moulded.detail",
      query,
    });
  }
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
        sm: 2,
        md: 3,
        lg: 4,
      },
      items: [
        {
          dataField: "productKey",
          editorType: "dxLookup",
          cssClass: "item-lookup-filter",
          label: {
            text: "제품코드",
          },
          editorOptions: {
            dataSource: product.value,
            displayExpr: "productName",
            valueExpr: "productKey",
            ...lookUpOptions,
          },
        },
        {
          dataField: "partsKey",
          editorType: "dxLookup",
          cssClass: "item-lookup-filter",
          label: {
            text: "부품명",
          },
          editorOptions: {
            dataSource: partsType.value,
            displayExpr: "partsName",
            valueExpr: "partsKey",
            ...lookUpOptions,
          },
        },
        {
          dataField: "colorKey",
          editorType: "dxLookup",
          cssClass: "item-lookup-filter",
          label: {
            text: "색상",
          },
          editorOptions: {
            dataSource: partsColor.value,
            displayExpr: "colorName",
            valueExpr: "colorKey",
            ...lookUpOptions,
          },
        },
        {
          dataField: "useKey",
          editorType: "dxLookup",
          cssClass: "item-lookup-filter",
          label: {
            text: "용도",
          },
          editorOptions: {
            dataSource: partsUse.value,
            displayExpr: "useName",
            valueExpr: "useKey",
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
    key-expr="no"
    :data-source="store"
    @on:search="onSearch"
    @on:toolbar-preparing="onToolbarPreparing"
  >
    <template #columns>
      <dx-column type="buttons">
        <dx-button
          icon="info"
          @click="onDetail"
        />
      </dx-column>
      <dx-column
        data-field="no"
        caption="No"
        alignment="center"
        data-type="number"
        :width="100"
      />
      <dx-column
        data-field="productKey"
        caption="제품코드"
        alignment="center"
        :editor-options="{
          dropDownOptions: {
            minWidth: '170px',
            wrapItemText: true,
          },
        }"
      >
        <dx-lookup
          value-expr="productKey"
          display-expr="productName"
          :data-source="product"
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
        data-field="stock"
        caption="현재고"
        data-type="number"
        format=",##0"
      />
    </template>
  </data-grid>
</template>

<style scoped lang="scss">
:deep(.dx-field-item) {
  padding-inline: 0 10px !important;

  &.dx-last-col {
    padding-inline: 0 5px !important;
  }
}

:deep(.item-lookup-filter) {
  &:not(.dx-last-col) {
    padding: 0;
  }

  &.dx-last-col {
    padding: 0 5px 0 0;
  }
}
</style>

<style lang="scss">
.item-lookup-filter {
  min-width: 250px;
}
</style>
