import { aws_lambda_nodejs, aws_dynamodb as dynamo } from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";
import {
  BuildTimeEnvVariable,
  ProjectConfig,
  RunTimeEnvVariable,
  getEnvVariable,
} from "../config";

function getLambdaEnvs(): Record<string, string> {
  return Object.values(BuildTimeEnvVariable).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: getEnvVariable(curr),
    }),
    {}
  );
}

function buildNodeJsLambda(
  scope: Construct,
  {
    functionName,
    overrideProps,
  }: {
    functionName: string;
    overrideProps?: Partial<aws_lambda_nodejs.NodejsFunctionProps>;
  }
) {
  return new aws_lambda_nodejs.NodejsFunction(scope, functionName, {
    memorySize: 1024,
    entry: join(__dirname, "../", "lambda", `${functionName}.ts`),
    ...overrideProps,
    environment: {
      ...overrideProps?.environment,
      ...getLambdaEnvs(),
    },
  });
}

export function buildGetIncidentLambda(
  scope: Construct,
  {
    incidentTable,
  }: {
    incidentTable: dynamo.ITable;
  }
) {
  const lambda = buildNodeJsLambda(scope, {
    functionName: "get-incident",
    overrideProps: {
      environment: {
        [RunTimeEnvVariable.INCIDENT_TABLE_NAME]: incidentTable.tableName,
      },
    },
  });

  incidentTable.grantReadData(lambda);

  return lambda;
}
