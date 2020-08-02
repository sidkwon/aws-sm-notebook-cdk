# Amazon SageMaker Jupyter notebook by CDK

## Requirements
[CDK로 EKS 클러스터 풀스택 관리하기 > 워크샵 사전 준비 사항](http://demogo-multiregion-eks.s3-website.ap-northeast-2.amazonaws.com/ko/20-preq/) 참조
* AWS CLI
* AWS Account and User
* Node.js
* IDE for your programming language
* AWS CDK Toolkit

## CDK Stack Installation
```
$ git clone https://github.com/sidkwon/aws-sm-notebook-cdk.git
$ npm i
$ cdk deploy SmHolYjStack --parameters myInitial=[임의의 Initial]
  예) cdk deploy SmHolYjStack --parameters myInitial=aws
```

## CDK outputs
* `jupyterLabURL` : Jupyter Lab URL
* `jupyterNotebookURL` : Jupyter Notebook URL

## References
* [cdk-sagemaker-example](https://github.com/mattmcclean/cdk-sagemaker-example)
* [CDK aws-sagemaker module](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-sagemaker-readme.html)