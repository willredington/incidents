import { UnitType } from "../../models/incident";
import {
  FiTruck,
  FiUserCheck,
  FiAlertCircle,
  FiUsers,
  FiActivity,
  FiAlertTriangle,
  FiHeart,
  FiTool,
  FiPhoneCall,
} from "react-icons/fi";
import { BsFillQuestionCircleFill as UnknownIcon } from "react-icons/bs";
import { IconType } from "react-icons";

// eslint-disable-next-line react-refresh/only-export-components
const UnitTypeIconMap = {
  [UnitType.TRUCK_AERIAL]: FiTruck,
  [UnitType.CHIEF]: FiUserCheck,
  [UnitType.ENGINE]: FiAlertCircle,
  [UnitType.SQUAD]: FiUsers,
  [UnitType.MEDICAL]: FiActivity,
  [UnitType.HAZMAT]: FiAlertTriangle,
  [UnitType.ALS_BLS]: FiHeart,
  [UnitType.UTILITY]: FiTool,
  [UnitType.CRISIS_RESPONSE]: FiPhoneCall,
} as const;

function isValidUnitType(unitTypeStr: string): unitTypeStr is UnitType {
  return Object.values(UnitType).includes(unitTypeStr as UnitType);
}

export function getIcon(unitType: string): IconType {
  return isValidUnitType(unitType) ? UnitTypeIconMap[unitType] : UnknownIcon;
}
