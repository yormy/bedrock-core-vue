//import BaseList from "./Base/BaseList.vue";
//import ButtonAjax from "./Buttons/ButtonAjax.vue";
//import ListSearchComponent from "./Base/ListSearchComponent.vue";
//import RbacLink from "./Misc/RbacLink.vue";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import ActionTarpits from "./Security/ActionTarpits.vue";
import AdminJobDetails from "./Logs/AdminJobsDetails.vue";
import AppearingBullets from "./Misc/AppearingBullets.vue";
import BAutocomplete from "./Inputs/Autocomplete.vue";
import BChip from "./Inputs/Chip.vue";
import BDropdown from "./Inputs/Dropdown.vue";
import BSelectMultipleChips from "./Inputs/SelectMultipleChips.vue";
import BSwitch from "./Inputs/Switch.vue";
import BSwitchMultiple from "./Inputs/SwitchMultiple.vue";
import BTextArea from "./Inputs/TextArea.vue";
import BTextField from "./Inputs/TextField.vue";
import BaseSettings from "./Misc/Settings/BaseSettings.vue";
import BlacklistedIps from "./Security/BlacklistedIps.vue";
import BrandingSettings from "./Misc/Settings/BrandingSettings.vue";
import ButtonAddModal from "./Buttons/ButtonAddModal.vue";
import ButtonConfirmModal from "./Buttons/ButtonConfirmModal.vue";
import ButtonConfirmWithNote from "./Buttons/ButtonConfirmWithNote.vue";
import ButtonDelete from "./Buttons/ButtonDelete.vue";
import ButtonSubmit from "./Buttons/ButtonSubmit.vue";
import CardFooter from "./PageDesign/CardFooter.vue";
import CardHeader from "./PageDesign/CardHeader.vue";
import CodeInput from "./Misc/CodeInput.vue";
import Datatable from "./Datatable/Datatable.vue";
import DatatableFilter from "./Datatable/DatatableFilter.vue";
import DatatableFooter from "./Datatable/DatatableFooter.vue";
import DatatableHeader from "./Datatable/DatatableHeader.vue";
import DatatableSearch from "./Datatable/DatatableSearch.vue";
import DatePicker from "./Misc/DatePicker.vue";
import DatePopup from "./Inputs/DatePopup.vue";
import DateTimePicker from "./Misc/DateTimePicker.vue";
import Edit from './Crud/Edit.vue';
import EmailContent from './Components/EmailContent.vue';
import EmailInput from "./Inputs/EmailInput/EmailInput.vue";
import EmailTemplateEdit from "./System/Communications/EmailTemplates/EmailTemplateEdit.vue";
import EmailTemplateIndex from "./System/Communications/EmailTemplates/EmailTemplateIndex.vue";
import EmailTemplateShow from "./System/Communications/EmailTemplates/EmailTemplateShow.vue";
import ErrorMessage from "./Alerts/ErrorMessage.vue";
import FileDropzoneUpload from "./Misc/FileDropzoneUpload.vue";
import HtmlArea from "./Inputs/HtmlArea.vue";
import InfoIcon from "./Buttons/InfoIcon.vue";
import InfoMessage from "./Alerts/InfoMessage.vue";
import LayoutAdminCenter from "./Layouts/Admin/Center.vue";
import LayoutAdminLogin from "./Layouts/Admin/Center.vue";
import LayoutAdminMain from "./Layouts/Admin/Main.vue";
import LayoutMemberLogin from "./Layouts/Member/Login.vue";
import LayoutMemberMain from "./Layouts/Member/Main.vue";
import LayoutMemberRight from "./Layouts/Member/Right.vue";
import LoadGraph from "./Performance/LoadGraph.vue";
import LoadingOverlay from "./Misc/LoadingOverlay.vue";
import LocaleSwitcher from "./Misc/LocaleSwitcher.vue";
import LogActivityActivities from "./Logs/LogActivityActivities.vue";
import LogActivityAudit from "./Logs/LogActivityAudit.vue";
import MarketingPromoEdit from "./System/Communications/MarketingPromo/MarketingPromoEdit.vue";
import MarketingPromoIndex from "./System/Communications/MarketingPromo/MarketingPromoIndex.vue";
import MarketingPromoShow from "./System/Communications/MarketingPromo/MarketingPromoShow.vue";
import MarketingSnippitEdit
  from "./System/Communications/MarketingSnippit/MarketingSnippitEdit.vue";
import MarketingSnippitIndex
  from "./System/Communications/MarketingSnippit/MarketingSnippitIndex.vue";
import MarketingSnippitShow
  from "./System/Communications/MarketingSnippit/MarketingSnippitShow.vue";
import MessageModal from "./Modals/MessageModal.vue";
import Messages from "./Alerts/Messages.vue";
import PageHeader from "./PageDesign/PageHeader.vue";
import PasswordInput from "./Inputs/PasswordInput.vue";
import PerformanceCard from "./Performance/PerformanceCard.vue";
import PerformancePage from "./PageDesign/PerformancePage.vue";
import SecureChange from "./Misc/SecureChange.vue";
import ServerLogAccess from "./Logs/ServerLogAccess.vue";
import ServerLogErrors from "./Logs/ServerLogErrors.vue";
import SlowPages from "./Performance/SlowPages.vue";
import SuccessMessage from "./Alerts/SuccessMessage.vue";
import TopPages from "./Performance/TopPages.vue";
import TopbarDropdownItem from "./Misc/TopbarDropdownItem.vue";
import UpdateModal from "./Modals/UpdateModal.vue";
import ViewModal from "./Modals/ViewModal.vue";
import WarningMessage from "./Alerts/WarningMessage.vue";
import WeightedPages from "./Performance/WeightedPages.vue";

// @ts-ignore
import {
  adminCan,
  deletePermissions,
  doLogout,
  isLoggedIn,
  memberCan,
  removeTokensAdmin,
  removeTokensUser,
  storePermissions,
  storeTokens,
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
  //BaseList,
  //ListSearchComponent,
  //RbacLink,
  ActionTarpits,
  AdminJobDetails,
  AppearingBullets,
  BAutocomplete,
  BChip,
  BDropdown,
  BSelectMultipleChips,
  BSwitch,
  BSwitchMultiple,
  BTextArea,
  BTextField,
  BaseSettings,
  BlacklistedIps,
  BrandingSettings,
  ButtonAddModal,
  ButtonConfirmModal,
  ButtonConfirmWithNote,
  ButtonDelete,
  ButtonSubmit,
  CardFooter,
  CardHeader,
  CodeInput,
  Datatable,
  DatatableFilter,
  DatatableFooter,
  DatatableHeader,
  DatatableSearch,
  DatePicker,
  DatePopup,
  DateTimePicker,
  Edit,
  EmailContent,
  EmailInput,
  EmailTemplateEdit,
  EmailTemplateIndex,
  EmailTemplateShow,
  ErrorMessage,
  FileDropzoneUpload,
  HtmlArea,
  InfoIcon,
  InfoMessage,
  LayoutAdminCenter,
  LayoutAdminLogin,
  LayoutAdminMain,
  LayoutMemberLogin,
  LayoutMemberMain,
  LayoutMemberRight,
  LoadGraph,
  LoadingOverlay,
  LocaleSwitcher,
  LogActivityActivities,
  LogActivityAudit,
  MarketingPromoEdit,
  MarketingPromoIndex,
  MarketingPromoShow,
  MarketingSnippitEdit,
  MarketingSnippitIndex,
  MarketingSnippitShow,
  MessageModal,
  Messages,
  PageHeader,
  PasswordInput,
  PerformanceCard,
  PerformancePage,
  SecureChange,
  ServerLogAccess,
  ServerLogErrors,
  SlowPages,
  SuccessMessage,
  TopPages,
  TopbarDropdownItem,
  UpdateModal,
  ViewModal,
  WarningMessage,
  WeightedPages,
  adminCan,
  axios,
  deletePermissions,
  doLogout,
  getFirstValidationError,
  getLocale,
  isLoggedIn,
  memberCan,
  removeTokensAdmin,
  removeTokensUser,
  storePermissions,
  storeTokens,
  translations,
//  ButtonAjax,
};
