// 将数据根据id值域进行绑定
const bundleID = (data: {
  biomass_blended_fuel: {}[];
  desulfurization: {}[];
  electricity_and_heat: {}[];
  industrial_process: {}[];
  fossil_fuel: {}[];
  industrial_process_ceramic:{}[]
  information: {}[]
}) => {
  let dataArray: any[] = [];
  data.biomass_blended_fuel.forEach((element) => {
    dataArray.push(element);
  });
  data.desulfurization.forEach((element) => {
    dataArray.push(element);
  });
  data.electricity_and_heat.forEach((element) => {
    dataArray.push(element);
  });
  data.industrial_process.forEach((element) => {
    dataArray.push(element);
  });
  data.fossil_fuel.forEach((element) => {
    dataArray.push(element);
  });
  data.industrial_process_ceramic.forEach((element) => {
    dataArray.push(element);
  });
  data.information.forEach((element)=>{
    dataArray.push(element)
  })
  console.log(dataArray);
  const groupedData: { [key: string]: any[] } = {};

  for (const obj of dataArray) {
    const linkedId = obj.linked_id;

    if (linkedId) {
      if (groupedData[linkedId]) {
        groupedData[linkedId].push(obj);
      } else {
        groupedData[linkedId] = [obj];
      }
    }
  }

  const mergedArray = Object.values(groupedData).reduce(
    (acc, arr) => acc.concat(arr),
    []
  );
  // console.log(groupedData)
//   console.log(mergedArray);
  return groupedData
};

export default bundleID;
