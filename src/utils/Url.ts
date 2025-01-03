import axios from "axios";
import { ref, type Ref } from "vue";

// 从输出中找到你连接的WiFi接口，并获取其IPv4或IPv6地址
const id = 1;
const TopUrl = "https://192.168.1.106:1234/api/ApiUrl";
const url0: Ref<string | null> = ref(localStorage.getItem("apiUrl1") || null);
const url1: Ref<string | null> = ref(localStorage.getItem("apiUrl2") || null);
function initializeUrls(): Promise<void> {
  if (!url0.value || !url1.value) {
    // 注意：这里返回了axios.get的promise，并处理了可能的错误
    axios.get(TopUrl).then(response => {
      url0.value = response.data[0];
      url1.value = response.data[1];
      console.log(response.data);
      localStorage.setItem("apiUrl1", url0.value);
      localStorage.setItem("apiUrl2", url1.value);
      console.log(url0.value, url1.value);
    });
    // return axios
    //   .get(TopUrl)
    //   .then(response => {
    //     url0.value = response.data[0];
    //     url1.value = response.data[1];
    //     localStorage.setItem("apiUrl1", url0.value);
    //     localStorage.setItem("apiUrl2", url1.value);
    //     console.log(url0.value, url1.value);
    //   })
    //   .catch(error => {
    //     console.error("Failed to fetch API URLs:", error);
    //   });
  }
  // 如果url1.value和url2.value都有值，你可能想立即返回一个已解决的promise
  return Promise.resolve();
}
const baseURL = `${url1.value}/PourSelect/PourSelectC`;
const urls = {
  //用户信息
  users: {
    adduser: `${url1.value}/LoginOperator/PostAdd`,
    getusers: `${url1.value}/LoginOperator/GetList`,
    deleteuser: `${url1.value}/LoginOperator/DeleteUser?ID=`,
    updateuser: `${url1.value}/LoginOperator/PutUpdate`,
    getbyid: `${url1.value}/LoginOperator/GetByID/ID?ID=`
  },

  //参数信息
  paraUrl: `${url1.value}/PARA/PARA/SelectAll`,
  UpdateparaUrl: `${url1.value}/PARA/PARA/Update`,
  //登录token
  Logins: {
    //https://192.168.0.24:1234/LoginOperator/LoginAndGetToken
    Tokenkeys: `${url1.value}/LoginOperator/LoginAndGetToken`
  },
  // 工作模式
  craneMode: {
    _GetCraneMode: `${url1.value}/CraneMode/CraneMode/GetCraneMode`,
    _PutWorkMode: `${url1.value}/CraneMode/CraneMode/PutWorkMode/${id}`,
    _PutPourNO: `${url1.value}/CraneMode/CraneMode/PutPourNO/${id}`
  },

  // PLC相关的URLs
  plc: {
    GC104: `${url1.value}/plc/read/104`,
    CG301: `${url1.value}/plc/read/301`,
    CG102: `${url1.value}/plc/read/102`,
    Read301: `http://192.168.0.17:5078/api/AutoCrane/AutoRuning`,

    EndWork: `http://192.168.0.17:5078/api/AutoCrane/StopAutoRuning`,
    ReadPlcStatus: `http://192.168.0.17:5078/plc/PlcStatus/Read301`,
    ContinueWork: `${url1.value}/plc/manipulate/continue`,
    PauseWork: `${url1.value}/plc/manipulate/pause`,
    RestartWork: `${url1.value}/plc/manipulate/restart`,
    ExecuteWork: `${url1.value}/plc/manipulate/dbhead104`,
    MoveWork: `${url1.value}/plc/manipulate/move`
  },

  //料区选择
  pouroperate: {
    getPourSelectURL: `${baseURL}/GetPourSelect`,
    getDisChargeURL: `${baseURL}/GetDisCharge`,
    getReclaimingURL: `${baseURL}/GetReclaiming`,
    updatePourNo: `${baseURL}/UpdatePourNo`,
    //放
    PutPourDisCharge: `${baseURL}/PutPourDisCharge`,
    //抓
    PutPourReclaimingt: `${baseURL}/PutPourReclaimingt`
  },

  //点云
  points: {
    getpointdata: `${url1.value}/PointDate/PointDate/GetPointDate`
  },
  // 行车状态
  webApi: `${url1.value}/Status/CraneStatusInformation/GetCraneStatus`,
  // 物料信息
  getMaterial: `${url1.value}/MaterialController/Calculate_Material/GetMaterial`,
  getprompt: `${url1.value}/Prompt/Prompt/GetPrompt`,
  getpromptLimit: `${url1.value}/Prompt/Prompt/GetPromptLimit`,
  getpageprompt: `${url1.value}/Prompt/Prompt/GetPagePrompt`,
  getpagepromptTime: `${url1.value}/Prompt/Prompt/GetPromptByTime`
};

export { urls, initializeUrls };
