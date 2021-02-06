---
layout: post
title: "How to create GitBucket plug-in"
date: 2015-06-29 00:00:00
categories: gitbucket
---

GitBucket has the plug-in system to extend itself from outside of GitBucket. In this entry, I show how to create a simple GitBucket plug-in.

## Create project

First, create a new sbt project with the following `build.sbt` and `project/plugins.sbt`:

- build.sbt

  ```scala
  name := "gitbucket-helloworld-plugin"
  organization := "io.github.gitbucket"
  version := "1.0.0"
  scalaVersion := "2.13.3"
  gitbucketVersion := "4.35.3" // Update to the latest GitBucket version
  ```

- project/plugins.sbt

  ```scala
  addSbtPlugin("io.github.gitbucket" % "sbt-gitbucket-plugin" % "1.5.0")
  ```

[sbt-gitbucket-plugin](https://github.com/gitbucket/sbt-gitbucket-plugin) adds necessary library dependencies to the project automatically, and also provide some useful configuration and sbt task for GitBucket plugin development.

## Plug-in definition

Next, create `Plugin` which extends `gitbucket.core.plugin.Plugin` under `/src/main/scala`. Declare plug-in metadata and extension details in this class.

```scala
import io.github.gitbucket.helloworld.controller.HelloWorldController
import io.github.gitbucket.solidbase.model.Version

class Plugin extends gitbucket.core.plugin.Plugin {
  override val pluginId: String = "helloworld"
  override val pluginName: String = "HelloWorld Plugin"
  override val description: String = "First example of GitBucket plug-in"
  override val versions: List[Version] = List(new Version("1.0.0"))

  override val controllers = Seq(
    "/*" -> new HelloWorldController()
  )
}
```

## Controller implementation

Then, create `HelloWorldController` which extends `gitbucket.core.controller.ControllerBase` under `/src/main/io/github/gitbucket/helloworld/controller`. It's a typical Scalatra controller servlet.

```scala
package io.github.gitbucket.helloworld.controller

import gitbucket.core.controller.ControllerBase

class HelloWorldController extends ControllerBase {
  get("/helloworld"){
    "Hello World!"
  }
}
```

In this example, `HelloWorldController` returns a plain text response. Of course, it's also possible to return any other type of response such as HTML rendered by Twirl template or JSON.

## Install and Test

Run `sbt assembly` and copy generated `/target/scala-2.13/gitbucket-helloworld-plugin-1.0.0.jar` to `~/.gitbucket/plugins` (If this directory does not exist, create by hand).

Or you can do this process by just running `sbt install`. This sbt task generates a plugin jat file and copy it to GitBucket plugin directory.

Then, start GitBucket and access to http://localhost:8080/helloworld by your web browser, you will see `Hello World!` response.

## Next step

You can find a complete project which is explained in this article [here](https://github.com/gitbucket/gitbucket-plugin-template). You can start plugin development from this project.

Furthermore, you can find practical plugins at [gitbucket community plugins](http://gitbucket-plugins.github.io/). Check source code of these plugins to know more details about GitBucket plug-in.

