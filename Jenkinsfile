pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Test') {
            steps {
                dir('backend') {
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t collegehub-backend:%BUILD_NUMBER% ./backend'
                bat 'docker build -t collegehub-backend:latest ./backend'
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                withCredentials([
                    file(
                        credentialsId: 'collegehub-aws-key',
                        variable: 'SSH_KEY'
                    )
                ]) {
                    bat '''
                        echo Testing SSH connection to AWS EC2...

                        icacls "%SSH_KEY%" /inheritance:r
                        icacls "%SSH_KEY%" /grant:r SYSTEM:F

                        ssh -i "%SSH_KEY%" -o StrictHostKeyChecking=no ec2-user@15.252.173.68 "hostname && echo SSH_TO_PUBLIC_EC2_SUCCESS"
                    '''
                }
            }
        }
    }
}