import groupService from '../service/groupService';

const readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroups();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server groupController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}

const readFuncT = async (req, res) => {
    try {
        let data = await groupService.getTypes();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server groupController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
module.exports = {
    readFunc, readFuncT
}