# CollegeHub - AWS + DevOps Demo

A recruiter-friendly college portal for demonstrating Frontend, Backend, Git/GitHub,
Jenkins CI/CD, Docker, AWS VPC, Public/Private EC2, NAT Gateway and Nginx reverse proxy.

Architecture:
Browser -> Public EC2 (Nginx + frontend) -> Private EC2 (Node.js API + SQLite)

Features:
- Public college information page
- Admin login
- Student CRUD: add, view, edit, delete
- Search students
- Health endpoint
- Docker support
- Jenkins pipeline starter

Demo login: admin / admin123

LOCAL RUN:
1. Install Docker Desktop.
2. Open this folder in PowerShell.
3. Run: docker compose up --build
4. Open: http://localhost:8080
5. Admin: http://localhost:8080/admin.html

AWS PLAN:
VPC 10.0.0.0/16
Public subnet 10.0.1.0/24 -> Public EC2 -> Nginx + frontend
Private subnet 10.0.2.0/24 -> Private EC2 -> Node.js backend + database
Public subnet uses Internet Gateway.
Private subnet uses NAT Gateway for outbound internet.

DEVOPS GOAL:
GitHub -> Jenkins -> test -> Docker build -> deploy to Public/Private EC2.
Later we will add credentials, webhooks, Docker registry and automated deployment.

Never commit .pem/.ppk files, AWS keys, passwords or real student personal data.
