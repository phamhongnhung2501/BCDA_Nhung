/**
 * @return {string}
 */
Array.prototype.findIndex = function (obj) {
    let keys = Object.keys(obj);
    for(let i=0; i<this.length; i++){
        let check = true;
        for(let j=0; j<keys.length; j++){
            let key = keys[j];
            if(obj[key]!==this[i][key]){
                check = false;
                break;
            }
        }
        if(check)
            return i;
    }
    return -1;
};


const ValidInput = require("./ValidInput");


function Fencode(str) {
    let tmp = '';
    for(let i=0; i<str.length; i++){
        if((str.charCodeAt(i)>=48 && str.charCodeAt(i)<=57) || (str.charCodeAt(i)>=65 && str.charCodeAt(i)<=90) || (str.charCodeAt(i)>=97 && str.charCodeAt(i)<=122) || str[i]==='_' || str[i]==='-')
            tmp = tmp + str[i];
    }
    return tmp;
}

function returnThisWhenNull(source, result_when_null){
    return (ValidInput.isEmpty(source) ? result_when_null : source);
}

function copyState(state){
    return JSON.parse(JSON.stringify(state));
}

function randomString(length){
    if(length===undefined)
        length = 20;
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getPermissionInProject(){
    let project = localStorage.getItem("project");

    if(ValidInput.isEmpty(project)){
        return null;
    }

    project =  JSON.parse(project);
    let role = {
        "admin": project.i_am_admin, 
        "member": project.i_am_member, 
        "owner": project.i_am_owner
    };
    return (role);
}
function getMemberInProject(){
    let project = localStorage.getItem("project");

    if(ValidInput.isEmpty(project))
        return null;
    return (JSON.parse(project).members);
}

function getClassNameOfStatus(status){
    switch (status) {
        case "New":
            return "text-color-new";
        case "Ready":
            return "text-color-ready";
        case "In progress":
            return "text-color-in-progress";
        case "Ready for test":
            return "text-color-ready-for-test";
        case "Done":
            return "text-color-done";
        case "Archived":
            return "text-color-archived";
        default:
            return " ";
    }
}

function isExpired(date){
    if(ValidInput.isEmpty(date))
        return false;
    let now = new Date();
    let dt = new Date(date);

    return (dt.getTime() - now.getTime() < 0);
}

function getAuthToken(){
    try{
        let userInfo = localStorage.getItem("userInfo");
        if(ValidInput.isEmpty(userInfo))
            return null;
        return JSON.parse(userInfo).token;
    } catch (e) {
        return null;
    }
}

function getObjectValueSameKey(arr){
    let obj = {};
    for(let i=0; i<arr.length; i++){
        obj[arr[i].toString()] = arr[i].toString();
    }
    return obj;
}

function getProjectId(){
    try{
        return JSON.parse(localStorage.getItem("project")).id;
    } catch (e) {
        return null;
    }
}
// getProjectId
function getIdOfSeed(){
    try{
        return JSON.parse(localStorage.getItem("project")).seed._id;
    } catch (e) {
        return null;
    }
}
function getStationInfo(){
    try{
        return JSON.parse(localStorage.getItem("project"));
    } catch (e) {
        return null;
    }
}
function getUserId(){
    try{
        return JSON.parse(localStorage.getItem("userInfo")).id;
    } catch (e) {
        return null;
    }
}

module.exports = {
    Fencode: Fencode,
    returnThisWhenNull: returnThisWhenNull,
    copyState: copyState,
    randomString: randomString,
    getMemberInProject: getMemberInProject,
    getClassNameOfStatus: getClassNameOfStatus,
    isExpired: isExpired,
    getPermissionInProject: getPermissionInProject,
    getAuthToken: getAuthToken,
    ValidInput: ValidInput,
    getObjectValueSameKey: getObjectValueSameKey,
    getProjectId: getProjectId,
    getUserId: getUserId,
    getStationInfo: getStationInfo,
    getIdOfSeed: getIdOfSeed,
}