import { getToken } from "@/utils/auth";
import { $http } from "./request";

//登录

export const setFossilFuel = (data: {
  linked_id: string;
  is_store: number;
  enterprise_id: string;
  kind: string;
  net_consumption: number;
  average_low_calorific_value: number;
  carbon_content_per_unit_calorific_value: number;
  carbon_oxidation_rate: number;
}) => {
  return $http({
    method: "POST",
    headers: {
      token: getToken(),
    },
    url: "/setFossilFuel",
    data,
  });
};

export const setDesulfurization = (data: {
  linked_id: string;
  is_store: number;
  enterprise_id: string;
  kind: string;
  desulfurizer_consumption: number;
  emission_factor: number;
}) => {
  return $http({
    method: "POST",
    headers: {
      token: getToken(),
    },
    url: "/setDesulfurization",
    data,
  });
};

export const setElectricity = (data: {
  linked_id: string;
  is_store: number;
  enterprise_id: string;
  kind_electricity: string;
  emission_factor_electricity: number;
  net_purchase_of_electricity: number;
}) => {
  return $http({
    method: "POST",
    headers: {
      token: getToken(),
    },
    url: "/setElectricityAndHeat",
    data,
  });
};

export const setElectricityAndHeat = (data: {
  linked_id: string;
  is_store: number;
  enterprise_id: string;
  kind_electricity: string;
  emission_factor_electricity: number;
  net_purchase_of_electricity: number;
  net_purchase_of_heat: number;
  emission_factor_heat: number;
}) => {
  return $http({
    method: "POST",
    headers: {
      token: getToken(),
    },
    url: "/setElectricityAndHeat",
    data,
  });
};

export const setIndustrialProcessCeramic = (data: {
  linked_id: string;
  is_store: number;
  enterprise_id: string;
  raw_material_consumption: number;
  raw_material_utilization_rate: number;
  calcium_carbonate_content: number;
  magnesium_carbonate_content: number;
}) => {
  return $http({
    method: "POST",
    headers: {
      token: getToken(),
    },
    url: "/setIndustrialProcessCeramic",
    data,
  });
};

// 工业生产排放
export const setIndustrialProcess = (data: {
  linked_id: string;
  is_store: number;
  enterprise_id: string;
  carbon_content_of_toner: number; // 碳粉含碳量'
  toner_consumption: number; //'碳粉消耗量'
  caco3_carbonate_consumption: number; // '石灰石或方解石或文石碳酸盐消耗量',
  caco3_emission_factor: number; // '石灰石或方解石或文石碳酸盐的排放因子ef
  caco3_calcination_ratio: number; // '石灰石或方解石或文石碳酸盐的煅烧比例
  mgco3_carbonate_consumption: number; // '菱镁矿碳酸盐消耗量',
  mgco3_emission_factor: number; // '菱镁矿碳酸盐的排放因子ef（tCO2/t）',
  mgco3_calcination_ratio: number; // '菱镁矿碳酸盐的煅烧比例（%）',
  camgco32_carbonate_consumption: number; // '白云石碳酸盐消耗量',
  camgco32_emission_factor: number; // '白云石碳酸盐的排放因子ef（tCO2/t）',
  camgco32_calcination_ratio: number; // '白云石碳酸盐的煅烧比例（%）',
  feco3_carbonate_consumption: number; // '菱铁矿碳酸盐消耗量',
  feco3_emission_factor: number; // '菱铁矿碳酸盐的排放因子ef（tCO2/t）',
  feco3_calcination_ratio: number; // '菱铁矿碳酸盐的煅烧比例（%）',
  mnco3_carbonate_consumption: number; // '菱锰矿碳酸盐消耗量',
  mnco3_emission_factor: number; // '菱锰矿碳酸盐的排放因子ef（tCO2/t）',
  mnco3_calcination_ratio: number; // '菱锰矿碳酸盐的煅烧比例（%）',
  na2co3_carbonate_consumption: number; // '碳酸钠或纯碱碳酸盐消耗量',
  na2co3_emission_factor: number; // '碳酸钠或纯碱碳酸盐的排放因子ef
  na2co3_calcination_ratio: number; // '碳酸钠或纯碱碳酸盐的煅烧比例（%）',
}) => {
  return $http({
    method: "POST",
    headers: {
      token: getToken(),
    },
    url: "/setIndustrialProcess",
    data,
  });
};

export const setBiomassBlendedFuel = (data: {
  linked_id: string;
  is_store: number;
  enterprise_id: string;
  kind: string;
  biomass_content: number;
  net_consumption: number;
  average_low_calorific_value: number;
  carbon_content_per_unit_calorific_value: number;
  carbon_oxidation_rate: number;
}) => {
  return $http({
    method: "POST",
    headers: {
      token: getToken(),
    },
    url: "/setBiomassBlendedFuel",
    data,
  });
};

export const setInformation = (data: {
  linked_id: string;
  annual_ce_quota:number;
  file_url_a : string;
  file_url_b : string
}) => {
  return $http({
    method: "PUT",
    headers: {
      token: getToken(),
    },
    url: "/AllCarbonAccounting/setInformation",
    data,
  });
};


//上传文件
export const uploadFile = (data: FormData) => {
  return $http({
    method: "POST",
    headers: {
      token: getToken(),
    },
    url: "/upload",
    data,
  });
};
