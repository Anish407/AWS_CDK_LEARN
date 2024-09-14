# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

*   Install Node.js
*  Install AWS CLI-> (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
*  npm install -g aws-cdk 
*  Install TypeScript =>  npm install -g typescript
*  cdk init app --language=typescript --> Create a Sample app
*  cdk bootstrap
* mkdir templates -> Create a folder to store the generated cloud formation templates
*  cdk synth --output=./templates -> Generate the Cloud formation templates
*  cdk-list -> List all of the stacks in the app
*  CDK docs -> To redirect to cdk docs
*  CDK Diff -> List all the updates that are done to an existing stack

  ## HOW CDK MANAGES THE STATE AS COMPARED TO TERAFORM
AWS CDK (Cloud Development Kit) manages the state of resources differently from Terraform. While Terraform explicitly stores the state of your infrastructure in a state file (terraform.tfstate), AWS CDK does not have a separate state file like this. Instead, AWS CDK leverages CloudFormation for state management.

1. CloudFormation Stack State: When you deploy an AWS CDK stack, it translates your CDK code into a CloudFormation template and deploys it via AWS CloudFormation. CloudFormation manages the state of resources within the stack. Any updates or changes to resources are tracked by CloudFormation, so AWS CDK relies on this mechanism for resource state management.

2. Change Detection: When you run cdk deploy, AWS CDK compares the current CloudFormation stack (the existing state) with the generated template (your desired state) and applies the necessary updates. CloudFormation handles resource creation, updates, and deletions based on this comparison.

3. Logical Resource IDs: AWS CDK uses logical resource IDs, which are derived from the constructs in your CDK code, to map resources in the CloudFormation stack. When changes are made to your CDK code, CloudFormation checks these logical IDs to determine which resources should be modified.

Thus, instead of storing the state locally like Terraform, AWS CDK delegates the responsibility of managing the state to CloudFormation. This provides the same benefit (knowing the current infrastructure state) but without requiring a local or remote state file.

If you need to review the state, you would typically look at the CloudFormation console or use AWS CLI to describe the stack, rather than looking at a separate state file like in Terraform.

The cdk doctor command is designed to provide diagnostic information about your AWS CDK environment. It helps identify any potential issues or misconfigurations that might prevent the CDK from working as expected. Essentially, it acts as a health check for your AWS CDK setup, giving you a clearer view of whether your environment is ready for deploying stacks and interacting with AWS.

## How cdk doctor Works
When you run cdk doctor, it performs a series of checks on your environment and prints the results to the console. These checks include:

- AWS Credentials: It checks if you have valid AWS credentials set up and if they have sufficient permissions to perform the required operations.

- AWS SDK Installation: It verifies if the AWS SDK and necessary dependencies are installed and correctly configured.

- Account/Region Setup: It ensures that you have specified the correct AWS account and region for deployment.

- CDK Version: It checks if the version of the AWS CDK installed on your system matches the version required by your CDK application. A version mismatch can cause compatibility issues between the application code and the CDK CLI.

- Context Information: It reviews the context data in your project to see if any context values are missing or invalid (these values may be used for environment-specific information, like VPC IDs or availability zones).

- CDK Bootstrap Check: It verifies if the environment (AWS account and region) is properly bootstrapped. The bootstrap command must be run once per account/region to set up necessary infrastructure such as an S3 bucket for storing assets.

- CloudFormation Configuration: It checks if the CloudFormation service is available and can be accessed from your environment.

- Environment Variables: It inspects any relevant environment variables that might affect the CDK's behavior (e.g., AWS credentials, regions, or profiles).

- Network Connectivity: It checks network access, ensuring that your environment can reach AWS services such as S3, CloudFormation, and other endpoints that might be required during deployment.

Running the Command
The basic syntax for running cdk doctor is:

~~~
cdk doctor
cdk doctor --verbose
~~~

### Output Example
The output might look something like this:

~~~
ℹ️  CDK Version: 2.1.0 (build abc123)
ℹ️  AWS SDK Version: 2.960.0
ℹ️  AWS Account: 123456789012
ℹ️  Region: us-east-1
ℹ️  Credentials: valid and available
ℹ️  Environment bootstrapped: ✅ (required resources are available in the account)
ℹ️  CloudFormation: service available
ℹ️  Context: valid (no missing or incorrect context values)

~~~

The current CloudFormation stack is managed by AWS, not internally by the AWS CDK or the user. Here’s a breakdown of how the management of the CloudFormation stack works:

## Who Manages the Current CloudFormation Stack?
AWS CloudFormation: When you deploy a stack using AWS CDK (cdk deploy), it generates a CloudFormation template based on your CDK code and hands it over to AWS CloudFormation. CloudFormation then manages the lifecycle of the stack and the associated resources in your AWS account. This includes:

### Creating resources when the stack is first deployed.
Updating resources when you make changes to your CDK code and deploy again.
Deleting resources if you remove resources from the template or destroy the stack entirely.
AWS Manages State: AWS CloudFormation stores the current state of the stack and its resources internally. This state includes information about which resources have been created, their configuration, their logical IDs, and their dependencies. You do not have to manage this state yourself.

### CloudFormation Stack Management:

Every time you run cdk deploy, the AWS CDK synthesizes the latest version of the CloudFormation template, representing the desired state of your resources.
CloudFormation then compares the new template (desired state) with the currently deployed stack (current state) that AWS is managing.
Based on the difference between the two, AWS CloudFormation takes action (e.g., creating, updating, or deleting resources) to reconcile the actual resources in your AWS environment with the desired state.
How AWS CloudFormation Tracks State
AWS CloudFormation keeps track of the following information:

- Resource metadata: The physical and logical IDs of the resources created within the stack.
- Resource configuration: Information like the properties of resources (e.g., instance types, security groups, etc.).
- Stack events: History of the events that have occurred for that stack (e.g., creation, update, or rollback events).
- Dependencies: Relationships between resources and any ordering constraints that need to be respected during updates or deletions.
You can view the current state of your stack by navigating to the AWS CloudFormation Console or using the AWS CLI to describe the stack. This will give you insights into the current state, resources, and any pending changes.

### Why You Don’t Need to Manage the State Manually
In contrast to tools like Terraform, which requires a state file (either locally or remotely) to track the current state of infrastructure, AWS CDK doesn't require you to manage any such state file because CloudFormation does this automatically. The following benefits come from AWS managing the state:

- No Local State Management: You don’t need to worry about storing or syncing state files between team members.
- Automatic Rollback and Recovery: If something goes wrong during an update, CloudFormation can automatically rollback to the last known good state.
- Auditing and History: CloudFormation tracks changes and events over time, which you can review to understand how your infrastructure has evolved.
In summary, AWS CloudFormation is responsible for tracking and managing the current state of your infrastructure stack, and it does this automatically based on the templates you provide via AWS CDK. You do not need to manage the stack state manually.
