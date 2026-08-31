pipeline {
  agent any
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Backend Test') {
      steps {
        dir('backend') {
          sh 'npm install'
          sh 'npm test'
        }
      }
    }
    stage('Docker Build') {
      steps {
        sh 'docker build -t collegehub-backend:${BUILD_NUMBER} ./backend'
        sh 'docker build -t collegehub-backend:latest ./backend'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Next phase: configure Jenkins credentials and automated deployment to AWS EC2.'
      }
    }
  }
}