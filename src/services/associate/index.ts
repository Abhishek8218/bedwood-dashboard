import { Api } from "../config";

const path = "/assiociate";

export  const getAssociates = async () => {
    return (await Api.get(path + "/list")).data;
    }