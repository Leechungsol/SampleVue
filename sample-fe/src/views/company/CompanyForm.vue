<script setup>
// 1. Imports
import { apiCompany } from "@/APIs/company.api";
import Popup from "@/components/common/Popup.vue";
import { formatPhoneNumber } from "@/utils/input-phone.util";
import { sizes } from "@/utils/media-query.util";
import { getFullBase64 } from "@/utils/mime-type.util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { DxButton } from "devextreme-vue";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import {
  DxEmailRule,
  DxForm,
  DxGroupItem,
  DxItem,
  DxLabel,
  DxPatternRule,
  DxRequiredRule,
} from "devextreme-vue/form";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import { formatMessage } from "devextreme/localization";
import "devextreme/ui/text_area";
import { isNil, omitBy } from "lodash";
import { computed, getCurrentInstance, ref } from "vue";

// 2. Hooks
const queryClient = useQueryClient();
const vm = getCurrentInstance();

// 3. Define props, emits, models
const visible = defineModel("visible", { type: Boolean });
const emits = defineEmits(["on:reload"]);
const props = defineProps({
  data: Object,
  isCreate: Boolean,
});

// 4. Define refs and reactive variables
const formRef = ref();
const formData = ref();
const imageUrl = ref(undefined);
const imageFiles = ref([]);

// 5. APIs
const { mutate: createCompany } = useMutation({
  mutationKey: ["create-company"],
  mutationFn: apiCompany.createCompany,
  onSuccess: (res) => {
    vm.proxy.$toast.success(formatMessage("msg.success"));
    uploadImagePrepare(res.compKey);
    emits("on:reload");
    visible.value = false;
  },
});

const { mutate: updateCompany } = useMutation({
  mutationKey: ["update-company"],
  mutationFn: apiCompany.updateCompany,
  onSuccess: () => {
    vm.proxy.$toast.success(formatMessage("msg.success"));
    uploadImagePrepare(props.data.compKey);
    emits("on:reload");
    visible.value = false;
  },
});

const { mutate: uploadImage } = useMutation({
  mutationKey: ["update-image"],
  mutationFn: apiCompany.uploadImage,
});

const { refetch: getImage, isFetching } = useQuery({
  enabled: false,
  queryKey: ["get-image-by-comp-key"],
  queryFn: () => apiCompany.getImageByCompKey({ compKey: props.data.compKey }),
  select: (res) => {
    imageUrl.value = res.image ? getFullBase64(res.image) : undefined;
    return res;
  },
});

// 6. Computed properties
const labelLocation = computed(() =>
  sizes()["screen-x-small"] ? "top" : "left",
);

// 7. Watchers

// 8. Methods
/**
 * Handles the save action for the company form.
 * If the form is valid and an image has been selected, it will either create a new company or update an existing one.
 * If no image has been selected, it will display an error message.
 */
const onSave = () => {
  const result = formRef.value.instance.validate();
  if (result.isValid) {
    if (!imageUrl.value) {
      vm.proxy.$toast.error("하나의 이미지를 선택해야 합니다.");
    } else {
      if (props.isCreate) {
        createCompany(formData.value);
      } else {
        updateCompany(formData.value);
      }
    }
  }
};

/**
 * Handles the initialization of the company form when it is shown.
 * If the form is being edited (i.e. `props.data.compKey` is not `null`), it fetches the image associated with the company.
 * It also updates the form data with the provided `props.data`, omitting any `null` or `undefined` values.
 */
const onShowing = () => {
  onDeleteImage();
  queryClient.removeQueries({
    queryKey: ["get-image-by-comp-key"],
    exact: true,
  });
  formData.value = omitBy(props.data, (item) => isNil(item) || item === "");

  if (!isNil(props.data?.compKey)) {
    getImage();
  }
};

/**
 * Prepares and uploads an image associated with a company.
 */
const uploadImagePrepare = (compKey) => {
  if (imageFiles.value.length) {
    const formDataUpload = new FormData();
    formDataUpload.append("compKey", compKey);
    formDataUpload.append("image", imageFiles.value[0]);
    uploadImage(formDataUpload);
  }
};

/**
 * Handles the change event when an image is selected for upload.
 * It updates the `imageFiles` and `imageUrl` values based on the selected file.
 */
const onImageChanged = (e) => {
  imageFiles.value = e.value;
  if (e.value.length) {
    const reader = new FileReader();
    reader.readAsDataURL(e.value[0]);
    reader.onload = () => {
      imageUrl.value = reader.result;
    };
  }
};

/**
 * Deletes the currently selected image by setting the `imageUrl` and `imageFiles` values to `undefined` and an empty array, respectively.
 */
const onDeleteImage = () => {
  imageUrl.value = undefined;
  imageFiles.value = [];
};

/**
 * Initializes a checkbox component by setting its value to `false` if it is `undefined`.
 */
const onInitializedCheckBox = (e) => {
  if (isNil(e.component.option("value"))) {
    e.component.option("value", false);
  }
};

// 9. Lifecycle hooks

// 10. Others
</script>

<template>
  <popup
    title="거래처 등록"
    :max-height="800"
    v-model:visible="visible"
    @on:save="onSave"
    @on:showing="onShowing"
    @on:hidden="onHidden"
  >
    <template #content>
      <dx-form
        ref="formRef"
        :col-count="2"
        :form-data="formData"
        :label-location="labelLocation"
        :show-colon-after-label="false"
      >
        <dx-item
          data-field="compKey"
          editor-type="dxTextBox"
          :is-required="false"
          :disabled="true"
        >
          <dx-label text="No" />
        </dx-item>

        <dx-group-item
          :col-count-by-screen="{
            xs: 2,
            sm: 4,
            md: 4,
            lg: 4,
          }"
        >
          <dx-item
            data-field="isBuyType"
            editor-type="dxCheckBox"
            :editor-options="{
              onInitialized: onInitializedCheckBox,
            }"
          >
            <dx-label
              text="매입처"
              location="right"
            />
          </dx-item>
          <dx-item
            data-field="isSaleType"
            editor-type="dxCheckBox"
            :editor-options="{
              onInitialized: onInitializedCheckBox,
            }"
          >
            <dx-label
              text="매출처"
              location="right"
            />
          </dx-item>
          <dx-item
            data-field="isDueType"
            editor-type="dxCheckBox"
            :editor-options="{
              onInitialized: onInitializedCheckBox,
            }"
          >
            <dx-label
              text="납품처"
              location="right"
            />
          </dx-item>
          <dx-item
            data-field="isOtherType"
            editor-type="dxCheckBox"
            :editor-options="{
              onInitialized: onInitializedCheckBox,
            }"
          >
            <dx-label
              text="기타"
              location="right"
            />
          </dx-item>
        </dx-group-item>

        <dx-item
          data-field="compName"
          editor-type="dxTextBox"
          :editor-options="{
            maxLength: 50,
          }"
        >
          <dx-required-rule />
          <dx-label text="거래처명" />
        </dx-item>

        <dx-item
          data-field="ceoName"
          editor-type="dxTextBox"
          :editor-options="{
            maxLength: 50,
          }"
        >
          <dx-label text="대표자명" />
        </dx-item>

        <dx-item
          data-field="ceoPhone"
          editor-type="dxTextBox"
          :editor-options="{
            maxLength: 20,
          }"
        >
          <dx-label text="대표자연락처" />
        </dx-item>

        <dx-item
          data-field="compNo"
          editor-type="dxTextBox"
          :editor-options="{
            maxLength: 15,
          }"
        >
          <dx-label text="사업자번호" />
        </dx-item>

        <dx-item
          data-field="bizConditions"
          editor-type="dxTextBox"
          :editor-options="{
            maxLength: 50,
          }"
        >
          <dx-label text="업태" />
        </dx-item>

        <dx-item
          data-field="bizType"
          editor-type="dxTextBox"
          :editor-options="{
            maxLength: 50,
          }"
        >
          <dx-label text="종목" />
        </dx-item>

        <dx-item
          data-field="compAddress"
          editor-type="dxTextBox"
          :col-span="2"
          :editor-options="{
            maxLength: 500,
          }"
        >
          <dx-label text="사업장주소" />
        </dx-item>

        <dx-item
          data-field="compPhone"
          editor-type="dxTextBox"
          :editor-options="{
            maxLength: 20,
            mode: 'tel',
            onKeyUp: formatPhoneNumber,
          }"
        >
          <dx-pattern-rule
            :pattern="/^[0-9-]+$/"
            :message="formatMessage('validation-pattern-phone')"
          />
          <dx-label text="Tel" />
        </dx-item>

        <dx-item
          data-field="faxNo"
          editor-type="dxTextBox"
          :editor-options="{
            maxLength: 20,
            mode: 'tel',
            onKeyUp: formatPhoneNumber,
          }"
        >
          <dx-pattern-rule
            :pattern="/^[0-9-]+$/"
            :message="formatMessage('validation-pattern-fax')"
          />
          <dx-label text="Fax" />
        </dx-item>

        <dx-item
          data-field="email"
          editor-type="dxTextBox"
          :col-span="2"
          :editor-options="{
            mode: 'email',
            maxLength: 50,
          }"
        >
          <dx-email-rule />
          <dx-label text="E-mail" />
        </dx-item>

        <dx-item
          data-field="bankName"
          editor-type="dxTextBox"
          :col-span="2"
          :editor-options="{
            maxLength: 50,
          }"
        >
          <dx-label text="거래은행" />
        </dx-item>

        <dx-item
          data-field="accountNo"
          editor-type="dxTextBox"
          :editor-options="{
            maxLength: 20,
          }"
        >
          <dx-label text="계좌번호" />
        </dx-item>

        <dx-item
          data-field="depositor"
          editor-type="dxTextBox"
          :editor-options="{
            maxLength: 50,
          }"
        >
          <dx-label text="예금주" />
        </dx-item>

        <dx-item
          data-field="chargeName"
          editor-type="dxTextBox"
          :col-span="2"
          :editor-options="{
            maxLength: 50,
          }"
        >
          <dx-label text="부서 담당자" />
        </dx-item>

        <dx-item
          data-field="chargePhone"
          editor-type="dxTextBox"
          :col-span="2"
          :editor-options="{
            maxLength: 20,
            mode: 'tel',
            onKeyUp: formatPhoneNumber,
          }"
        >
          <dx-pattern-rule
            :pattern="/^[0-9-]+$/"
            :message="formatMessage('validation-pattern-phone')"
          />
          <dx-label text="담당자 연락처" />
        </dx-item>

        <dx-item
          data-field="loginId"
          editor-type="dxTextBox"
          :col-span="2"
          :editor-options="{
            maxLength: 30,
            inputAttr: {
              autocomplete: 'new-password',
            },
          }"
        >
          <dx-label text="로그인 ID" />
        </dx-item>

        <dx-item
          data-field="password"
          editor-type="dxTextBox"
          :col-span="2"
          :editor-options="{
            maxLength: 30,
            mode: 'password',
            inputAttr: {
              autocomplete: 'new-password',
            },
          }"
        >
          <dx-label text="비밀번호" />
        </dx-item>

        <dx-item
          data-field="descr"
          editor-type="dxTextArea"
          :col-span="2"
          :editor-options="{
            height: 100,
            maxLength: 500,
          }"
        >
          <dx-label text="비고" />
        </dx-item>

        <dx-item
          data-field="image"
          css-class="image-item"
          :col-span="2"
        >
          <dx-label text="이미지" />
          <dx-load-indicator :visible="isFetching" />
          <img
            v-if="imageUrl"
            :height="200"
            :src="imageUrl"
          />
          <div class="image-uploader-container">
            <dx-button
              v-if="imageUrl"
              icon="trash"
              type="danger"
              @click="onDeleteImage"
            />
            <dx-file-uploader
              accept="image/*"
              upload-mode="useForm"
              labelText=""
              :show-file-list="false"
              @value-changed="onImageChanged"
            />
          </div>
        </dx-item>
      </dx-form>
    </template>
  </popup>
</template>

<style scoped lang="scss">
.dropzone-image-company {
  cursor: pointer;
  height: 200px;
  border: dashed 2px var(--dx-color-border);
  border-radius: var(--dx-border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-uploader-container {
  display: flex;
  gap: 6px;
}

:deep(.dx-fileuploader-wrapper) {
  padding: 0;
  width: 100px;
}

:deep(.dx-fileuploader-files-container) {
  padding: 0;
}

:deep(.dx-fileuploader-input-wrapper) {
  padding: 0;
  border: 0;

  &::before {
    content: none;
  }
}

:deep(.item-hidden) {
  visibility: hidden;
}
</style>
