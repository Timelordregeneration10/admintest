export interface EC2Instance {
  instanceName: string;
  instanceId: string;
  imageId: string;
  instanceType: string;
  instanceStateName: string;
  monitoringState: string;
}
