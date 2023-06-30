import { aws_dynamodb as dynamo } from "aws-cdk-lib";
import { Construct } from "constructs";

export class TableConstruct extends Construct {
  readonly incidentTable: dynamo.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.incidentTable = new dynamo.Table(scope, "IncidentTable", {
      partitionKey: { name: "id", type: dynamo.AttributeType.STRING },
    });
  }
}
