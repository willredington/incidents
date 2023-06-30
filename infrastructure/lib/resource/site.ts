import {
  RemovalPolicy,
  aws_s3 as s3,
  aws_s3_deployment as s3_deployment,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class BucketConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const webBucket = new s3.Bucket(scope, "WebBucket", {
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
    });

    new s3_deployment.BucketDeployment(scope, "WebDeployment", {
      sources: [s3_deployment.Source.asset("../website")],
      destinationBucket: webBucket,
    });
  }
}
