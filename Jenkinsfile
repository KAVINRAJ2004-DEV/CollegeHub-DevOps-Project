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

        stage('Deploy to AWS') {
            steps {
                withCredentials([file(credentialsId: 'collegehub-aws-key', variable: 'SSH_KEY')]) {
                    bat '''
                        echo Connecting to Public EC2...

                        icacls "%SSH_KEY%" /inheritance:r
                        icacls "%SSH_KEY%" /grant:r SYSTEM:F

                        ssh -i "%SSH_KEY%" -o StrictHostKeyChecking=no ec2-user@15.252.173.68 "ssh -i /home/ec2-user/CollegeHub-Key.pem -o StrictHostKeyChecking=no ec2-user@10.0.4.18 'cd ~/CollegeHub-DevOps-Project && git pull && cd backend && sudo docker build -t collegehub-backend:latest . && sudo docker rm -f collegehub-backend && sudo docker run -d --name collegehub-backend -p 3000:3000 collegehub-backend:latest'"
                    '''
                }
            }
        }
    }
}
