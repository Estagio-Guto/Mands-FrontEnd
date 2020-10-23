type userType = {
    userId: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    email: string;
    cpf: string;
    admission: null;
    phone: number;
    birthday: string;
    addressId: null;
    address: null;
    imageId: number;
    image: string;
    companyUsers: null;
    solicitations: null;
    companyDepartmentUser: null;
    departmentProjectUsers: null;
    taskUsers: null;
};

type LoginType = {
    email: string;
    password: string;
};

type LoginModel = {
    user: userType;
    token: string;
};

export type { userType, LoginType, LoginModel };