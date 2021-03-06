const baseUrl = 'departments';

const departmentUrls = {
    base: `${baseUrl}/`,
    listByCompany: `${baseUrl}/findByCompany/`,
    listByUser: `${baseUrl}/listByUser/`,
    listEmployees: `${baseUrl}/listAssociatedUsers/`,
    create: `${baseUrl}/`,
    verifyName: `${baseUrl}/verifyName/`,
    associate: `${baseUrl}/associateUsers/`,
    dissociate: `${baseUrl}/dissociateUser/`,
};

export default departmentUrls;
