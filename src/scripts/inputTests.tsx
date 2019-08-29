// TODO: use trim() !!!

export function isStringValid(str: any): boolean {
  return isNaN(str) && typeof str === "string" && str !== "" && str.length > 2;
}

export function areStringsValid(strArray: any[]): boolean {
  for (let index = 0; index < strArray.length; index++) {
    const str = strArray[index];

    if (!isStringValid(str)) return false;
  }
  return true;
}
