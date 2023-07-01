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
    this.initializeSync(props.projectConfig);
  }

  private initializeSync(projectConfig: ProjectConfig) {
    console.log(projectConfig);
    const tables = new TableConstruct(this, "TableConstruct");

    const createIncidentLambda = lambdas.buildCreateIncidentLambda(this, {
      incidentTable: tables.incidentTable,
    });

    const getIncidentLambda = lambdas.buildGetIncidentLambda(this, {
      incidentTable: tables.incidentTable,
    });

    const getAllIncidentsLambda = lambdas.buildGetAllIncidentsLambda(this, {
      incidentTable: tables.incidentTable,
    });

    new ApiConstruct(this, "ApiConstruct", {
      createIncidentLambda,
      getIncidentLambda,
      getAllIncidentsLambda,
    });
  }
}
