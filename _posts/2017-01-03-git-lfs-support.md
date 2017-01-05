---
layout: post
title: "GitLFS support in GitBucket"
date: 2017-01-03 00:00:00
image: /images/git-lfs-support/blob-view.png
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

At first, JGit's lfs server implementation does not have Batch API implementation. It has only Transfer API, so I made Batch API by myself.

Problem was JGit's lfs server uses asynchrnous support in Servlet 3.0. Since LFS server receives and sends large files mainly, handling them as asynchronous is reasonable. However GitBucket has many existing non-async filters chain. It's impossible to put it together.

Eventually I also re-implemented Transfer API as non-async servlet.

## Test experimental GitLFS support

Experimental GitLFS support is now available in [git-lfs-support branch](https://github.com/gitbucket/gitbucket/tree/git-lfs-support) branch.

Checkout this branch and run it. Then you have to fill the base url of your GitBucket instance at the system settings page to enable GitLFS support.

![GitLFS configuration]({{site.baseurl}}/images/git-lfs-support/baseurl.png)

It's all. Now you can use GitLFS on GitBucket normally. Large files are stored under `GITBUCKET_HOME/repositories/<user>/<repository>/lfs`. At the blob view of the repository viewer, `LFS` badge is shown for LFS files as following:

![Blob view]({{site.baseurl}}/images/git-lfs-support/blob-view.png)

GitLFS support in GitBucket is still experimantal. It has several problems currently including a security issue or various storage support. We have to continue to consider GitLFS support.
