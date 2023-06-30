import { aws_lambda_nodejs, aws_dynamodb as dynamo } from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";
import {
  BuildTimeEnvVariable,
  ProjectConfig,
  RunTimeEnvVariable,
  getEnvVariable,
} from "../config";
import { SecretName, fetchSecret } from "../service/secret";

async function getLambdaEnvs({
  projectConfig,
  secrets,
}: {
  projectConfig: ProjectConfig;
  secrets?: SecretName[];
}): Promise<Record<string, string>> {
  const lambdaEnvVars: Record<string, string> = Object.values(
    BuildTimeEnvVariable
  ).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: getEnvVariable(curr),
    }),
    {}
  );

  if (secrets) {
    const secretResults = await Promise.all(
      secrets.map((secretName) =>
        fetchSecret({
          secretName,
          projectConfig,
        })
      )
    );

    // update the envs with the secret
    for (const [secretName, secretValue] of secretResults) {
      lambdaEnvVars[secretName] = secretValue;
    }
  }

  return lambdaEnvVars;
}

async function buildNodeJsLambda(
  scope: Construct,
  {
    projectConfig,
    functionName,
    secrets,
    overrideProps,
  }: {
    projectConfig: ProjectConfig;
    functionName: string;
    secrets?: SecretName[];
    overrideProps?: Partial<aws_lambda_nodejs.NodejsFunctionProps>;
  }
) {
  const lambdaEnvVars = await getLambdaEnvs({
    projectConfig,
    secrets,
  });

  return new aws_lambda_nodejs.NodejsFunction(scope, functionName, {
    memorySize: 1024,
    entry: join(__dirname, "../", "lambda", `${functionName}.ts`),
    ...overrideProps,
    environment: {
      ...overrideProps?.environment,
      ...lambdaEnvVars,
    },
  });
}

export async function buildGetIncidentLambda(
  scope: Construct,
  {
    projectConfig,
    incidentTable,
  }: {
    projectConfig: ProjectConfig;
    incidentTable: dynamo.ITable;
  }
) {
  const lambda = await buildNodeJsLambda(scope, {
    projectConfig,
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
