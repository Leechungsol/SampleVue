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
import "devextreme/ui/radio_group";
import "devextreme/ui/text_area";
import { find, isNaN, isNil, isNumber, omit } from "lodash";
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
const { data: machine } = useQuery({
  queryKey: ["get-machine"],
  queryFn: apiList.getMachine,
});

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
    const data = await apiManufactured.getReceivingProduct(route.query);
    loadedData.value = data;
    return { data };
  },
  insert: async (values) => {
    isLoading.value = true;
    const params = { ...queryParams.value, ...values };
    const mould = isNumber(params.machineKey)
      ? find(machine.value, { machineKey: params.machineKey }).machineName
      : undefined;
    const isDayNight = !isNil(params.isDayNight)
      ? params.isDayNight === "야간"
        ? 1
        : 0
      : undefined;
    const warehousingDate = params.warehousingDate
      ? dayjs(params.warehousingDate).format(DATE_FORMAT.YYYY_MM_DD)
      : undefined;

    return apiManufactured
      .createWarehousing({
        ...params,
        mould,
        isDayNight,
        warehousingDate,
      })
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
    const params = {
      ...omit(oldData, ["no", "createID"]),
      ...values,
    };
    const mould = isNumber(params.machineKey)
      ? find(machine.value, { machineKey: params.machineKey }).machineName
      : undefined;
    const isDayNight = !isNil(params.isDayNight)
      ? params.isDayNight === "야간"
        ? 1
        : 0
      : undefined;
    const warehousingDate = params.warehousingDate
      ? dayjs(params.warehousingDate).format(DATE_FORMAT.YYYY_MM_DD)
      : undefined;

    return apiManufactured
      .updateWarehousing({
        ...params,
        mould,
        isDayNight,
        warehousingDate,
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

const maxHeightPopup = computed(() => (sizes()["screen-x-small"] ? 620 : 420));

const queryParams = computed(() => ({
  warehousingDate: dayjs().toDate(),
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
  <div class="warehousing-tab">
    <data-grid
      key-expr="no"
      css-class="data-grid-moulded-warehousing"
      :allow-search="false"
      :allow-updating="false"
      :allow-adding="false"
      :data-source="store"
    >
      <template #columns>
        <dx-column type="buttons" />
        <dx-column
          data-field="no"
          caption="No"
          alignment="center"
          data-type="number"
          :width="100"
        />
        <dx-column
          data-field="warehousingDate"
          caption="입고일"
          alignment="center"
          data-type="date"
          :format="DATE_FORMAT.yyyy_MM_dd"
        />
        <dx-column
          data-field="warehousingQuantity"
          caption="생산량"
          data-type="number"
          format=",##0"
        />
        <dx-column
          data-field="machine"
          caption="재질"
          data-type="string"
        />
        <dx-column
          data-field="machineKey"
          caption="호기"
          alignment="center"
          :editor-options="{
            dropDownOptions: {
              minWidth: '170px',
              wrapItemText: true,
            },
          }"
        >
          <dx-lookup
            value-expr="machineKey"
            display-expr="machineName"
            :data-source="machine"
          />
        </dx-column>
        <dx-column
          data-field="isDayNight"
          caption="주야구분"
          alignment="center"
          :editor-options="{
            dropDownOptions: {
              minWidth: '170px',
              wrapItemText: true,
            },
          }"
        >
          <dx-lookup :data-source="['주간', '야간']" />
        </dx-column>
        <dx-column
          data-field="createID"
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
          data-field="warehousingKey"
          :visible="false"
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

      <template #popup-editing>
        <dx-popup
          title="생산등록"
          :animation="null"
          :show-title="true"
          :max-width="750"
          :max-height="maxHeightPopup"
        />
        <dx-form
          :col-count="2"
          :label-location="labelLocation"
          :show-colon-after-label="false"
          :element-attr="{
            id: 'warehousing-popup',
          }"
        >
          <dx-item
            data-field="isDayNight"
            editor-type="dxRadioGroup"
            :editor-options="{
              dataSource: ['주간', '야간'],
              layout: 'horizontal',
              value: '주간',
            }"
          >
            <dx-required-rule />
            <dx-label text="구분" />
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
            data-field="warehousingDate"
            editor-type="dxDateBox"
            :editor-options="{
              displayFormat: DATE_FORMAT.yyyy_MM_dd,
              value: queryParams.warehousingDate,
            }"
          >
            <dx-required-rule />
            <dx-label text="입고일" />
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
            data-field="machine"
            editor-type="dxTextBox"
            :editor-options="{
              maxLength: 50,
            }"
          >
            <dx-required-rule />
            <dx-label text="재질" />
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
            data-field="machineKey"
            editor-type="dxLookup"
            :editor-options="{
              dataSource: machine,
              displayExpr: 'machineName',
              valueExpr: 'machineKey',
              ...lookUpOptions,
            }"
          >
            <dx-required-rule />
            <dx-label text="호기" />
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
            data-field="warehousingQuantity"
            editor-type="dxNumberBox"
          >
            <dx-label text="생산량" />
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
      of: '#warehousing-popup',
    }"
  />
</template>

<style scoped lang="scss">
.warehousing-tab {
  padding: 10px;
}

.data-grid-moulded-warehousing {
  max-height: calc(100vh - 155px) !important;

  .screen-x-small & {
    max-height: calc(100vh - 237px) !important;
  }
}
</style>
