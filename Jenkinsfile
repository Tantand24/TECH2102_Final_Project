pipeline {
    agent any

    environment{
        AWS_DOCKER_REGISTRY = '110661053267.dkr.ecr.ca-west-1.amazonaws.com/tech2102_final_project'
        APP_NAME = 'tech2102_final_project'
        AWS_DEFAULT_REGION= 'ca-west-1'
    }

    stages {

        stage('Install') {
            agent {
                docker {
                    image 'node:22.17.1-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:22.17.1-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                npm run build
                ls -la dist
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:22.17.1-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npx vitest run'
            }
        }

        stage('Build My Docker Image'){
            
            agent{
                docker{
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
                }
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'tech2102_Final_Project_AWS_API_KEY', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) 
                {

                    sh '''
                        dnf install -y docker
                        docker build -t $AWS_DOCKER_REGISTRY/$APP_NAME .
                        docker images

                        aws ecr get-login-password | docker login --username AWS --password-stdin $AWS_DOCKER_REGISTRY
                        docker push $AWS_DOCKER_REGISTRY/$APP_NAME:latest
                    '''
                }
            }
        }

        /*
        stage('Deploy to AWS'){

            agent{
                docker{
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '-u root --entrypoint=""'
                }
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'tech2102_Final_Project_AWS_API_KEY', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) 
                {

                    sh '''
                        aws --version

                        yum install jq -y

                        LATEST_TD_REVISION=$(aws ecs register-task-definition --cli-input-json file://aws/task-definition.json | jq '.taskDefinition.revision')
                        aws ecs update-service --cluster tech2102-final-project-cluster --service my-react-service-20260330 --task-definition my-react-task-definition-json-20260330:$LATEST_TD_REVISION
                    '''
                }
            }
        }
        }
        */
    }
}