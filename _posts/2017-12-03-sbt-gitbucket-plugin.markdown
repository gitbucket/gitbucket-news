---
layout: post
title: "sbt plugin for GitBucket plugin developers"
date: 2017-12-03 00:00:00
categories: gitbucket
---

[sbt-gitbucket-plugin](https://github.com/gitbucket/sbt-gitbucket-plugin) is a sbt plugin for GitBucket plugin developers.

This plugin provides following functionality in your GitBucket plugin project:

- Add GitBucket core library and Servlet API dependencies to the project as "provided" scope
- Enable [sbt-assembly](https://github.com/sbt/sbt-assembly) plugin to package your GitBucket plugin
- Enable [sbt-twirl](https://github.com/playframework/twirl) plugin to compile twirl templates
- Enable `sbt install` task to build and install the GitBucket plugin to the local GitBucket instance

You can enable this plugin by just adding a following line to `project/plugin.sbt` of your GitBucket plugin project:

```scala
addSbtPlugin("io.github.gitbucket" % "sbt-gitbucket-plugin" % "1.2.0")
```

and define the target GitBucket version in `build.sbt`:

```scala
gitbucketVersion := "4.19.0"
```

[gitbucket-plugin-template](https://github.com/gitbucket/gitbucket-plugin-template) has been updated to use this plugin, so you can start GitBucket plugin development with sbt-gitbucket-plugin from this template project.

If you created a plugin, let us know to add your plugin to [GitBucket Community Plugins](https://gitbucket-plugins.github.io/)!
