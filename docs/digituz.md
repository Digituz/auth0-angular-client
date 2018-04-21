# Deploying Auth0 Angular Client on Digituz

Everything you need is to create a new Docker image. Hopefully, you will count with a tool like [Travis](https://travis-ci.org/) or [Circle CI](https://circleci.com/) to build new images based on pushes to the `master` branch.

Either way, here are some commands to generate a new Docker image and upload to Docker Hub:

```bash
# from the project root
docker build -t digituz/auth0-angular-client .

# push it to Docker Hub
docker push digituz/auth0-angular-client
```
