const validateUtils = {
    isEmpty: (arr: string[]) => {
        return arr.some(item => ("" + item).length == 0)
    }
}

export default validateUtils;