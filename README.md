# Uber-Bus-App

# Introduction 

# Back-end
* This is a server side python webapi
* Here we instantiate a flask object
* Return the response from mongodb with the body for the below apis as json object 
* All the Admin requests are secured with JWT Tokens

# Following are the API EndPoints

## /admin/login
* Enables admin to login with proper credentials
## /admin/logout 
* Enables admin to logout
## /bus/new
* Enables admin to add new bus
## /bus/all
* Enables admin to view all the buses
## /bus/delete/<bus_id>
* Enables admin to delete an existing bus
## /trip/all
* Enables admin to view all the trips of the users
## /trip/search
* Enables user to search for the available buses to book a trip
## /trip/new
* Enables user to book a new trip 
## /trip/booking
* Enables user to search for the trip with booking id as input

# Front-end
## Introduction
* This is a client side React application 
* Here the react app displays the application and sends the POST/GET/DELETE request to python webapp
* This sends the request to python application, this returns the required response.
* UI is responsive. Thus can be easily used on Mobile

# How to Run?
## Prerequisites
* Docker
* CircleCI
* Kubernetes
* Terraform
* AWS IAM USER having programmatic access with EKS, VPC and EC2 read and write permission

## Deploying Infrastructure

* Change the Current Directory `cd be-kube-infra`
* Initiate Terraform `terraform init` 
* Take a look at Plan `terraform plan`
* Apply IaC `terraform apply -auto-approve`
* Get output of auth config file `terraform output --raw config_map_aws_auth > ../config-map-aws-auth.yml`
* Get output of kube config file `terraform output --raw kubeconfig > ../config`

## Steps that are executed by CircleCI 
* To manually deploy the app follow the below instructions 

## Install AWS-Cli

```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
sudo apt-get update -y
sudo apt-get install -y less 
```

## Install KubeCtl

```
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.18.9/2020-11-02/bin/linux/amd64/kubectl
chmod +x ./kubectl
mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$PATH:$HOME/bin
echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc
kubectl version --short --client
```

## Install AWS-Auth
```
cd ~
curl -o aws-iam-authenticator https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/aws-iam-authenticator
chmod +x ./aws-iam-authenticator
mkdir -p $HOME/bin && cp ./aws-iam-authenticator $HOME/bin/aws-iam-authenticator && export PATH=$PATH:$HOME/bin
echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc
```

## Docker Image Push Back-End
```
cd back-end/
docker login -u $DNAME -p $DPASS
docker build -t vkrutarth/uber-be:latest .
docker push vkrutarth/uber-be:latest
```

## Configuring Kubectl

```
aws eks update-kubeconfig --name terraform-eks-demo-kmv --region us-east-1 --role-arn arn:aws:iam::254747811220:user/circle-ci
cp config ~/.kube/config
kubectl apply -f config-map-aws-auth.yml
kubectl get nodes 
```

## Deploying Back-end Pods on AWS EKS
```
cd back-end/
kubectl apply -f be-uber-deployment.yaml
kubectl get deployments
kubectl apply -f be-uber-service.yaml
kubectl get svc
```

## Docker Image Push Front-End and run unit tests
```
cd front-end/
npm install
CI=true npm test
docker login -u $DNAME -p $DPASS
REACT_APP_URL=http://`kubectl get service/be-uber -o jsonpath={.status.loadBalancer.ingress..hostname}`
docker build --build-arg REACT_APP_URL=$REACT_APP_URL -t vkrutarth/uber-fe:latest .
docker push vkrutarth/uber-fe:latest
```

## Deploying Front-end Pods on AWS EKS
```
cd front-end/
kubectl apply -f fe-uber-deployment.yaml
sleep 10
kubectl get deployments
kubectl apply -f fe-uber-service.yaml
sleep 10
kubectl get svc
```

## To access the application

* run `kubectl get svc`
* access the external-ip to access the application

# Things to keep in mind
* Deploy the infrastructure with AWS IAM User
* Use the same user to configure kubectl on the system to deploy pods and services on AWS EKS
* With each commit CircleCI will trigger build that will deploy the updated application on the AWS
* If there is no Infrastructure on AWS, CircleCI build will fail and gives you error
* So make to create the infrastructure and then trigger the build