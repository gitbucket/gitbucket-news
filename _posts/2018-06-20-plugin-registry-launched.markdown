---
layout: post
title: "GitBucket plugin registry launched"
date: 2018-06-20 00:00:00
image: /images/plugin-registry-launched/gitbucket_plugins.png
categories: gitbucket
---

![GitBucket Plugins]({{site.baseurl}}/images/plugin-registry-launched/gitbucket_plugins.png)

As you may know, GitBucket has an extensive plugin system, and we wanted to make these plugins installable over Internet, (e.g. just like Jenkins does) since the very first versions of GitBucket. We  realized early that there might be problems maintaining plugins since it's hard to detect the necessity of updating a plugin for a new version of GitBucket before it's released, or even if there aren’t any changes to the plugin and an update wouldn't be necessary, sometimes an update release still needs to be made: with just the recompiled plugin for binary compatibility.

Therefore, we recently launched a central plugin registry that also works as an automatic build farm. Now it's working at [https://plugins.gitbucket-community.org](https://plugins.gitbucket-community.org) experimentally.

This registry offers for now the following features:

- Daily build check for the latest version (this means the latest tag) and development version (head of master branch) for all plugins registered.
- Release new versions of the plugins automatically when a new tag is added to either GitBucket or to the plugins.

Since the plugins are build against each GitBucket version, the released jar filename was changed to contain the GitBucket version too, not only the plugin version, e.g.: `gitbucket-gist-plugin-gitbucket_4.25.0-4.15.0.jar`. This way it’s easier to just download the jar files that corresponds to the installed GitBucket version, so no further compatibility checks between GitBucket and plugins are needed.

For plugin developers, no need to rebuild and release plugins by hand even if the GitBucket update contains binary imcompatibility. Furthermore, if there is necessity to modify source code to support the new version of GitBucket, they can know it by a notification in the daily build check.

For now, only the plugins under the GitBucket organization are being registered and automatically built. However we want extend this, to be able to register and build any third-party GitBucket plugin as well. I believe this would greatly help everybody: the plugin users, the plugin the developers as well as the GitBucket team, by reducing the maintenance effort for these plugins and also by improving the convenience of plugin installation and update.

As next step, we are working on the [new plugin manager](https://github.com/gitbucket/gitbucket/pull/2065) which would allow the users to install and update plugins from this registry directly from the GitBucket admin UI. I'm looking forward to announce and publish it.

