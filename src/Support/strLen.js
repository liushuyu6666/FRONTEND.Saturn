export const strLen = (str) => {
    let count = 0;
    for(let i = 0; i < str.length; i++){
        count += (str.charCodeAt(i) < 256 ? 1: 2);
    }
    return count;
}

export const strLenSlice = (str, until) => {
    const len = str.length;
    let count = 0;
    let ans = "";
    for(let i = 0; i < len; i++){
        count += (str.charCodeAt(i) < 256 ? 1: 2);
        if(count <= until){
            ans += str[i];
        }
    }
    return ans;
}