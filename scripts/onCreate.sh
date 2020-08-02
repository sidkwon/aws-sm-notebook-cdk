#!/bin/bash
sudo -u ec2-user -i <<'EOF'
source activate python3
cd SageMaker
git init
git clone https://github.com/Napkin-DL/Sagemaker-HOL.git
source deactivate
EOF