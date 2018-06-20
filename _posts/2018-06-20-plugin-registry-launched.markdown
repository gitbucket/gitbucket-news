---
layout: post
title: "GitBucket plugin registry launched"
date: 2018-06-20 00:00:00
image: /images/plugin-registry-launched/gitbucket_plugins.png
categories: gitbucket
---

![GitBucket Plugins]({{site.baseurl}}/images/plugin-registry-launched/gitbucket_plugins.png)

As you know, GitBucket has plugin system. We wanted to make plugins are able to be installed via internet like Jenkins since the beginning of GitBucket. Further, we realized that there are troubles in maintenance of plugins because it's hard to detect necessity of updating plugins for the new version of GitBucket before it's released. Or even if any update isn't necessary, sometimes we have to release just recompiled plugins by binary compatibility breaking.

Therefore, we launched a central plugin registry that also works as an automatic build farm. Now it's working at [https://plugins.gitbucket-community.org](https://plugins.gitbucket-community.org) experimentally.

This registry offers following features:

- Daily build check for the latest version (this means the latest tag) and development version (head of master branch) of plugins
- Release new version of plugins when new tag is added to GitBucket or plugins

Since plugins are build for each GitBucket version, released jar filename become to contain the GitBucket version not only the plugin version as `gitbucket-gist-plugin-gitbucket_4.25.0-4.15.0.jar`. We can download a jar file which corresponds to the GitBucket version, so no longer need to think about compatibility of GitBucket and plugins.

For now, only plugins which are under the GitBucket organization umbrella are registered. However we want to be able to register any third-party plugins as well. I believe it helps both plugin developers and GitBucket administrators by reducing maintenance cost of plugins and improving convenience of plugin installation / updating.

As next step, we are working on the [new plugin manager](https://github.com/gitbucket/gitbucket/pull/2065) which makes possible to install and update plugins from this registry. I'm looking forward to announce the publish it.

