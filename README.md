# Path filtering in CircleCI

Forked from [circle-makotom/circle-advanced-setup-workflow](https://github.com/circle-makotom/circle-advanced-setup-workflow).

[Makoto Mizukami](https://github.com/circle-makotom) gets all of the credit for the [CircleCI®](https://circleci.com/docs/2.0/first-steps/) configs, and the entire concept of this repo.

As a slight change, the module directories are organized by language, like `js/` and `php/`.

This is similar to how WordPress plugins can look.

## Only runs jobs that are needed

The great thing about Makoto's idea here is that jobs only run when there's a certain diff.

For example, if there's no `.php` file in the diff, the PHPUnit tests won't run.

If there's no `.js` file in the diff, the Jest tests won't run.

And if the PR only changes `README.md`, no dynamic job will run, only the job `Create dynamic jobs`.

This repository demonstrates an advanced use case of the [setup workflow](https://circleci.com/blog/introducing-dynamic-config-via-setup-workflows/) feature on CircleCI.

## How does it work?

1. CircleCI triggers the setup job `Create dynamic jobs`, defined in [.circleci/config.yml](.circleci/config.yml).
2. That job finds which file types were changed in the current branch versus the [main](https://github.com/kienstra/circle-advanced-setup-workflow/tree/main) branch.
3. It emits those changed file types as pipeline parameters.
4. [.circleci/workflow.yml](.circleci/workflow.yml) receives those pipeline parameters, like `<< pipeline.parameters.run-php >>`.
5. Those determine whether to run the jobs for [php/](php/), [js/](js/), and [e2e/](e2e/).
