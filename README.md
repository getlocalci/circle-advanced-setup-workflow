# Path filtering + config splitting on CircleCI

Forked from [circle-makotom/circle-advanced-setup-workflow](https://github.com/circle-makotom/circle-advanced-setup-workflow).

[Makoto Mizukami](https://github.com/circle-makotom) gets all of the credit for the CircleCI® configs, and the entire concept of this repo.

The main change is making the module directories organized by language, like `js/` and `php/`, and adding very basic examples in them.

This is similar to how WordPress plugins can look.

The great thing about Makoto's idea here is that jobs only run when there's a certain diff.

For example, if there's no `.php` file in the diff, the PHPUnit tests won't run.

And if the only edits are in `README.md`, no dynamic jobs run.

This repository demonstrates an advanced use case of setup workflow feature on CircleCI. For instance, it implements both path filtering and config splitting.

## Files

* `.circleci/config.yml` implements both 1) the setup workflow, and 2) common resources (i.e., jobs and commands) for main workflows/jobs.
* `php/.circleci/config.yml`, `js/.circleci/config.yml`, and `e2e/.circleci/config.yml` implement independent modular configs for modules `php/`, `js/`, and `e2e/`, respectively.

## How does it work?

1.  Upon the initial trigger, CircleCI triggers the setup job `setup-dynamic-config` defined in `.circleci/config.yml`.
2.  Given a list of directories, detect which subdirectories (herein modules) have changes. (cf. `list-changed-modules`)
3.  Fetch `path-to-module/.circleci/config.yml` for each module to build, and merge all the fetched `config.yml` (along with the config defining common resources, i.e., `.circleci/config.yml`) using `yq`. (cf. `merge-modular-configs`)
4.  Trigger execution of the merged config.
