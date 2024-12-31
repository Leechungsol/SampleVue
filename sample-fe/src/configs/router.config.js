import { apiRank } from "@/APIs/rank.api";
import { LOCAL_STORAGE } from "@/constants/local-storage.constant";
import navigations from "@/constants/navigation.constant";
import errorLayout from "@/layouts/Error.vue";
import privateLayout from "@/layouts/Private.vue";
import publicLayout from "@/layouts/Public.vue";
import { routeStore } from "@/stores/route.store";
import authUtil from "@/utils/auth.util";
import dayjs from "dayjs";
import { find } from "lodash";
import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const Home = defineAsyncComponent(() => import("@/views/Home.vue"));
const Login = defineAsyncComponent(() => import("@/views/login/Login.vue"));
const InstructionGrid = defineAsyncComponent(
  () => import("@/views/instruction/InstructionGrid.vue"),
);
const InstructionDetail = defineAsyncComponent(
  () => import("@/views/instruction/InstructionDetail.vue"),
);
const MouldedGrid = defineAsyncComponent(
  () => import("@/views/moulded/MouldedGrid.vue"),
);
const MouldedDetail = defineAsyncComponent(
  () => import("@/views/moulded/MouldedDetail.vue"),
);
const FinalDueGrid = defineAsyncComponent(
  () => import("@/views/final-due/FinalDueGrid.vue"),
);
const FinalDueDetail = defineAsyncComponent(
  () => import("@/views/final-due/FinalDueDetail.vue"),
);
const NoneShipmentGrid = defineAsyncComponent(
  () => import("@/views/none-shipment/NoneShipmentGrid.vue"),
);
const ChartGrid = defineAsyncComponent(
  () => import("@/views/chart/ChartGrid.vue"),
);
const CompanyGrid = defineAsyncComponent(
  () => import("@/views/company/CompanyGrid.vue"),
);

const router = new createRouter({
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        requiresAuth: true,
        layout: privateLayout,
      },
      component: Home,
    },
    {
      path: "/instruction",
      name: "instruction.grid",
      meta: {
        requiresAuth: true,
        layout: privateLayout,
      },
      component: InstructionGrid,
    },
    {
      path: "/instruction/:explainKey",
      name: "instruction.detail",
      meta: {
        requiresAuth: true,
        layout: privateLayout,
      },
      component: InstructionDetail,
    },
    {
      path: "/moulded",
      name: "moulded.grid",
      meta: {
        requiresAuth: true,
        layout: privateLayout,
      },
      component: MouldedGrid,
    },
    {
      path: "/moulded-detail",
      name: "moulded.detail",
      meta: {
        requiresAuth: true,
        layout: privateLayout,
      },
      component: MouldedDetail,
    },
    {
      path: "/final-due",
      name: "final-due.grid",
      meta: {
        requiresAuth: true,
        layout: privateLayout,
      },
      component: FinalDueGrid,
    },
    {
      path: "/final-due/:explainKey",
      name: "final-due.detail",
      meta: {
        requiresAuth: true,
        layout: privateLayout,
      },
      component: FinalDueDetail,
    },
    {
      path: "/none-shipment",
      name: "none-shipment",
      meta: {
        requiresAuth: true,
        layout: privateLayout,
      },
      component: NoneShipmentGrid,
    },
    {
      path: "/company",
      name: "company",
      meta: {
        requiresAuth: true,
        layout: privateLayout,
      },
      component: CompanyGrid,
    },
    {
      path: "/chart",
      name: "chart",
      meta: {
        requiresAuth: true,
        layout: privateLayout,
      },
      component: ChartGrid,
    },
    {
      path: "/login",
      name: "login",
      meta: {
        requiresAuth: false,
        layout: publicLayout,
      },
      component: Login,
    },
    {
      path: "/not-found",
      name: "not-found",
      meta: {
        requiresAuth: false,
        layout: errorLayout,
        content: "이 페이지는 존재하지 않습니다.",
      },
    },
    {
      path: "/forbidden",
      name: "forbidden",
      meta: {
        requiresAuth: true,
        layout: errorLayout,
        content: "이 페이지에 접근할 권한이 없습니다.",
      },
    },
  ],
  history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
  /**
   * Checks the user's login status and logs out the user if they have been inactive for more than 10 seconds.
   * This function is called in the `beforeEach` hook of the Vue Router to handle authentication and authorization.
   * It retrieves the last active time from local storage, calculates the duration since the last active time, and logs out the user if the duration exceeds 10 seconds.
   */
  if (authUtil.isLoggedIn()) {
    const lastActiveTime = localStorage.getItem(LOCAL_STORAGE.LAST_ACTIVE_TIME);
    if (lastActiveTime && dayjs(lastActiveTime).isValid()) {
      const duration = dayjs().diff(dayjs(lastActiveTime), "minutes");
      localStorage.removeItem(LOCAL_STORAGE.LAST_ACTIVE_TIME);
      if (duration > +process.env.VUE_APP_DURATION_LOGOUT) {
        authUtil.logOut();
      }
    }
  }

  if (!routeStore.ranks && authUtil.isLoggedIn()) {
    routeStore.isLoading = true;
    const res = await apiRank
      .getRankWebMapping()
      .then((data) => {
        routeStore.ranks = data;
        return data;
      })
      .catch(() => {
        next({ name: "home" });
      })
      .finally(() => {
        routeStore.isLoading = false;
      });

    if (["home", "login"].includes(to.name)) {
      next({ name: "home" });
    }

    const menuItem = find(
      navigations,
      (item) => item.path !== "/" && to.path.startsWith(item.path),
    );
    const existItem = find(res, (item) => item.formId === menuItem?.formId);
    if (!menuItem?.formId) {
      next({ name: "not-found" });
    } else if (!existItem) {
      next({ name: "forbidden" });
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authUtil.isLoggedIn()) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
