<script setup>
// 1. Imports
import { apiCompany } from "@/APIs/company.api";
import DataGrid from "@/components/common/DataGrid.vue";
import { useMutation } from "@tanstack/vue-query";
import { DxButton, DxColumn } from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import { getCurrentInstance, ref, watch } from "vue";
import * as XLSX from "xlsx";
import FormPopup from "./CompanyForm.vue";

// 2. Hooks
const vm = getCurrentInstance();

// 3. Define props, emits, models

// 4. Define refs and reactive variables
const isCreate = ref(true);
const visiblePopup = ref(false);
const selectedRow = ref();
const fileUploaderRef = ref();

// 5. APIs
const { mutate: importCompanies } = useMutation({
  mutationKey: ["batch-insert-companies"],
  mutationFn: apiCompany.batchInsertCompanies,
  onSuccess: () => {
    onReload();
  },
});

const store = new DataSource({
  key: "compKey",
  load: async () => {
    const data = await apiCompany.getCompanies();
    return { data };
  },
});

// 6. Computed properties

// 7. Watchers
/**
 * Watches the `visiblePopup` reactive variable and resets the `selectedRow` variable when the popup is closed.
 *
 * This watcher is used to ensure that the selected row is cleared when the popup is closed, preventing any lingering references to the previously selected row.
 */
watch(
  () => visiblePopup.value,
  (newVal) => {
    if (!newVal) {
      selectedRow.value = undefined;
    }
  },
);

// 8. Methods
const onReload = () => {
  store.reload();
};

/**
 * Opens the add popup for creating a new company.
 * Sets the `isCreate` flag to `true` and the `visiblePopup` flag to `true` to show the popup.
 */
const onOpenAddPopup = () => {
  isCreate.value = true;
  visiblePopup.value = true;
};

/**
 * Opens the edit popup for a selected company.
 * Sets the `selectedRow` variable to the data of the selected row, the `isCreate` flag to `false`, and the `visiblePopup` flag to `true` to show the popup.
 */
const onOpenEditPopup = (e) => {
  selectedRow.value = e.row.data;
  isCreate.value = false;
  visiblePopup.value = true;
};

/**
 * Handles the import of a company data file in Excel format.
 *
 * This function is triggered when a file is selected in the file input element.
 * It reads the Excel file, validates the header, and then maps the data to an array of company objects.
 * Finally, it calls the `importCompanies` function to import the companies.
 */
const onImport = (e) => {
  if (e.target.files.length) {
    const fileExcel = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
        header: "A",
      });

      const header = data.shift();
      if (
        header.A !== "CompKey" ||
        header.B !== "CompName" ||
        header.G !== "CompNo"
      ) {
        vm.proxy.$toast.error(
          "템플릿 파일이 올바르지 않습니다. 다시 확인해 주세요.",
        );
        return;
      }

      const formatData = data.map((item) => ({
        compKey: item.A,
        compName: item.B,
        isBuyType: item.C === "1",
        isSaleType: item.D === "1",
        isDueType: item.E === "1",
        isOtherType: item.F === "1",
        compNo: item.G,
        ceoName: item.H,
        ceoPhone: item.I,
        compAddress: item.J,
        bizConditions: item.K,
        bizType: item.L,
        compPhone: item.M,
        faxNo: item.N,
        email: item.O,
        chargeName: item.P,
        chargePhone: item.Q,
        bankName: item.R,
        accountNo: item.S,
        depositor: item.T,
        descr: item.U,
        loginId: item.V,
        password: item.W,
        isDelete: false,
      }));

      if (formatData.length) {
        importCompanies({
          singleInsert: formatData,
        });
      }
    };

    reader.readAsBinaryString(fileExcel);
  }
};

const onToolbarPreparing = (e) => {
  e.toolbarOptions.items.unshift({
    location: "after",
    widget: "dxButton",
    options: {
      icon: "plus",
      onClick: onOpenAddPopup,
    },
  });

  e.toolbarOptions.items.push({
    location: "after",
    widget: "dxButton",
    options: {
      hint: "등록",
      icon: "import",
      onClick: () => {
        fileUploaderRef.value.click();
      },
    },
  });
};

// 9. Lifecycle hooks

// 10. Others
</script>

<template>
  <data-grid
    key-expr="compKey"
    :allow-search="false"
    :allow-export="true"
    :data-source="store"
    @on:toolbar-preparing="onToolbarPreparing"
  >
    <template #columns>
      <dx-column type="buttons">
        <dx-button
          icon="edit"
          @click="onOpenEditPopup"
        />
      </dx-column>
      <dx-column
        data-field="compKey"
        caption="No"
        alignment="center"
        data-type="number"
        :width="100"
      />
      <dx-column
        data-field="compName"
        caption="거래처명"
        data-type="string"
      />
      <dx-column
        data-field="compAddress"
        caption="회사주소"
        data-type="string"
      />
      <dx-column
        data-field="compPhone"
        caption="Tel"
        data-type="string"
        :width="120"
      />
      <dx-column
        data-field="email"
        caption="이메일"
        data-type="string"
      />
      <dx-column
        data-field="faxNo"
        caption="Fax"
        data-type="string"
        :width="120"
      />
      <dx-column
        data-field="chargeName"
        caption="담당자"
        data-type="string"
        :width="120"
      />
      <dx-column
        data-field="chargePhone"
        caption="담당자연락처"
        data-type="string"
        :width="120"
      />
      <dx-column
        data-field="descr"
        caption="비고"
        data-type="string"
      />
      <dx-column
        data-field="isBuyType"
        :visible="false"
      />
      <dx-column
        data-field="isSaleType"
        :visible="false"
      />
      <dx-column
        data-field="isDueType"
        :visible="false"
      />
      <dx-column
        data-field="isOtherType"
        :visible="false"
      />
      <dx-column
        data-field="ceoName"
        :visible="false"
      />
      <dx-column
        data-field="ceoPhone"
        :visible="false"
      />
      <dx-column
        data-field="compNo"
        :visible="false"
      />
      <dx-column
        data-field="bizConditions"
        :visible="false"
      />
      <dx-column
        data-field="bizType"
        :visible="false"
      />
      <dx-column
        data-field="bankName"
        :visible="false"
      />
      <dx-column
        data-field="accountNo"
        :visible="false"
      />
      <dx-column
        data-field="depositor"
        :visible="false"
      />
      <dx-column
        data-field="loginId"
        :visible="false"
      />
      <dx-column
        data-field="password"
        :visible="false"
      />
    </template>
  </data-grid>

  <form-popup
    :data-source="store"
    :data="selectedRow"
    :isCreate="isCreate"
    v-model:visible="visiblePopup"
    @on:reload="onReload"
  />

  <input
    type="file"
    ref="fileUploaderRef"
    accept=".xls,.xlsx"
    :hidden="true"
    @change="onImport"
  />
</template>

<style lang="scss">
.image-item {
  align-items: flex-start !important;
}
</style>
