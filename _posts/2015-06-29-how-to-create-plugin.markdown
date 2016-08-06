---
layout: post
title: "How to create GitBucket plug-in"
date: 2015-06-29 00:00:00
categories: gitbucket
---

GitBucket has the plug-in system to extend itself from outside of GitBucket. In this entry, I show how to create a simple GitBucket plug-in.

## Create project

At first, create a new sbt project with below `build.sbt`:

```scala
name := "gitbucket-helloworld-plugin"

organization := "io.github.gitbucket"

version := "1.0.0"

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  "io.github.gitbucket" %% "gitbucket"         % "4.3.0" % "provided",
  "javax.servlet"        % "javax.servlet-api" % "3.1.0" % "provided"
)
```

Notice: Modify gitbucket dependency to a latest version.

## Plug-in definition

Create below `Plugin` class which extends `gitbucket.core.plugin.Plugin` into `/src/main/scala`. Declare plug-in metadata and extension details in this class.

```scala
import io.github.gitbucket.solidbase.model.Version
import io.github.gitbucket.helloworld.controller.HelloWorldController

class Plugin extends gitbucket.core.plugin.Plugin {
  override val pluginId: String = "helloworld"
  override val pluginName: String = "HelloWorld Plugin"
  override val description: String = "First example of GitBucket plug-in"
  override val versions: List[Version] = List(new Version("1.0.0"))

  override val controllers = Seq(
    "/helloworld" -> new HelloWorldController()
  )
}
```

## Controller implementation

Implement `HelloWorldController` extends `gitbucket.core.controller.ControllerBase` and put it into `/src/main/io/github/gitbucket/helloworld/controller`. It's a generic Scalatra based controller servlet.

```scala
package io.github.gitbucket.helloworld.controller

import gitbucket.core.controller.ControllerBase

class HelloWorldController extends ControllerBase {

  get("/helloworld"){
    "Hello World!"
  }

}
```

In this example, `HelloWorldController` returns plain text response. Of course, it's also possible to return any other type of response such as HTML rendered by Twirl template or JSON.

## Install and Test

Run `sbt package` and copy generated `/target/scala-2.11/gitbucket-helloworld-plugin_2.11-1.0.0.jar` to `~/.gitbucket/plugins` (If it does not exist, create its directory by hand).

Then start GitBucket and access to http://localhost:8080/helloworld by your web browser, you will see `Hello World!` response.

## Next step

A complete project explained in this article is [here](https://github.com/gitbucket/gitbucket-plugin-template). You can start plugin development from this project.

Furthermore, you can find practical plugins at [gitbucket community plugins](http://gitbucket-plugins.github.io/). Check source code of these plugins to know more details about GitBucket plug-in.

