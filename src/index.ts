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
import PasswordInput from "./Inputs/PasswordInput.vue";

//import BaseList from "./Base/BaseList.vue";
//import ListSearchComponent from "./Base/ListSearchComponent.vue";
import ButtonConfirmWithNote from "./Buttons/ButtonConfirmWithNote.vue";
import PageHeader from "./Pages/PageHeader.vue";
import CardHeader from "./Pages/CardHeader.vue";
import CardFooter from "./Pages/CardFooter.vue";

import DatePopup from "./Inputs/DatePopup.vue";
import BTextField from "./Inputs/TextField.vue";
import BTextArea from "./Inputs/TextArea.vue";
import BSwitch from "./Inputs/Switch.vue";
import BSwitchMultiple from "./Inputs/SwitchMultiple.vue";
import BDropdown from "./Inputs/Dropdown.vue";
import BAutocomplete from "./Inputs/Autocomplete.vue";
import BChip from "./Inputs/Chip.vue";

import PerformancePage from "./Pages/PerformancePage.vue";

import BlacklistedIps from "./Security/BlacklistedIps.vue";
import ActionTarpits from "./Security/ActionTarpits.vue";

import MarketingSnippits from "./System/Communications/MarketingSnippits.vue";
import MarketingPromos from "./System/Communications/MarketingPromos.vue";
import EmailTemplates from "./System/Communications/EmailTemplates.vue";

import LoadGraph from "./Performance/LoadGraph.vue";
import PerformanceCard from "./Performance/PerformanceCard.vue";
import SlowPages from "./Performance/SlowPages.vue";
import TopPages from "./Performance/TopPages.vue";
import WeightedPages from "./Performance/WeightedPages.vue";

//import ButtonAjax from "./Buttons/ButtonAjax.vue";
import LoadingOverlay from "./Misc/LoadingOverlay.vue";
import RbacLink from "./Misc/RbacLink.vue";


import TopbarDropdownItem from "./Misc/TopbarDropdownItem.vue";
import FileDropzoneUpload from "./Misc/FileDropzoneUpload.vue";

import ServerLogAccess from "./Logs/ServerLogAccess.vue";
import ServerLogErrors from "./Logs/ServerLogErrors.vue";

import Messages from "./Alerts/Messages.vue";
import ErrorMessage from "./Alerts/ErrorMessage.vue";
import SuccessMessage from "./Alerts/SuccessMessage.vue";
import WarningMessage from "./Alerts/WarningMessage.vue";
import InfoMessage from "./Alerts/InfoMessage.vue";

import MessageModal from "./Modals/MessageModal.vue";

import BrandingSettings from "./Misc/Settings/BrandingSettings.vue";
import InfoIcon from "./Buttons/InfoIcon.vue";

import 'vue2-dropzone/dist/vue2Dropzone.min.css';


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
import {getFirstValidationError} from "./Helpers/formhelper.js";

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
  PasswordInput,
  isLoggedIn, doLogout, removeTokensUser, removeTokensAdmin, storeTokens,
  getLocale,
  getFirstValidationError,
  axios,
  LocaleSwitcher,
  translations,
  SecureChange,
  //BaseList,
  //ListSearchComponent,
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
//  ButtonAjax,
  LoadingOverlay,
  RbacLink,
  TopbarDropdownItem,
  FileDropzoneUpload,
  ServerLogAccess,
  ServerLogErrors,
  Messages,
  ErrorMessage,
  SuccessMessage,
  WarningMessage,
  InfoMessage,
  BTextField,
  BTextArea,
  BChip,
  BDropdown,
  BAutocomplete,
  MessageModal,
  BrandingSettings,
  InfoIcon,
  BSwitch,
  BSwitchMultiple,
  MarketingSnippits,
  MarketingPromos,
  EmailTemplates,
};
