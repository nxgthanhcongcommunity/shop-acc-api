const validateUtils = {
    isEmpty: (arr) => {
        return arr.some(item => item == null || item.length == 0)
    },
    isArrayAllEmpty: (arr: string[]) => {
        return arr.every(element => element === "" || element === null || element === undefined);
    },
}

export default validateUtils;