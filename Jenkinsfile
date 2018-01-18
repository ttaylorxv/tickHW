#!groovy
import hudson.model.*


try {
    node {
        stage('checkout-and-test') {
            
            checkout scm
            
            sh 'echo "$payload" >> tempGitFile.json'
            //sh 'cat tempGitFile.json'
            //echo "$payload"
            //sh 'githubdelivery = $payload'

            //sh 'oc get pods'

            def fromgithook = readJSON file: 'tempGitFile.json'
            //def testdef = '{ "stuff" : "things"}'
            //echo '${fromgithook}'
            //echo '${testdef}'
            //println fromgithook

            sh """echo $fromgithook"""

            sh 'oc project twitter-cicd'

            println fromgithook.ref
            println fromgithook.pusher.name

            def branch = fromgithook.ref
            branch = branch.substring(branch.lastIndexOf("/") + 1)
            println branch
            def user = fromgithook.pusher.name

            sh """oc process nodejs-mongo-jenkinspipe \
            -p NAME=$user-$branch \
            -p SOURCE_REPOSITORY_URL=https://github.com/cfarriscx/tickHW.git \
            -p SOURCE_REPOSITORY_REF=$branch \
            -p DATABASE_NAME=$branch \
            -p DATABASE_SERVICE_NAME=$branch-MONGODB \
            -l BRANCH=$branch \
            | oc create -f -"""
            

        }
        /*
        stage('Deploy to Dev') {
            openshiftBuild apiURL: '', authToken: '', bldCfg: 'simple-nodejs-dev', buildName: '', checkForTriggeredDeployments: 'true', commitID: '', namespace: '', showBuildLogs: 'true', verbose: 'false', waitTime: '', waitUnit: 'sec'

        }
        stage('Approve QA Deployment') {
            timeout(time: 2, unit: 'DAYS') {
                input message: 'Do you want to deploy into Q&A?'
            }
        }
        // Publish to a QA environment
        stage('Deploy to QA') {
            openshiftBuild apiURL: '', authToken: '', bldCfg: 'simple-nodejs-qa', buildName: '', checkForTriggeredDeployments: 'true', commitID: '', namespace: '', showBuildLogs: 'true', verbose: 'false', waitTime: '', waitUnit: 'sec'
        }
        // Wait until authorization to push to production
        stage('Approve Production Deployment') {
            timeout(time: 2, unit: 'DAYS') {
                input message: 'Do you want to deploy into production?'
            }
        }
        // Push to production
        stage('Deploy to Production') {
            openshiftBuild apiURL: '', authToken: '', bldCfg: 'simple-nodejs-prod', buildName: '', checkForTriggeredDeployments: 'true', commitID: '', namespace: '', showBuildLogs: 'true', verbose: 'false', waitTime: '', waitUnit: 'sec'
        } */
    }
} catch (err) {
    echo "in catch block"
    echo "Caught: ${err}"
    currentBuild.result = 'FAILURE'
    throw err
}