import displayService from '../service/displayService'

let getProduct1 = async (req, res) => {
    try {
        let data = await displayService.getProduct();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e);
        return res(500).json({
            EM: 'error from server userController',// error messeger
            EC: '-1', // error code
            DT: '' //data
        })
    }
}
module.exports = {
    getProduct1
}

