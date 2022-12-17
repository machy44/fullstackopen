solutions from part 11

# ci/cd

In general when we talk about building we mean preparing software to run on the platform where it's intended to run. This might mean, for example, that if you've written your application in TypeScript, and you intend to run it on Node, then the build step might be transpiling the TypeScript into JavaScript.

Deploying a service (such as a web app) can vary in complexity. In part 3 our deployment workflow involved running some scripts manually and pushing the repository code to Fly.io or Heroku hosting service.

In this part, we'll develop a simple "deployment pipeline" that deploys each commit of your code automatically to Fly.io or Heroku if the committed code does not break anything.

Deployments can be significantly more complex, especially if we add requirements such as "the software must be available at all times during the deployment" (zero downtime deployments) or if we have to take things like database migrations into account. We won't cover complex deployments like those in this part but it's important to know that they exist.


We'd likely want to do some of these steps:

Lint: to keep our code clean and maintainable
Build: put all of our code together into software
Test: to ensure we don't break existing features
Package: Put it all together in an easily movable batch
Upload/Deploy: Make it available to the world