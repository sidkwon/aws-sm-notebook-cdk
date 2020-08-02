import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import sagemaker = require('@aws-cdk/aws-sagemaker');
import fs = require('fs');

export class SmHolYjStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //let onStartScript  = fs.readFileSync('./scripts/onStart.sh', 'utf8');
    let onCreateScript = fs.readFileSync('./scripts/onCreate.sh', 'utf8');

    const myInitial = new cdk.CfnParameter(this, 'myInitial', {
      type: 'String',
      default: 'cjy',
      allowedPattern: '^[a-zA-Z0-9](-*[a-zA-Z0-9])*',
      description: `Please put your initials. Use only characters and numbers, no special characters or spaces. It's used as a unique word for a name of the S3 Bucket and SageMaker notebook to create.`
  });

    /** Create the IAM Role to be used by SageMaker */
    const smNotebookRole = new iam.Role(this, 'smNotebookRole', {
      assumedBy: new iam.ServicePrincipal('sagemaker.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess'),
                        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
                        iam.ManagedPolicy.fromAwsManagedPolicyName('IAMFullAccess'),
                        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryFullAccess'),
                        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonAthenaFullAccess'),
                        iam.ManagedPolicy.fromAwsManagedPolicyName('ComprehendFullAccess'),
                      ],                 
    });

    const lifecycleConfig = new sagemaker.CfnNotebookInstanceLifecycleConfig(this, 'MyLifecycleConfig', {
        notebookInstanceLifecycleConfigName: 'fastaiLifecycleConfig',
        onCreate: [
          {
            content: cdk.Fn.base64(onCreateScript!)
          }
        ]
    });

    const smNotebook = new sagemaker.CfnNotebookInstance(this, 'smNotebook', {
      notebookInstanceName: `sagemaker-hol-lab-${myInitial.valueAsString}`,
      instanceType: 'ml.m5.xlarge',
      acceleratorTypes: ['ml.eia2.medium'],
      volumeSizeInGb: 30,
      rootAccess: 'Enabled',
      directInternetAccess: 'Enabled',
      roleArn: smNotebookRole.roleArn,
      lifecycleConfigName: lifecycleConfig.notebookInstanceLifecycleConfigName
    })

    new cdk.CfnOutput(this, 'jupyterNotebookURL', {
      description: 'jupyter Notebook URL',
      exportName: 'jupyterNotebookURL',
      value: `https://${this.region}.console.aws.amazon.com/sagemaker/home?region=${this.region}#/notebook-instances/openNotebook/${smNotebook.notebookInstanceName}?view=classic`
    });

    new cdk.CfnOutput(this, 'jupyterLabURL', {
      description: 'jupyter Lab URL',
      exportName: 'jupyterLabURL',
      value: `https://${this.region}.console.aws.amazon.com/sagemaker/home?region=${this.region}#/notebook-instances/openNotebook/${smNotebook.notebookInstanceName}?view=lab`
    });
  }
}
