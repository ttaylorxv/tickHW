#!groovy
import hudson.model.*
import groovy.json.JsonSlurperClassic
import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import jenkins.model.*


try {
    node {
        stage('checkout-and-test') {
            checkout scm
            
            def branch = BRANCH_NAME.toLowerCase();
            def source = BRANCH_NAME
      
            sh """oc process -f nodejs-mongo-jenkinspipe.json -p NAME=$branch -p SOURCE_REPOSITORY_URL=https://github.com/ttaylorxv/tickHW.git -p SOURCE_REPOSITORY_REF=$source -p DATABASE_NAME=$branch -p DATABASE_SERVICE_NAME=$branch-mongodb -l BRANCH=$branch -lapp=$branch | oc apply -f - """
           
            openshiftBuild apiURL: '', authToken: '', bldCfg: """$branch""", buildName: '', checkForTriggeredDeployments: 'true', commitID: '', namespace: '', showBuildLogs: 'true', verbose: 'false', waitTime: '', waitUnit: 'sec'
            

        }
        stage('Deploy to Test Environment for ${NAME}') {
            openshiftBuild apiURL: '', authToken: '', bldCfg: """$branch""", buildName: '', checkForTriggeredDeployments: 'true', commitID: '', namespace: '', showBuildLogs: 'true', verbose: 'false', waitTime: '', waitUnit: 'sec'
        }
    }
} catch (err) {
    echo "in catch block"
    echo "Caught: ${err}"
    currentBuild.result = 'FAILURE'
    throw err
}
