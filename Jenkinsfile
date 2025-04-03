pipeline {
    agent any

    tools {nodejs "node"}

    environment {
        POSTGRES_USER = "postgres"
        POSTGRES_PASSWORD = "postgres"
        POSTGRES_DB = "postgres"
        
        REDIS_USER = "admin"
        REDIS_PASSWORD = "redis"
        REDIS_USER_PASSWORD = "admin_redis"
    }

    stages {
        stage('Init') {
            steps{
                git url: 'https://github.com/ArtemiiLiakh/cloneoverflow', branch: 'jenkins'
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t backend -f docker/build/build.Dockerfile .'
            }
        }
        stage('Test') {
            steps {
                sh 'docker compose -f docker/docker-compose-db.yaml up -d'
                // sh 'docker build -t backend:test -f docker/test/test.Dockerfile .'
                // sh 'docker run -v ./backend/environment:/app/backend/environment --network database backend:test'
                sh '''
                docker compose -f docker/docker-compose-db.yaml exec -T backend bash -c "
                    cd common && npm ci && npm run build
                    cd ../backend && npm ci && npm run db:generate
                    npm run test:docker
                "
                '''
            }
        }
    }
}