import Datatable from "./Datatable/Datatable.vue";
import DatatableHeader from "./Datatable/DatatableHeader.vue";
import DatatableFooter from "./Datatable/DatatableFooter.vue";
import DatatableSearch from "./Datatable/DatatableSearch.vue";
import DatatableFilter from "./Datatable/DatatableFilter.vue";

import ButtonDelete from "./Buttons/ButtonDelete.vue";
import ButtonConfirmModal from "./Buttons/ButtonConfirmModal.vue";
import ButtonSubmit from "./Buttons/ButtonSubmit.vue";
import ButtonAddModal from "./Buttons/ButtonAddModal.vue";

import AppearingBullets from "./Misc/AppearingBullets.vue";
import SecureChange from "./Misc/SecureChange.vue";
import CodeInput from "./Misc/CodeInput.vue";

import LocaleSwitcher from "./Misc/LocaleSwitcher.vue";
import EmailInput from "./Inputs/EmailInput/EmailInput.vue";

import BaseList from "./Base/BaseList.vue";
import ListSearchComponent from "./Base/ListSearchComponent.vue";

import ButtonConfirmWithNote from "./Buttons/ButtonConfirmWithNote.vue";
import PageHeader from "./Pages/PageHeader.vue";
import CardHeader from "./Pages/CardHeader.vue";
import CardFooter from "./Pages/CardFooter.vue";

import DatePopup from "./Inputs/DatePopup.vue";

import PerformancePage from "./Pages/PerformancePage.vue";

import BlacklistedIps from "./Security/BlacklistedIps.vue";
import ActionTarpits from "./Security/ActionTarpits.vue";

import LoadGraph from "./Performance/LoadGraph.vue";
import PerformanceCard from "./Performance/PerformanceCard.vue";
import SlowPages from "./Performance/SlowPages.vue";
import TopPages from "./Performance/TopPages.vue";
import WeightedPages from "./Performance/WeightedPages.vue";

import ButtonAjax from "./Buttons/ButtonAjax.vue";
import LoadingOverlay from "./Misc/LoadingOverlay.vue";
import RbacLink from "./Misc/RbacLink.vue";


// @ts-ignore
import {
  doLogout,
  isLoggedIn,
  removeTokensAdmin,
  removeTokensUser,
  storeTokens
} from "./Plugins/loginhelper.js";

// @ts-ignore
import getLocale from "./Plugins/locale.js";

// @ts-ignore
import axios from "./Plugins/axios.js";

//@ts-ignore
import {getFirstValidationError, mergeErrors} from "./Helpers/formhelper.js";

//@ts-ignore
import translations from '../lang/translations';

export {
  Datatable,
  DatatableHeader,
  DatatableFooter,
  DatatableSearch,
  DatatableFilter,
  ButtonDelete,
  ButtonConfirmModal,
  ButtonSubmit,
  ButtonAddModal,
  AppearingBullets,
  CodeInput,
  EmailInput,
  isLoggedIn, doLogout, removeTokensUser, removeTokensAdmin, storeTokens,
  getLocale,
  mergeErrors,
  getFirstValidationError,
  axios,
  LocaleSwitcher,
  translations,
  SecureChange,
  BaseList,
  ListSearchComponent,
  ButtonConfirmWithNote,
  PageHeader,
  CardHeader,
  CardFooter,
  PerformancePage,
  DatePopup,
  BlacklistedIps,
  ActionTarpits,
  LoadGraph,
  PerformanceCard,
  SlowPages,
  TopPages,
  WeightedPages,
  ButtonAjax,
  LoadingOverlay,
  RbacLink,
};
