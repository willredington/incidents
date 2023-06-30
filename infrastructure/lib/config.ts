import { z } from "zod";

export const ProjectConfig = z.object({
  env: z.enum(["dev", "prod"]),
  branchName: z.string(),
  projectName: z.string(),
});

export type ProjectConfig = z.infer<typeof ProjectConfig>;

export enum BuildTimeEnvVariable {
  ENV = "ENV",
  BRANCH_NAME = "BRANCH_NAME",
  PROJECT_NAME = "PROJECT_NAME",
}

export enum RunTimeEnvVariable {
  INCIDENT_TABLE_NAME = "INCIDENT_TABLE_NAME",
}

export function getEnvVariable(
  envVar: BuildTimeEnvVariable | RunTimeEnvVariable
) {
  try {
    return z.string().parse(process.env[envVar]);
  } catch (err) {
    console.error(`could not find environment variable: ${envVar}`);
    throw err;
  }
}

export function getProjectConfig() {
  return ProjectConfig.parse({
    env: getEnvVariable(BuildTimeEnvVariable.ENV),
    branchName: getEnvVariable(BuildTimeEnvVariable.BRANCH_NAME),
    projectName: getEnvVariable(BuildTimeEnvVariable.PROJECT_NAME),
  });
}
