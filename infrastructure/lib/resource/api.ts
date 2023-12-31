import { aws_apigateway as apig, aws_lambda } from "aws-cdk-lib";
import { Construct } from "constructs";

type ApiConstructProps = {
  createIncidentLambda: aws_lambda.IFunction;
  getIncidentLambda: aws_lambda.IFunction;
  getAllIncidentsLambda: aws_lambda.IFunction;
};

export class ApiConstruct extends Construct {
  readonly api: apig.RestApi;

  constructor(scope: Construct, id: string, props: ApiConstructProps) {
    super(scope, id);

    this.api = new apig.RestApi(scope, "Api", {
      defaultCorsPreflightOptions: {
        allowOrigins: apig.Cors.ALL_ORIGINS,
        allowMethods: apig.Cors.ALL_METHODS,
      },
    });

    const incidentResource = this.api.root.addResource("incident");
    const incidentsResource = this.api.root.addResource("incidents");

    incidentsResource.addMethod(
      "GET",
      new apig.LambdaIntegration(props.getAllIncidentsLambda)
    );

    incidentsResource.addMethod(
      "POST",
      new apig.LambdaIntegration(props.createIncidentLambda)
    );

    incidentResource
      .addResource("{incidentId}")
      .addMethod("GET", new apig.LambdaIntegration(props.getIncidentLambda));
  }
}
