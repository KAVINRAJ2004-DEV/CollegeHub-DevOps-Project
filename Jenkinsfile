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
                    sshUserPrivateKey(
                        credentialsId: 'collegehub-aws-key',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    bat '''
                        ssh -i "%SSH_KEY%" -o StrictHostKeyChecking=no %SSH_USER%@15.252.173.68 "docker --version"
                    '''
                }
            }
        }
    }
}