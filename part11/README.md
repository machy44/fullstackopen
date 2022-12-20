solutions from part 11

# ci/cd

In general when we talk about building we mean preparing software to run on the platform where it's intended to run. This might mean, for example, that if you've written your application in TypeScript, and you intend to run it on Node, then the build step might be transpiling the TypeScript into JavaScript.

Deploying a service (such as a web app) can vary in complexity. In part 3 our deployment workflow involved running some scripts manually and pushing the repository code to Fly.io or Heroku hosting service.

In this part, we'll develop a simple "deployment pipeline" that deploys each commit of your code automatically to Fly.io or Heroku if the committed code does not break anything.

Deployments can be significantly more complex, especially if we add requirements such as "the software must be available at all times during the deployment" (zero downtime deployments) or if we have to take things like database migrations into account. We won't cover complex deployments like those in this part but it's important to know that they exist.


We'd likely want to do some of these steps:

- Lint: to keep our code clean and maintainable
- Build: put all of our code together into software
- Test: to ensure we don't break existing features
- Package: Put it all together in an easily movable batch
- Upload/Deploy: Make it available to the world

package and deployment sometimes considered as not part of CI

The terms Continuous Delivery and Continuous Deployment (both of which have the acronym CD) are often used when one talks about CI that also takes care of deployments. but in general, we refer to CD as the practice where the main branch is kept deployable at all times. In general, this is also frequently coupled with automated deployments triggered from merges into the main branch.


With CI we can be systematic
- We can disallow commits directly to the main branch
- We can have our CI process run on all Pull Requests (PRs) against the main branch and allow merges only when our desired conditions are met e.g. tests pass
- We can build our packages for production in the known environment of the CI system

There are other advantages to extending this setup:

- If we use CD with deployment every time there is a merge to the main branch, then we know that it will always work in production
- If we only allow merges when the branch is up to date with the main branch, then we can be sure that different developers don't overwrite each other's changes

we are assuming that the main branch contains the code that is running in production but there are many different workflows https://www.atlassian.com/git/tutorials/comparing-workflows

## Important principles

You can think of CI as the answer to these questions:

- How to make sure that tests run on all code that will be deployed?
- How to make sure that the main branch is deployable at all times?
- How to ensure that builds will be consistent and will always work on the platform it'd be deploying to?
- How to make sure that the changes don't overwrite each other?
- How to make deployments happen at the click of a button or automatically when one merges to the main branch?

some links regarding devops and why CI/CD is must to have:
- https://itrevolution.com/product/accelerate/ 
- https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2681909

## Types of CI setup

There are two options: host our own server (Jenkins and other self-hosted setups
) or use a cloud service (GitHub Actions and other cloud-based solutions
).

Cloud-based options are also usually billed by build time which is something to consider.

small and medium projects - cloud service should be enough(they are limited with resources)
big projects - for most cases self-hosted setups are way to go

