# catalog-microservice
Catalog microservice implemented using NodeJS

Build status: [![Build Status](https://travis-ci.org/redhat-msa-3/catalog-microservice.svg?branch=master)](https://travis-ci.org/redhat-msa-3/catalog-microservice)


Execute catalog locally
-----------------------

1. Open a command prompt and navigate to the root directory of this microservice.
2. Type this command to install the dependencies

        npm install

3. Type this command to test the application:

        npm test

4. Type this command to execute the application:

        npm start

5. This will execute `catalog.js` .
6. The application will be running at the following URL: <http://localhost:8080/catalog>
7. You can download Trips images from <http://localhost:8080/download/rafting.jpg>
8. Swagger is available at <http://localhost:8080/api-docs>


Execute catalog in OpenShift
-----------------------------

Make sure that you are logged in.

Execute:

    oc new-app --name=catalog https://github.com/redhat-msa-3/catalog-microservice
    oc set probe dc/catalog --readiness --get-url=http://:8080/health
    
