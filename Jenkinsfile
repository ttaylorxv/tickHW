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
            
            //sh 'echo env.BRANCH_NAME'
            //sh 'echo ${env.BRANCH_NAME}'
            def branch = BRANCH_NAME
           /* // Read payload which is a submitted JSON request from github and write to temp file
            sh 'echo "$payload" >> tempGitFile.json'
            // From the temp file place into variable
            def fromgithook = readJSON file: 'tempGitFile.json'
            // find branch name and set to lower case for environment variables
            def branch = fromgithook.ref
            branch = branch.substring(branch.lastIndexOf("/") + 1)
            branch = branch.toLowerCase()
            

            sh 'oc project twitter-cicd'
            // Check for new branch and existing openshift buildconfig
            sh """oc get dc -l "$branch >> tempGetDC.txt"""

            // Check git message for deleted branch. If deleted then clean resources
            if(false) {
                // delete all with label
                """oc delete all -l BRANCH=$branch"""
            }
           

            if(true) {*/
                // new branch so generate DC from template
                //println fromgithook.ref
                //println fromgithook.pusher.name
                //def user = fromgithook.pusher.name
                /*sh """oc process nodejs-mongo-jenkinspipe \
                -p NAME=$branch \
                -p SOURCE_REPOSITORY_URL=https://github.com/ttaylorxv/tickHW.git \
                -p SOURCE_REPOSITORY_REF=$branch \
                -p DATABASE_NAME=$branch \
                -p DATABASE_SERVICE_NAME=$branch-mongodb \
                -l BRANCH=$branch \
                | oc create -f -"""*/
            sh """oc new-app nodejs-mongo-jenkinspipe.json -p NAME=$branch -p SOURCE_REPOSITORY_URL=https://github.com/ttaylorxv/tickHW.git -p SOURCE_REPOSITORY_REF=$branch -p DATABASE_NAME=$branch -p DATABASE_SERVICE_NAME=$branch-mongodb -l BRANCH=$branch """
           // } else {
                // old branch with existing DC so launch build and deploy
                openshiftBuild apiURL: '', authToken: '', bldCfg: """$branch""", buildName: '', checkForTriggeredDeployments: 'true', commitID: '', namespace: '', showBuildLogs: 'true', verbose: 'false', waitTime: '', waitUnit: 'sec'
            //}

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
