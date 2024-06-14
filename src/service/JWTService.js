import db from "../models";

const getGroupWithRoles = async (user) => {
    // scope
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ['id', 'name', 'description'],
        include: [{
            model: db.Role,
            attribute: ['id', 'url', 'description'],
            //through: ko cho hiển thị bảng C của A,B
            through: { attributes: [] }
        }],
    })
    return roles ? roles : {};
}

module.exports = {
    getGroupWithRoles
}