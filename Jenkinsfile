#!groovy
import hudson.model.*
import groovy.json.JsonSlurperClassic
import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import jenkins.model.*


try {
    node {
        def branch = BRANCH_NAME.toLowerCase();
        def source = BRANCH_NAME
        stage('checkout-and-test') {
            checkout scm
      
            sh """oc process -f nodejs-mongo-jenkinspipe.json -p NAME=$branch -p SOURCE_REPOSITORY_URL=https://github.com/ttaylorxv/tickHW.git -p SOURCE_REPOSITORY_REF=$source -p DATABASE_NAME=$branch -p DATABASE_SERVICE_NAME=$branch-mongodb -lapp=$branch | oc apply -f - """
           
            openshiftBuild apiURL: '', authToken: '', bldCfg: """$branch""", buildName: '', checkForTriggeredDeployments: 'true', commitID: '', namespace: '', showBuildLogs: 'true', verbose: 'false', waitTime: '', waitUnit: 'sec'
            

        }
        stage('Deploy to Test Environment for ${NAME}') {
            openshiftDeploy depCfg: """$branch""", verbose: 'false'
            openshiftVerifyDeployment depCfg: """$branch""", verbose: 'false'
        }
    }
} catch (err) {
    echo "in catch block"
    echo "Caught: ${err}"
    currentBuild.result = 'FAILURE'
    throw err
}
