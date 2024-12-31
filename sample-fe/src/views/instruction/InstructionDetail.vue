<script setup>
// 1. Imports
import { apiList } from "@/APIs/list.api";
import { apiSpecification } from "@/APIs/specification.api";
import ContentBlock from "@/components/common/ContentBlock.vue";
import DataGrid from "@/components/common/DataGrid.vue";
import { DATE_FORMAT } from "@/constants/date-format.constant";
import { lookUpOptions } from "@/constants/options.constant";
import { getFullBase64 } from "@/utils/mime-type.util";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { DxButton } from "devextreme-vue/button";
import { DxColumn, DxGrouping, DxGroupPanel } from "devextreme-vue/data-grid";
import { DxForm, DxItem, DxLabel } from "devextreme-vue/form";
import { DxTileView } from "devextreme-vue/tile-view";
import DataSource from "devextreme/data/data_source";
import "devextreme/ui/lookup";
import "devextreme/ui/text_area";
import { filter, forEach, keys, last, split, xor } from "lodash";
import { getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

// 2. Hooks
const route = useRoute();
const vm = getCurrentInstance();
const queryClient = useQueryClient();

// 3. Define props, emits, models

// 4. Define refs and reactive variables
const selectedImages = ref([]);
const formData = ref();

// 5. APIs
const { refetch: refetchDetail } = useQuery({
  enabled: false,
  queryKey: ["specification-detail"],
  queryFn: () =>
    apiSpecification.getDetail({
      explainKey: route.params.explainKey,
    }),
  select: (data) => {
    formData.value = keys(data).length
      ? {
          ...data,
          standard: !isNaN(+data.standard) ? +data.standard : data.standard,
        }
      : data;
    return data;
  },
});

const { data: product } = useQuery({
  queryKey: ["get-product"],
  queryFn: apiList.getProduct,
});

const { data: company } = useQuery({
  queryKey: ["get-company"],
  queryFn: apiList.getCompany,
});

const contentStore = new DataSource({
  key: "detailKey",
  load: async () => {
    const data = await apiSpecification.getSpecificationByExplainKey({
      explainKey: route.params.explainKey,
    });
    return { data };
  },
});

const imageStore = new DataSource({
  key: "autoKey",
  load: async () => {
    const data = await apiSpecification.getFilesByExplainKey({
      explainKey: route.params.explainKey,
    });
    return { data };
  },
});

// 6. Computed properties

// 7. Watchers

// 8. Methods
/**
 * Handles the click event on an item in the tile view.
 * Toggles the selected state of the clicked item in the `selectedImages` array.
 */
const onItemClick = (e) => {
  selectedImages.value = xor(selectedImages.value, [e.itemIndex]);
};

/**
 * Handles the click event on the download button. Checks if at least one image is selected, and if so, downloads the selected images.
 */
const onDownload = () => {
  if (!selectedImages.value.length) {
    vm.proxy.$toast.warning("최소한 하나의 사진을 선택해야 합니다.");
  } else {
    const images = filter(imageStore.items(), (_, index) =>
      selectedImages.value.includes(index),
    );

    if (images.length) {
      forEach(images, (data) => {
        const a = document.createElement("a");
        a.href = getFullBase64(data.image);
        a.download = last(split(data.fileName, "\\"));
        a.click();
      });
    }
  }
};

// 9. Lifecycle hooks
onMounted(() => {
  if (route.params.explainKey) {
    refetchDetail();
  }
});

onUnmounted(() => {
  formData.value = undefined;
  queryClient.removeQueries({
    queryKey: ["specification-detail"],
    exact: true,
  });
});

// 10. Others
</script>

<template>
  <div class="wrapper-content">
    <content-block title="사양서 상세">
      <dx-form
        label-location="left"
        :col-count="2"
        :form-data="formData"
        :show-required-mark="false"
        :show-colon-after-label="false"
      >
        <dx-item
          data-field="director"
          editor-type="dxTextBox"
          :editor-options="{
            readOnly: true,
          }"
        >
          <dx-label text="영업담당자" />
        </dx-item>
        <dx-item
          data-field="compClassify"
          editor-type="dxTextBox"
          :editor-options="{
            readOnly: true,
          }"
        >
          <dx-label text="사업자구분" />
        </dx-item>
        <dx-item
          data-field="goodsName"
          editor-type="dxTextBox"
          :editor-options="{
            readOnly: true,
          }"
        >
          <dx-label text="상품명" />
        </dx-item>
        <dx-item
          data-field="standard"
          editor-type="dxLookup"
          :editor-options="{
            readOnly: true,
            placeholder: '',
            dataSource: product,
            displayExpr: 'productName',
            valueExpr: 'productKey',
            ...lookUpOptions,
          }"
        >
          <dx-label text="제품코드" />
        </dx-item>
        <dx-item
          data-field="orderDate"
          editor-type="dxDateBox"
          :editor-options="{
            readOnly: true,
            displayFormat: DATE_FORMAT.yyyy_MM_dd,
          }"
        >
          <dx-label text="수주일자" />
        </dx-item>
        <dx-item
          data-field="finalDueDate"
          editor-type="dxDateBox"
          :editor-options="{
            readOnly: true,
            displayFormat: DATE_FORMAT.yyyy_MM_dd,
          }"
        >
          <dx-label text="납품일자" />
        </dx-item>
        <dx-item
          data-field="orderCompKey"
          editor-type="dxLookup"
          :editor-options="{
            readOnly: true,
            placeholder: '',
            dataSource: company,
            displayExpr: 'compName',
            valueExpr: 'compKey',
            ...lookUpOptions,
          }"
        >
          <dx-label text="수주처" />
        </dx-item>
        <dx-item
          data-field="finalDueCompKey"
          editor-type="dxLookup"
          :editor-options="{
            readOnly: true,
            placeholder: '',
            dataSource: company,
            displayExpr: 'compName',
            valueExpr: 'compKey',
            ...lookUpOptions,
          }"
        >
          <dx-label text="납품처" />
        </dx-item>
        <dx-item
          data-field="orderQuantity"
          editor-type="dxTextBox"
          :editor-options="{
            readOnly: true,
          }"
        >
          <dx-label text="수량" />
        </dx-item>
        <dx-item
          data-field="goodsCost"
          editor-type="dxTextBox"
          :editor-options="{
            readOnly: true,
          }"
        >
          <dx-label text="제품단가" />
        </dx-item>
        <dx-item
          data-field="reference"
          editor-type="dxTextArea"
          :editor-options="{
            readOnly: true,
          }"
        >
          <dx-label text="기타" />
        </dx-item>
      </dx-form>
    </content-block>

    <content-block title="전행내용">
      <data-grid
        key-expr="detailKey"
        css-class="instruction-detail-grid"
        :show-toolbar="false"
        :show-filter="false"
        :allow-scroll-to-top="false"
        :data-source="contentStore"
      >
        <template #options>
          <dx-group-panel :visible="false" />
          <dx-grouping :auto-expand-all="true" />
        </template>

        <template #columns>
          <dx-column
            data-field="processName"
            caption="작업명"
            :group-index="0"
          />
          <dx-column
            data-field="venderName"
            caption="업체명"
            data-type="string"
          />
          <dx-column
            data-field="receivingName"
            caption="입고처"
            alignment="center"
            data-type="string"
          />
          <dx-column
            data-field="partsName"
            caption="부품명"
            alignment="center"
            data-type="string"
          />
          <dx-column
            data-field="colorName"
            caption="색상"
            alignment="center"
            data-type="string"
          />
          <dx-column
            data-field="useName"
            caption="용도"
            alignment="center"
            data-type="string"
          />
          <dx-column
            data-field="detailCost"
            caption="단가"
            data-type="number"
            format=",##0"
          />
          <dx-column
            data-field="detailQuantity"
            caption="수량"
            data-type="number"
            format=",##0"
          />
          <dx-column
            data-field="descr"
            caption="비고"
            data-type="string"
            :min-width="325"
          />
        </template>
      </data-grid>
    </content-block>

    <content-block title="사양서이미지" style="display: none">
      <dx-tile-view
        direction="vertical"
        :height="300"
        :data-source="imageStore"
        @item-click="onItemClick"
      >
        <template #item="{ data, index }">
          <span :class="{ 'image-selected': selectedImages.includes(index) }" />
          <img :src="getFullBase64(data.image)" />
        </template>
      </dx-tile-view>

      <template #action>
        <dx-button
          type="success"
          icon="download"
          text="다운로드"
          @click="onDownload"
        />
      </template>
    </content-block>
  </div>
</template>

<style scoped lang="scss">
.wrapper-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

:deep(.dx-tileview) {
  .dx-item.dx-tile {
    img {
      width: 100px;
      height: 100px;
    }

    &.dx-state-focused {
      border-width: 0;
    }

    &:has(.image-selected) {
      border-color: var(--dx-color-primary);
    }

    &.dx-state-hover,
    &:has(.image-selected) {
      border-width: 2px;

      img {
        width: 96px;
        height: 96px;
      }
    }
  }
}
</style>

<style lang="scss">
.instruction-detail-grid {
  .screen-small &,
  .screen-x-small & {
    min-height: unset !important;
  }
}
</style>
