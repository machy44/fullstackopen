### language: C#

Regarding linting from VS2019+ creating .editorconfig should be enough for basic linting. Third party packages are not required in this case. In this case you can do something similar as you can do in JS/TS world and you can download someone's elses rules or you can create your own formatting/linting rules.

If you want more "advanced" formatter you could use libraries like StyleCop or SonarLint which both can be installed through Nuget package registry (something like npm registry for JS ecosystem).  

For unit tests and integration tests C# env has many options and xUnit, NUnit, MSTest are one of these. Also NUnit and MSTest can be used for other .NET languages like F# and visual basic. NUnit seems most popular in C# world.

You can use few methods to build an application like visual studio IDE, MSbuild command-line tool and azure pipelines. If you are not using
azure pipelines as your CI/CD system the best way to build the application is with MSbuild command-line tool.

CI besides Jenkins and github actions are AWS CodePipeline, azure pipelines, cloud build(CI/CD on Google Cloud), circle ci, bamboo, travis ci, semaphore, bitbucket pipelines, gitlab CI/CD .etc

For the project where 6 developers are working it seems like self hosted CI/CD is not necessary because project still seems to be small/medium. I would go with cloud service in this case. In this case we can avoid hiring new employee who will take care of hardware and everything else needed to take care of the self hosted system.
Also in this phase of the project developers should be focused most of the time on the development (optimizing the product, developing new features, resolving bugs) and with cloud-based CI/CD it is more than possible.


## TODO 
### language: python