import { type AxiosResponse } from "axios";
import instance from "./request";
import { EC2Instance } from "../interfaces/instance";

type getInstancesRes = Array<EC2Instance>;

const getInstances = async (access_token: string) =>
  instance.get<any, AxiosResponse<Partial<getInstancesRes>>>(
    `/ec2-instances`,
    { headers: { Authorization: access_token } }
  );

const putInstance = async (
  instanceId: string,
  operation: string,
  access_token: string
) =>
  await instance.put<any, AxiosResponse<Partial<any>>>(
    `/ec2-instances`,
    [{ instanceId, operation }],
    {
      headers: { Authorization: access_token },
    }
  );

const API = {
  getInstances,
  putInstance,
};

export default API;
