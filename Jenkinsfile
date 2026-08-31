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

        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'collegehub-aws-key', variable: 'SSH_KEY')]) {
                    bat '''
                        copy /Y "%SSH_KEY%" "%WORKSPACE%\\CollegeHub-Key.pem"

                        icacls "%WORKSPACE%\\CollegeHub-Key.pem" /inheritance:r
                        icacls "%WORKSPACE%\\CollegeHub-Key.pem" /grant:r "%USERNAME%:R"

                        ssh -i "%WORKSPACE%\\CollegeHub-Key.pem" -o StrictHostKeyChecking=no ec2-user@15.252.173.68 "hostname && echo SSH_TO_PUBLIC_EC2_SUCCESS"

                        del /Q "%WORKSPACE%\\CollegeHub-Key.pem"
                    '''
                }
            }
        }
    }
}
