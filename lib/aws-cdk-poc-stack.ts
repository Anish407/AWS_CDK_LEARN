import * as cdk from "aws-cdk-lib";
import { Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { Networking } from "./networking";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkPocStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const bucket = new Bucket(this, "anishBucketDemo123", {
      encryption: BucketEncryption.S3_MANAGED,
    });

    new Networking(this,"MyNetworkingContruct",{
      maxAzs: 2
    })

    new cdk.CfnOutput(this, "BucketNameExporter",{
      value: bucket.bucketArn,
      exportName:"FirstBucketName"
    })
  }
}
