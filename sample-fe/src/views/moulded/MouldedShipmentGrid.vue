<script setup>
// 1. Imports
import { apiList } from "@/APIs/list.api";
import { apiManufactured } from "@/APIs/manufactured.api";
import DataGrid from "@/components/common/DataGrid.vue";
import { DATE_FORMAT } from "@/constants/date-format.constant";
import { lookUpOptions } from "@/constants/options.constant";
import { sizes } from "@/utils/media-query.util";
import { useQuery } from "@tanstack/vue-query";
import dayjs from "dayjs";
import {
  DxColumn,
  DxForm,
  DxItem,
  DxLabel,
  DxLookup,
  DxPopup,
  DxRequiredRule,
} from "devextreme-vue/data-grid";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import CustomStore from "devextreme/data/custom_store";
import { formatMessage } from "devextreme/localization";
import "devextreme/ui/lookup";
import "devextreme/ui/text_area";
import { find, omit } from "lodash";
import { computed, getCurrentInstance, ref } from "vue";
import { useRoute } from "vue-router";

// 2. Hooks
const route = useRoute();
const vm = getCurrentInstance();

// 3. Define props, emits, models

// 4. Define refs and reactive variables
const loadedData = ref([]);
const isLoading = ref(false);

// 5. APIs
const { data: product } = useQuery({
  queryKey: ["get-product"],
  queryFn: apiList.getProduct,
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

const store = new CustomStore({
  key: "no",
  load: async () => {
    const data = await apiManufactured.getDeliveryProduct(route.query);
    loadedData.value = data;
    return { data };
  },
  insert: async (values) => {
    isLoading.value = true;
    const params = { ...queryParams.value, ...values };
    const shipmentDate = params.shipmentDate
      ? dayjs(params.shipmentDate).format(DATE_FORMAT.YYYY_MM_DD)
      : undefined;

    return apiManufactured
      .createShipment({ ...params, shipmentDate })
      .then(() => {
        vm.proxy.$toast.success(formatMessage("msg.success"));
      })
      .finally(() => {
        isLoading.value = false;
      });
  },
  update: async (key, values) => {
    isLoading.value = true;
    const oldData = find(loadedData.value, { no: key }) || {};
    const params = { ...omit(oldData, ["no", "createID"]), ...values };
    const shipmentDate = params.shipmentDate
      ? dayjs(params.shipmentDate).format(DATE_FORMAT.YYYY_MM_DD)
      : undefined;

    return apiManufactured
      .updateShipment({
        ...params,
        shipmentDate,
      })
      .then(() => {
        vm.proxy.$toast.success(formatMessage("msg.success"));
      })
      .finally(() => {
        isLoading.value = false;
      });
  },
});

// 6. Computed properties
const labelLocation = computed(() =>
  sizes()["screen-x-small"] ? "top" : "left",
);

const maxHeightPopup = computed(() => (sizes()["screen-x-small"] ? 580 : 380));

const queryParams = computed(() => ({
  shipmentDate: dayjs().toDate(),
  productKey: !isNaN(+route.query?.productKey)
    ? +route.query.productKey
    : undefined,
  partsKey: !isNaN(+route.query?.partsKey) ? +route.query.partsKey : undefined,
  colorKey: !isNaN(+route.query?.colorKey) ? +route.query.colorKey : undefined,
  useKey: !isNaN(+route.query?.useKey) ? +route.query.useKey : undefined,
}));

// 7. Watchers

// 8. Methods

// 9. Lifecycle hooks

// 10. Others
</script>

<template>
  <div class="shipment-tab">
    <data-grid
      key-expr="no"
      css-class="data-grid-moulded-shipment"
      :allow-search="false"
      :allow-updating="false"
      :allow-adding="false"
      :data-source="store"
    >
      <template #columns>
        <dx-column type="buttons"  />
        <dx-column
          data-field="no"
          caption="No"
          alignment="center"
          data-type="number"
          :width="100"
        />
        <dx-column
          data-field="shipmentDate"
          caption="출고일"
          alignment="center"
          data-type="date"
          :format="DATE_FORMAT.yyyy_MM_dd"
        />
        <dx-column
          data-field="shipmentQuantity"
          caption="출고량"
          data-type="number"
          format=",##0"
        />
        <dx-column
          data-field="createId"
          caption="작성자"
          alignment="center"
          data-type="string"
        />
        <dx-column
          data-field="descr"
          caption="비고"
          data-type="string"
        />
        <dx-column
          data-field="productKey"
          :visible="false"
        >
          <dx-lookup
            value-expr="productKey"
            display-expr="productName"
            :data-source="product"
          />
        </dx-column>
        <dx-column
          data-field="partsKey"
          :visible="false"
        >
          <dx-lookup
            value-expr="partsKey"
            display-expr="partsName"
            :data-source="partsType"
          />
        </dx-column>
        <dx-column
          data-field="colorKey"
          :visible="false"
        >
          <dx-lookup
            value-expr="colorKey"
            display-expr="colorName"
            :data-source="partsColor"
          />
        </dx-column>
        <dx-column
          data-field="useKey"
          :visible="false"
        >
          <dx-lookup
            value-expr="machineKey"
            display-expr="machineName"
            :data-source="partsUse"
          />
        </dx-column>
      </template>

      <template #popup-editing >
        <dx-popup
          title="출고등록"
          :animation="null"
          :show-title="true"
          :max-width="750"
          :max-height="maxHeightPopup"
        />
        <dx-form
          ref="formRef"
          :col-count="2"
          :label-location="labelLocation"
          :show-colon-after-label="false"
          :element-attr="{
            id: 'shipment-popup',
          }"
        >
          <dx-item
            data-field="shipmentDate"
            editor-type="dxDateBox"
            :editor-options="{
              displayFormat: DATE_FORMAT.yyyy_MM_dd,
              value: queryParams.shipmentDate,
            }"
          >
            <dx-required-rule />
            <dx-label text="출고일" />
          </dx-item>
          <dx-item
            data-field="productKey"
            editor-type="dxLookup"
            :editor-options="{
              dataSource: product,
              displayExpr: 'productName',
              valueExpr: 'productKey',
              value: queryParams.productKey,
              ...lookUpOptions,
            }"
          >
            <dx-required-rule />
            <dx-label text="제품코드" />
          </dx-item>
          <dx-item
            data-field="partsKey"
            editor-type="dxLookup"
            :editor-options="{
              dataSource: partsType,
              displayExpr: 'partsName',
              valueExpr: 'partsKey',
              value: queryParams.partsKey,
              ...lookUpOptions,
            }"
          >
            <dx-required-rule />
            <dx-label text="부품" />
          </dx-item>
          <dx-item
            data-field="colorKey"
            editor-type="dxLookup"
            :editor-options="{
              dataSource: partsColor,
              displayExpr: 'colorName',
              valueExpr: 'colorKey',
              value: queryParams.colorKey,
              ...lookUpOptions,
            }"
          >
            <dx-required-rule />
            <dx-label text="색상" />
          </dx-item>
          <dx-item
            data-field="useKey"
            editor-type="dxLookup"
            :editor-options="{
              dataSource: partsUse,
              displayExpr: 'useName',
              valueExpr: 'useKey',
              value: queryParams.useKey,
              ...lookUpOptions,
            }"
          >
            <dx-required-rule />
            <dx-label text="용도" />
          </dx-item>
          <dx-item
            data-field="shipmentQuantity"
            editor-type="dxNumberBox"
          >
            <dx-label text="출고량" />
          </dx-item>
          <dx-item
            data-field="descr"
            editor-type="dxTextArea"
            :editor-options="{
              maxLength: 500,
            }"
          >
            <dx-label text="비고" />
          </dx-item>
        </dx-form>
      </template>
    </data-grid>
  </div>

  <dx-load-panel
    :visible="isLoading"
    :position="{
      of: '#shipment-popup',
    }"
  />
</template>

<style scoped lang="scss">
.shipment-tab {
  padding: 10px;
}

.data-grid-moulded-shipment {
  max-height: calc(100vh - 155px) !important;

  .screen-x-small & {
    max-height: calc(100vh - 237px) !important;
  }
}
</style>
