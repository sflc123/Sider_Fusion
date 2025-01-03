import { reactive } from "vue";

export interface AlarmData {
  date: string;
  name: string;
  address: string;
  //筛选条件
  tag: string;
}
const tableData: AlarmData[] = reactive([]);
const addUserData = (userData: AlarmData) => {
  tableData.unshift(userData);
};

const removeUserData = (index: number) => {
  tableData.splice(index, 1);
};

// 其他增删改查操作...

export { tableData, addUserData, removeUserData };
