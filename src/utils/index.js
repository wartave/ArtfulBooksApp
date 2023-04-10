
import { HttpClient } from "./HttpClient";
import { showError, showSuccess } from "./showAlert";


const saveRecord = async (
  values,
  url,
  callback = () => {},
  id = "",
  closeModalF = () => {}
) => {
  try {
    await HttpClient(url + "/" + id, {
      method: id ? "PUT" : "POST",
      data: {
        ...values,
      },
    });
    callback();
    showSuccess();
  } catch (error) {
    showError(error);
  } finally {
    closeModalF();
  }
};

const getRecords = async (
  url,
  setState,
  setLoad = () => {},
  url2 = null,
  setSecondState = () => {}
) => {
  try {
    setLoad(true);
    const res = await HttpClient.get(url);
    setState(res.data);
    // If we have other url
    if (url2) {
      const secondRes = await HttpClient.get(url2);
      setSecondState(secondRes.data);
    }
  } catch (error) {
    showError(error);
  } finally {
    setLoad(false);
  }
};

const deleteRecord = async (url, id, callback = () => {}) => {
  try {
    await HttpClient.delete(url + "/" + id);
    callback();
    showSuccess();
  } catch (error) {
    showError(error);
  }
};

const formStyles = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 15,
  },
};

const commonRules = {
  required: {
    required: true,
    message: "Este campo es obligatorio!",
  },
  requiredSelect: {
    required: true,
    message: "Debes seleccionar alguna opción!",
  },
};

function validatePer(perToValidate) {
  if (perToValidate === undefined) return true;
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return true;
  const { Permissions } = user;
  let isvalid = false;
  Permissions.forEach((per) => {
    if (per.PermissionID === perToValidate) isvalid = true;
  });
  return isvalid;
}

function isURL(str) {
  const urlRegex =
    "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$";
  const url = new RegExp(urlRegex, "i");
  return str.length < 2083 && url.test(str);
}

export {
  HttpClient,
  getRecords,
  deleteRecord,
  saveRecord,
  showError,
  showSuccess,
  formStyles,
  commonRules,
  validatePer,
  isURL,
};
