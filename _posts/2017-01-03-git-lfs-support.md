---
layout: post
title: "GitLFS support in GitBucket"
date: 2017-01-03 00:00:00
image: /images/git-lfs-support/lfs-server-url.png
categories: gitbucket
---

Happy new year, everyone! We are going to do GitBucket as usual in 2017 as well.

By the way, I'm working for [GitLFS support](https://github.com/gitbucket/gitbucket/pull/1401) in GitBucket these days. I would like to talk about it today.

## Think about GitLFS support in GitBucket

GitLFS is a git extension to separate large files from git repository. We can see GitLFS specification at [here](https://github.com/git-lfs/git-lfs/blob/master/docs/README.md) and already there are some Java based implementations.

- [JGit](https://github.com/eclipse/jgit/tree/master/org.eclipse.jgit.lfs.server)
- [Gitblit](https://github.com/gitblit/gitblit/blob/master/src/site/setup_filestore.mkd)
- [git-lfs-java](https://github.com/bozaro/git-lfs-java)

From these options, I chose JGit's lfs server implementation and tried to integrate it with GitBucket.

At first, JGit's lfs server implementation does not have Batch API implementation, so I made it by myself.

Problem was JGit's lfs server uses asynchrnous support in Servlet 3.0. Since LFS server receives and sends large files mainly, handling them as asynchronous is reasonable. However GitBucket has many existing non-async filters chain. It's impossible to put it together.

Solution is that only Batch API is working on GitBucket and its response points a location of GitLFS server url that is working on an other server.

## Test experimental GitLFS support

Experimental GitLFS support is now available.

You can get GitLFS server implementation from [here](https://github.com/gitbucket/gitbucket-lfs). Clone this repository and hit `sbt ~jetty:start` on the root directory. GitLFS server is run at `http://localhost:9090/git-lfs`.

Next, checkout [git-lfs-support branch](https://github.com/gitbucket/gitbucket/tree/git-lfs-support) of GitBucket and run it as well.

To enable GitLFS support, put GitLFS server url as `http://localhost:9090/git-lfs` at the system settings page in GitBucket.

![GitLFS configuration]({{site.baseurl}}/images/git-lfs-support/lfs-server-url.png)

It's all. Now you can use GitLFS on GitBucket normally. Large files are stored under `GITBUCKET_HOME/lfs`.

GitLFS support in GitBucket is still experimantal. It has several problemns currently including a security issue or various storage support. We have to continue to consider GitLFS support.
