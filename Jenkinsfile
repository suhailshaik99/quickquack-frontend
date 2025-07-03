pipeline {
    agent any

    environment {
        APP_VERSION = 'v1.2.0'
        GCP_REGION = 'us-central1'
        GCP_PROJECT_ID = 'glossy-odyssey-459713-n6'
        CLOUD_RUN_SERVICE_NAME = 'quickquack-frontend'
        DOCKER_IMAGE_NAME = 'suhailshaik99/quickquack-frontend'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the Docker image...'
                script {
                    withCredentials([
                        string(credentialsId: 'vite-backend-url-secret', variable: 'BACKEND_URL_SECRET')
                    ]) {
                        bat '''
                            echo "VITE_BACKEND_URL=%BACKEND_URL_SECRET%" > .env
                            echo "VITE_LOGIN_URL=%BACKEND_URL_SECRET%/api/v1/user/login" >> .env
                            echo "VITE_SIGNUP_URL=%BACKEND_URL_SECRET%/api/v1/user/signup" >> .env
                            echo "VITE_SUBMIT_OTP_URL=%BACKEND_URL_SECRET%/api/v1/user/submit-otp" >> .env
                            echo "VITE_REQUEST_OTP_URL=%BACKEND_URL_SECRET%/api/v1/user/request-otp" >> .env
                            echo "VITE_AUTHENTICATE_USER_URL=%BACKEND_URL_SECRET%/api/v1/user/authenticate" >> .env
                            echo "VITE_GET_PROFILE_DETAILS_URL=%BACKEND_URL_SECRET%/api/v1/user/profile-details" >> .env
                            echo "VITE_UPDATE_PROFILE_DETAILS_URL=%BACKEND_URL_SECRET%/api/v1/user/profile-details" >> .env
                            echo "VITE_GET_POSTS_URL=%BACKEND_URL_SECRET%/api/v1/posts" >> .env
                            echo "VITE_CREATE_POST_URL=%BACKEND_URL_SECRET%/api/v1/posts" >> .env
                            echo "VITE_DELETE_POST_URL=%BACKEND_URL_SECRET%/api/v1/posts" >> .env
                            echo "VITE_LIKE_POST_URL=%BACKEND_URL_SECRET%/api/v1/likes/:postId" >> .env
                            echo "VITE_UNLIKE_POST_URL=%BACKEND_URL_SECRET%/api/v1/likes/:postId" >> .env
                            echo "VITE_GET_COMMENTS_URL=%BACKEND_URL_SECRET%/api/v1/comments/:postId" >> .env
                            echo "VITE_POST_COMMENT_URL=%BACKEND_URL_SECRET%/api/v1/comments/:postId" >> .env
                            echo "VITE_GET_FRIENDS=%BACKEND_URL_SECRET%/api/v1/friends" >> .env
                            echo "VITE_FRIEND_REQUEST=%BACKEND_URL_SECRET%/api/v1/friends/friend-requests" >> .env
                            echo "VITE_REMOVE_FOLLOWER=%BACKEND_URL_SECRET%/api/v1/friends/remove-follower" >> .env
                            echo "VITE_REMOVE_FOLLOWING=%BACKEND_URL_SECRET%/api/v1/friends/remove-following" >> .env
                            echo "VITE_CANCEL_FRIEND_REQUEST=%BACKEND_URL_SECRET%/api/v1/friends/cancel-request" >> .env
                            echo "VITE_GET_SUGGESTED_FRIENDS=%BACKEND_URL_SECRET%/api/v1/friends/suggested-friends" >> .env
                            echo "VITE_GET_USER_PROFILE_DETAILS=%BACKEND_URL_SECRET%/api/v1/user/profile-details/:username" >> .env
                            echo "VITE_GET_MESSAGE_CARDS=%BACKEND_URL_SECRET%/api/v1/messages" >> .env
                            echo "VITE_GET_USER_MESSAGES=%BACKEND_URL_SECRET%/api/v1/messages/:receiver" >> .env
                            echo "VITE_SEARCH_USERS_URL=%BACKEND_URL_SECRET%/api/v1/search?username=userName" >> .env
                            echo "VITE_GET_NOTIFICATIONS_URL=%BACKEND_URL_SECRET%/api/v1/notifications" >> .env
                            echo "VITE_GET_NOTIFICATIONS_COUNT_URL=%BACKEND_URL_SECRET%/api/v1/notifications/unread-count" >> .env
                            echo "VITE_LOGOUT_USER=%BACKEND_URL_SECRET%/api/v1/logout" >> .env
                        '''
                        docker.build("${DOCKER_IMAGE_NAME}:${APP_VERSION}", '.')
                    }
                }
            }
        }

        stage('Tag and Push to Docker Hub') {
            steps {
                echo 'Tagging and pushing the image to Docker Hub...'
                script {
                    withDockerRegistry([ credentialsId: 'docker-login', url: '' ]) {
                        def builtImage = docker.image("${DOCKER_IMAGE_NAME}:${APP_VERSION}")
                        builtImage.push()
                        builtImage.addTag('latest')
                        builtImage.push('latest')
                    }
                }
            }
        }
    }
}
