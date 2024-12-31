<script setup>
// 1. Imports
import { apiList } from "@/APIs/list.api";
import { apiSpecification } from "@/APIs/specification.api";
import DataGrid from "@/components/common/DataGrid.vue";
import { DATE_FORMAT } from "@/constants/date-format.constant";
import { locateInMenu } from "@/utils/media-query.util";
import { useQuery } from "@tanstack/vue-query";
import dayjs from "dayjs";
import { DxButton, DxColumn, DxLookup } from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import { reactive } from "vue";
import { useRouter } from "vue-router";

// 2. Hooks
const router = useRouter();

// 3. Define props, emits, models

// 4. Define refs and reactive variables
const formData = reactive({
  from: dayjs().subtract(3, "months").toDate(),
  to: dayjs().toDate(),
});

// 5. APIs
const { data: company } = useQuery({
  queryKey: ["get-company"],
  queryFn: apiList.getCompany,
});

const store = new DataSource({
  key: "explainKey",
  load: async () => {
    const data = await apiSpecification.getSpecifications({
      from: dayjs(formData.from).format(DATE_FORMAT.YYYY_MM_DD),
      to: dayjs(formData.to).format(DATE_FORMAT.YYYY_MM_DD),
    });
    return { data };
  },
});

// 6. Computed properties

// 7. Watchers

// 8. Methods
const onSearch = () => {
  store.reload();
};

/**
 * Handles the cell preparation event for the data grid.
 * Applies CSS classes to the cell element based on the status of the corresponding data item.
 */
const onCellPrepared = (e) => {
  if (e.rowType === "data" && !e.component.isRowSelected()) {
    switch (e.data.status) {
      case "10":
        e.cellElement.classList.add("status-10");
        break;
      case "20":
        e.cellElement.classList.add("status-20");
        break;
      case "30":
        e.cellElement.classList.add("status-30");
        break;
      case "40":
        e.cellElement.classList.add("status-40");
        break;
      case "50":
        e.cellElement.classList.add("status-50");
        break;
      case "90":
        e.cellElement.classList.add("status-90");
        break;
      default:
        e.cellElement.classList.remove("status-10");
        e.cellElement.classList.remove("status-20");
        e.cellElement.classList.remove("status-30");
        e.cellElement.classList.remove("status-40");
        e.cellElement.classList.remove("status-50");
        e.cellElement.classList.remove("status-90");
        break;
    }
  }
};

const onDetail = (e) => {
  if (e.row.data?.explainKey) {
    router.push({
      name: "instruction.detail",
      params: {
        explainKey: e.row.data.explainKey,
      },
    });
  }
};

const onToolbarPreparing = (e) => {
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
        md: 2,
        lg: 2,
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
    @on:cell-prepared="onCellPrepared"
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
        data-field="explainKey"
        caption="No"
        alignment="center"
        data-type="number"
        :width="100"
      />
      <dx-column
        data-field="orderDate"
        caption="수주일자"
        alignment="center"
        data-type="date"
        :format="DATE_FORMAT.yyyy_MM_dd"
      />
      <dx-column
        data-field="orderCompKey"
        caption="수주처"
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
        data-field="goodsName"
        caption="상품명"
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
  &.dx-first-col {
    padding: 0;
  }

  &.dx-last-col {
    padding: 0 5px 0 0;
  }
}

:deep(.dx-data-row:not(.dx-row-focused)) {
  .status-10 {
    background-color: rgb(255, 250, 205) !important;
  }
  .status-20 {
    background-color: rgb(84, 130, 53) !important;
    color: white;
  }
  .status-30 {
    background-color: rgb(112, 48, 160) !important;
    color: white;
  }
  .status-40 {
    background-color: rgb(255, 0, 102) !important;
    color: white;
  }
  .status-50 {
    background-color: rgb(243, 197, 3) !important;
  }
  .status-90 {
    background-color: rgb(248, 196, 196) !important;
  }
}
</style>
