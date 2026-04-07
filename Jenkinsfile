pipeline {
    agent any

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
    }
}