import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ProjectConfig } from "./config";
import { ApiConstruct } from "./resource/api";
import * as lambdas from "./resource/lambda";
import { TableConstruct } from "./resource/table";

type IncidentCdkStackProps = cdk.StackProps & {
  projectConfig: ProjectConfig;
};

export class IncidentCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IncidentCdkStackProps) {
    super(scope, id, props);
    this.initializeAsync(props.projectConfig).then(() => {
      console.log("Stack initialization complete");
    });
  }

  private async initializeAsync(projectConfig: ProjectConfig) {
    const tables = new TableConstruct(this, "TableConstruct");

    const getIncidentLambda = await lambdas.buildGetIncidentLambda(this, {
      projectConfig,
      incidentTable: tables.incidentTable,
    });

    new ApiConstruct(this, "ApiConstruct", {
      getIncidentLambda,
    });
  }
}
