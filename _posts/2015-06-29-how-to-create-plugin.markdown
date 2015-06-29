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

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  "gitbucket"     % "gitbucket-assembly" % "3.4.0" % "provided",
  "javax.servlet" % "javax.servlet-api"  % "3.1.0" % "provided"
)

resolvers += "amateras-repo" at "http://amateras.sourceforge.jp/mvn/"
```

Notice: gitbucket-assembly must be a latest version.

## Plug-in definition

Create below `Plugin` class which extends `gitbucket.core.plugin.Plugin` into `/src/main/scala`. Declare plug-in metadata and extension details in this class.

```scala
import gitbucket.core.service.SystemSettingsService.SystemSettings
import gitbucket.core.util.Version
import io.github.gitbucket.controller.HelloWorldController

class Plugin extends gitbucket.core.plugin.Plugin {
  override val pluginId: String = "helloworld"
  override val pluginName: String = "HelloWorld Plugin"
  override val description: String = "First example of GitBucket plug-in"
  override val versions: Seq[Version] = Seq(Version(1, 0))

  override val controllers = Seq(
    "/helloworld" -> new HelloWorldController()
  )
}
```

## Controller implementation

Implement `HelloWorldController` extends `gitbucket.core.controller.ControllerBase` and put it into `/src/main/io/github/gitbucket/helloworld/controller`. It's a generic Scalatra based controller servlet.

```scala
package io.github.gitbucket.controller

import gitbucket.core.controller.ControllerBase

class HelloWorldController extends ControllerBase {

  get("/helloworld"){
    "Hello World!"
  }

}
```

In this example, `HelloWorldController` returns plain text response. Of course, it's also possible to return any other type of response such as HTML rendered by Twirl template or JSON.

## Install and Test

Run `sbt package` and copy generated `/target/scala-2.11/gitbucket-helloworld-plugin_2.11-1.0.0.jar` to `~/.gitbucket/plugins` (If it does not exist, create its directory manually).

Then start GitBucket and access to http://localhost:8080/helloworld by your web browser, you will see `Hello World!` response.

## Next step

There are [gitbcucket-gist-plugin](https://github.com/takezoe/gitbucket-gist-plugin) as a practical example of GitBucket plug-in. Check it to know more details about GitBucket plug-in.

