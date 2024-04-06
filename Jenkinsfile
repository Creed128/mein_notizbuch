pipeline {
agent any
stages {
stage('One') {
steps {
echo 'Hi from GitHub'
}
}
stage('Two') {
steps {
input message: 'Do you want to proceed?', ok: 'Yes'
}
}
stage('Three') {
steps {
echo "Hello from here"
}
}
stage('Four') {
parallel {
stage('Unit Test') {
steps {
echo "Running the unit test..."
}
}
stage('Integration test') {
steps {
echo "Running the integration test..."
}
}
}
}
}
}
