---
layout: post
title: "Let's begin Scala with GitBucket!"
date: 2017-01-10 00:00:00
categories: gitbucket
---

Translated from original article by [@nazoking](https://github.com/nazoking) on Qiita in Japanese.

[http://qiita.com/nazoking@github/items/4518266ff0f4fd92bd0a](http://qiita.com/nazoking@github/items/4518266ff0f4fd92bd0a)

## What's GitBucket?

GitBucket is an open-source Git server based on Scala and JVM technologies. It provides features like GitHub or BitBucket and can be installed on your own server easily.

[https://github.com/gitbucket/gitbucket](https://github.com/gitbucket/gitbucket)

User's guide is available on [GitHub Wiki](https://github.com/gitbucket/gitbucket/wiki) and developer's guide is available on [docs directory](https://github.com/gitbucket/gitbucket/tree/master/doc) in the source tree.

## Build GitBucket

You have to install git and java / jdk (1.8) at first, and add java and javac to PATH environment variable.

Hit following commands:

```
# clone the source tree
git clone https://github.com/gitbucket/gitbucket.git
# move to the root directory of the source tree
cd gitbucket
# and run!
sbt ~jetty:start
```

Then you can see following messages:

```
Java HotSpot(TM) 64-Bit Server VM warning: ignoring option MaxPermSize=256m; support was removed in 8.0
Listening for transport dt_socket at address: 5005
[info] Loading global plugins from C:\Users\nazoking\.sbt\0.13\plugins
[info] Loading project definition from C:\Users\nazoking\git\gitbucket\project
:
```

Many libraries are downloaded and source code is compiled ; thus the first run takes a lot of time.

```
：
2017-12-29 17:27:49.625:WARN:oejsh.RequestLogHandler:main: !RequestLog
2017-12-29 17:27:49.685:INFO:oejs.ServerConnector:main: Started ServerConnector@7c6748bc{HTTP/1.1}{0.0.0.0:8080}
2017-12-29 17:27:49.685:INFO:oejs.Server:main: Started @8625ms
```

Build is finished. Open `http://localhost:8080/` in your browser. You can see GitBucket!

## sbt interactive console

The following command runs sbt:

```
sbt ~jetty:start
```

sbt is a build tool for Scala like Maven / Ant in Java or make / library management in C or gems + bundler + rake in Ruby. sbt also has an interactive console. You can start the interactive console as:

```
sbt
```

Following messages are shown and prompt is available. This is the sbt interactive console.

```
Java HotSpot(TM) 64-Bit Server VM warning: ignoring option MaxPermSize=256m; support was removed in 8.0
Listening for transport dt_socket at address: 5005
[info] Loading global plugins from C:\Users\nazoking\.sbt\0.13\plugins
[info] Loading project definition from C:\Users\nazoking\git\gitbucket\project
[info] Set current project to gitbucket (in build file:/C:/Users/nazoking/git/gitbucket/)
>
```

You can start GitBucket on this console as well by hitting `jetty:start` and stop it by `jetty:stop`.

`jetty:start` and `jetty:stop` are sbt task. `jetty:start` is a task to start a jetty server. If you prepend `~` to task, the task is run continually. In this case, `~jetty:start` means: run `jetty:start` task and watch sources for any update ; when some source code is modified, run `jetty:start` again.

You can exit from sbt console by `exit`. If jetty has not been stopped, it's stopped at this time.

Remember only sbt is a build tool for Scala, you can run tasks in sbt and sbt can watch files and re-run a task.

## Configuration on Windows

In sbt console, we can select commands from history by cursor keys but it doesn't work in Windows by default with non standard encoding (like japanese one). By adding `-Dinput.encoding=Cp1252` option, this feature works well again. This is the reason of `SET _JAVA_OPTIONS="-Dinput.encoding=Cp1252"` introduced first in the setup script (if `_JAVA_OPTIONS` is defined, java.exe adds it to bootstrap option automatically).

Also, on Windows, the following error is caused in packaging task when editing some CSS, etc:

```
[trace] Stack trace suppressed: run 'last *:webappPrepare' for the full output.
[error] (*:webappPrepare) java.io.FileNotFoundException: C:\Users\nazoking\git\gitbucket\target\webapp\assets\common\css\gitbucket.css (要求された操作はユーザー マップ セクションで開いたファイルでは実行できません。)
[error] Total time: 3 s, completed Jan 13, 2016 12:07:07 PM
```

This is because Jetty is locking files. Solution is to create the folllowing XML file under `src/main/webapp/WEB-INF/jetty-web.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" "http://www.eclipse.org/jetty/configure.dtd">
<Configure class="org.eclipse.jetty.webapp.WebAppContext">
  <Call name="setInitParameter">
    <Arg>org.eclipse.jetty.servlet.Default.useFileMappedBuffer</Arg>
    <Arg>false</Arg>
  </Call>
</Configure>
```

Reference: [http://www.eclipse.org/jetty/documentation/current/troubleshooting-locked-files-on-windows.html](http://www.eclipse.org/jetty/documentation/current/troubleshooting-locked-files-on-windows.html)

It's good to add `src/main/webapp/WEB-INF/jetty-web.xml` to your `gitbucket/.git/info/exclude` not to commit this file.

## Introduce JRebel

JRebel allows class reloading without restarting the JavaVM. It makes quick development cycle for JVM based applications. It can be used free for personal, non-commercial use.

1. Sign into myJRebel: [https://my.jrebel.com/](https://my.jrebel.com/)
2. You can get a license key at `Install and Activate` and download JRebel by `"Download jrebel"` (not a licence server) from [https://zeroturnaround.com/software/jrebel/download/#!/have-license](https://zeroturnaround.com/software/jrebel/download/#!/have-license).
3. Unzip a downloaded file, run `bin/activate-gui` and put your license key.
4. Define jrebel.jar path as an environment variable as `SET JREBEL=c:\develop\util\jrebel\jrebel.jar`.

When JRebel is available, use `jetty:start` and `~webappPrepare` instead of `~ jetty:start`.

```
sbt
:
Java HotSpot(TM) 64-Bit Server VM warning: ignoring option MaxPermSize=256m; support was removed in 8.0
Listening for transport dt_socket at address: 5005
:
> jetty:start
[info] Wrote rebel.xml to C:\Users\nazoking\git\gitbucket\target\scala-2.11\resource_managed\main\rebel.xml
[info] Compiling 2 Scala sources to C:\Users\nazoking\git\gitbucket\target\scala-2.11\classes...
[info] Packaging C:\Users\nazoking\git\gitbucket\target\scala-2.11\gitbucket_2.11-3.11.0-SNAPSHOT.jar ...
[info] Done packaging.
[info] starting server ...
[success] Total time: 20 s, completed Jan 13, 2016 12:01:55 PM
:
2017-01-13 12:05:18.699:INFO:oejs.ServerConnector:main: Started ServerConnector@28486680{HTTP/1.1}{0.0.0.0:8080}
2017-01-13 12:05:18.700:INFO:oejs.Server:main: Started @19739ms
> ~webappPrepare
:
```

This means "Watching source code and when modified, run `webappPrepare`".

In this state, try to modify `src/main/twirl/gitbucket/core/main.scala.html` and reload gitbucket application in your browser (normally F5 to reload page). You will see that modifications are applied faster than in the case of `~jetty:start` usage.

Although JRebel can reload classes, it can't initialize related classes (not in current version of JRebel). For example, if you add a new controller, it is not applied.  Also sometimes JRebel causes NoClassDefined error caused by cached classes inconsistency. In that case, once stop `~webappPrepare` (by ENTER key) and restart Jetty by `jetty:start`.

## Structure of source tree of GitBucket

The source tree of GitBucket has following directory structure:

- **contrib** Scripts for daemonize, etc
- **doc** Documentation for developers
- **project** Configuration management file for sbt
- **src** Source code
  - **test** Test code for automated test
  - **main** Source code of the application
    - **java** Java code (GitBucket has some Java code, but don't mind at first)
    - **resources** resource files such as XML files or scripts for migration
    - **twirl** HTML templates
    - **webapp** Resource files of web application such as CSS or JavaScript
    - **scala** Scala code

You may feel it's similar to Maven which is a traditional build tool in Java because sbt is made with Maven conscious.

We will edit files under `src/main/scala` in following sections mainly. HTML files are under `src/main/twirl`, JavaScript / CSS files are under `src/main/webapps/assets/`.

## View template (Twirl)

GitBucket is adopting [Twirl](https://www.playframework.com/documentation/2.5.x/ScalaTemplates) as view template. This had been part of Play Framework originally. We can embed Scala code to HTML in Twirl template.

The basic Scala syntax is not too difficult. If you have experience in other programming languages such as Java, JavaScript or Ruby, you will be able to understand it.

I recommend you to use an IDE if you want to edit Scala code. But if you edit only view templates, text editors such as vim or sublime text are enough (In fact, I'm using sublime text with [ensime](http://ensime.org/editors/sublime/) plug-in).

Twirl is similar to JSP or ERB. It recognizes parts after `@` as Scala code and process them in nice touch. File extension must be `.scala.html` and put under `src/main/twirl/gitbucket/core`.

As a test, modify `src/main/twirl/gitbucket/core/main.scala.html` a little and reload your browser. You will see a modified result.

- If `@` appears, there are Scala for a while. In particular:
  - Variable name:

    ```html
    <h1>@value1</h1>
    ```

  - Function name + arguments:

    ```html
    <h1>@func1(value1)</h1>
    ```

  - Function name (+ arguments) + block:

    ```html
    <ol>@func1(value1){ value2 => <li>@value2</li> }</o1>
    ```

  - Match expression:

    ```html
    <p>@value1 match { case condition-expression => <span>@condition</span> }</p>
    ```

  - Brackets:

    ```html
    <h1>@(value1 + value2)</h1>
    ```

In most cases, statements between `@` and end of `()` or `=>` at the first place of `{}` are Scala code. `@` can be escaped as `@@`.

Let's look an actual template:

```html
@(title: String)
<h1>@title</h1>
```

The first line is a declaration of arguments. Arguments are passed from controllers. This template is converted as (although it is not accurate, it is simplified for explanation here):

```scala
def view(title: String){
  return "<h1>" + escape(title) + "</h1>";
}
```

`def` is method in Scala. It's same as `function` keyword in JavaScript. `title: String` is one of arguments of this method. `title` is argument name and `String` is type name. In brief, this method takes an argument named `title` which is `String` type from controller, and use it in the template.

A part that actually uses this argument is `<h1>@title</h1>`. When rewritten in PHP it becomes like this:

```html
<h1><?php echo escape(title) ?></h1>
```

In Twirl, values are escaped automatically for XSS protection.

Expressions like _if_ or _for_ can also be used after `@`:

```html
@for(order <- orders) {
  <li>@order.getTitle()</li>
}
```

See [the template engine](https://www.playframework.com/documentation/2.5.x/ScalaTemplates) section in the Play documentation to learn more about Twirl. Perhaps, you may find a notice in that documentation:

> Declaring code block this way in a template can be sometime useful but keep in mind that a template is not the best place to write complex logic. It is often better to externalize these kind of code in a Scala class (that you can store under the views/ package as well if you want).

Yes. We shouldn't write complex logic in view template. Of course, view templates in GitBucket don't contain much complex logic (Maybe... I believe so).

GitBucket UI is based on [Bootstrap](http://getbootstrap.com/) and uses jQuery in JavaScript for some dynamic usages.

In this section, you learned Twirl and basis of GitBucket UI. Now you can change UI, replace a logo or change small behavior of GitBucket.

## Controller (Scalatra web framework)

GitBucket uses [Scalatra](http://www.scalatra.org/) web framework. Scalatra is a web framework for Scala inspired by Ruby's Sinatra. In Scala, Play is a major web framework. Play is based on non-blocking I/O, but since Scalatra is based on Java servlet, it can make use of existing servlet based resources. For example, GitBucket uses JGitServlet which is provided by JGit.

You can write servlet very easily as following:

```scala
class MyController extends ScalatraServlet with ScalateSupport {
  get("/hoge") {
    "Hello, world!"
  }
}
```

Try to re-write more Java like (but this code does not work):

```scala
class MyController extends ScalatraServlet, ScalateSupport {
  // Constructor
  public MyController(){
    Route route1 = new Route("GET", "/hoge")
    route1.setAction(new Action(){
      pulbic Object apply(){
        return "Hello, world!";
      }
    });
    this.addRoute(route1);
  }
}
```

If you have experience in web application development, you can understand what this code is doing. In Java, we have to write the routing definition inside the constructor using some anonymous class and quite a verbose syntax. On the other hand, we can write the routing definition more simply in Scala using the fact that the constructor is the class body; leading in far more readable syntax.

In GitBucket, you have to put this controllers into `src/main/scala/gitbucket/core/controller/MyController.scala`.

`src/main/scala` directory structure is:

- gitbucket/core
  - controller
  - model
  - service
  - ssh
  - util
  - view
  - servlet
  - plugin
  - api

First let look details of the controller because controller recieves a request at first.

A controller receives request from web browsers, processes it and returns a view. A controller in an above example returns a view as a string literal, but in GitBucket, controller returns Twirl HTML template basically.

Twirl is a template engine which is used in Play Framework as well (Twirl is a part of Play originally). It compiles a HTML which contains Scala code to Scala method. For example, `src/twirl/gitbucket/core/hoge.scala.html` is compiled to `gitbucket.core.html.hoge` function. This is a class but Scala has a function type. This class is used as a function.

Suppose there is a Twirl template at `src/twirl/gitbucket/core/hoge.scala.html`.

```html
@(message:String)
<div>@message</div>
```

You can call a function which is compiled from this template in a controller as following:

```scala
  get("/hoge") {
    gitbucket.core.html.hoge("Hello World")
  }
```

Put this controller into `src/main/scala/gitbucket/core/IndexController.scala` and open `/hoge` in your browser. You will see `Hello World`.

Twirl recognize parts after `@` as Scala code and process them in nice touch. Almost template files in `src/twirl/gitbucket/core` are matched with url. Try to see pages you care about on GitBucket.

In Scalatra, you can retreive request parameters as following:

```scala
  get("/hoge/:aaa") {
    "aaa="+ param("aaa") + " bbb=" + param("bbb")
  }
```

Add such method to a controller and open `/hoge/xxxx?bbb=yyy`, you will see "aaa=xxxx bbb=yyy".

OK. You can now create a controller which receives a request and returns a view by the description so far.

----

Welcome! This is a first step to development of GitBucket and Scala. Feel free to try and enjoy Scala programming on GitBucket!
