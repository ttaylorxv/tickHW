#!groovy
try {
    node {
        stage('Build') {
            build 'checkout-and-test'

            checkout scm


        }
        stage('Deploy to Dev') {
            openshiftDeploy apiURL: '', authToken: '', depCfg: 'simple-nodejs-dev', verbose: 'false', waitTime: ''
            openshiftVerifyDeployment apiURL: '', authToken: '', depCfg: 'simple-nodejs-dev', verbose: 'false', waitTime: ''

        }
        stage('Approve QA Deployment') {
            timeout(time: 2, unit: 'DAYS') {
                input message: 'Do you want to deploy into Q&A?'
            }
        }
        // Publish to a QA environment
        stage('Deploy to QA') {
            openshiftDeploy apiURL: '', authToken: '', depCfg: 'simple-nodejs-qa', verbose: 'false', waitTime: ''
            openshiftVerifyDeployment apiURL: '', authToken: '', depCfg: 'simple-nodejs-qa', verbose: 'false', waitTime: ''
        }
        // Wait until authorization to push to production
        stage('Approve Production Deployment') {
            timeout(time: 2, unit: 'DAYS') {
                input message: 'Do you want to deploy into production?'
            }
        }
        // Push to production
        stage('Deploy to Production') {
            openshiftDeploy apiURL: '', authToken: '', depCfg: 'simple-nodejs-prod', verbose: 'false', waitTime: ''
            openshiftVerifyDeployment apiURL: '', authToken: '', depCfg: 'simple-nodejs-prod', verbose: 'false', waitTime: ''
        }
    }
} catch (err) {
    echo "in catch block"
    echo "Caught: ${err}"
    currentBuild.result = 'FAILURE'
    throw err
}