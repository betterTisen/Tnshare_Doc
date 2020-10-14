// 表单为空验证
export const FormEmptyVerify = (obj: any) => {
  for (var key in obj) {
    if (obj[key] === "") {
      return false
    }
  }
  return true
}
