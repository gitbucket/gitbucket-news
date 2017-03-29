---
layout: post
title: "Benchmark of GitBucket / Gogs / Gitea / GitLab on Raspberry Pi 3"
date: 2017-03-27 00:00:00
image: https://qiita-image-store.s3.amazonaws.com/0/53147/e33d4c2e-661d-e8f2-fac3-44044bd7d64f.png
categories: gitbucket
---
# Benchmark of GitBucket / Gogs / Gitea / GitLab on Raspberry Pi 3

Translated from a Japanese article by [@kounoike](https://github.com/kounoike).

http://qiita.com/kounoike/items/7c42db90c42e280e1cab

## Introduction

Although I prefer GitBucket than Gogs, Gitea ot GitLab personally, Gogs / Gitea seems faster than GitBucket because it's written in Go. But is it truth? I took a benchmark to confirm it.

I used Raspberry Pi 3B as a testing server, but I don't recommend to use Raspberry Pi to offer Git server (Storing Git repositories to SD card is unreasonable!). Raspberry Pi was convenient as a testing environment because I can revert environment by just copying a SD card image.

## Environment

|Item    |Detail                           |
|--------|---------------------------------|
|Hardware|Raspberry Pi 3 Model B           |
|SoC     |Broadcom BCM2837                 |
|CPU     |ARM Cortex-A53(1.2GHz Quad Core) |
|RAM     |1GB                              |
|SD card |TOSHIBA EXCERIA 16GB (MU-F016GX) |
|Network |IEEE802.11n 2.4GHz               |
|OS image|Raspbian Jessie Lite 2017-03-03  |

A client was Macbook (New Macbook) that is on the same network with Raspberry Pi.

## Target

|Name         |DB         |Version         |
|-------------|-----------|----------------|
|GitBucket    |H2         |4.10.0          |
|Gogs         |SQLite3    |v0.9.141_raspi2 |
|Gitea        |SQLite3    |1.1-linux-arm-7 |
|GitBucket+pg |PostgreSQL |4.10.0          |
|Gogs+pg      |PostgreSQL |v0.9.141_raspi2 |
|Gitea+pg     |PostgreSQL |1.1-linux-arm-7 |
|GitLab       |PostgreSQL |9.0.0-rc7.ce.0  |

MySQL wasn't tested because a MySQL 5.7+ that is required by GitBucket doesn't exist in Raspbiean Jessie packages.

## Settings

I set up follwoing three images:

- GitBucket, Gogs, Gitea
- GitBucket, Gogs, Gitea with PostgreSQL
- GitLab

Each images put into a SD card. Then I created a root account and a test account, and generated an access token by that test account. In this point, I copied these images as start point of benchmark. GitLab was ran as daemon because it set up as daemon in default, but GitBucket, Gogs, Gitea were ran in standalone mode.

## Results

### Memory usage

Compared results of `free -m` after startup without any Web / SSH accesses.

Before startup

```
pi@raspberrypi:~ $ free -m
             total       used       free     shared    buffers     cached
Mem:           925         79        845          6          6         39
-/+ buffers/cache:         34        891
Swap:           99          0         99
```

GitBucket

```
pi@raspberrypi:~ $ free -m
             total       used       free     shared    buffers     cached
Mem:           925        289        636          6          7        172
-/+ buffers/cache:        108        816
Swap:           99          0         99
```

Gogs

```
pi@raspberrypi:~ $ free -m
             total       used       free     shared    buffers     cached
Mem:           925        181        744          6          7        122
-/+ buffers/cache:         50        875
Swap:           99          0         99
```

Gitea

```
pi@raspberrypi:~ $ free -m
             total       used       free     shared    buffers     cached
Mem:           925        201        723          6          8        141
-/+ buffers/cache:         51        873
Swap:           99          0         99
```

Before startup pg

```
pi@raspberrypi:~ $ free -m
             total       used       free     shared    buffers     cached
Mem:           925        109        815         17          8         64
-/+ buffers/cache:         37        888
Swap:           99          0         99
```

GitBucket+pg

```
pi@raspberrypi:~ $ free -m
             total       used       free     shared    buffers     cached
Mem:           925        333        592         18          9        199
-/+ buffers/cache:        124        801
Swap:           99          0         99
```

Gogs+pg

```
pi@raspberrypi:~ $ free -m
             total       used       free     shared    buffers     cached
Mem:           925        216        709         19          9        152
-/+ buffers/cache:         53        871
Swap:           99          0         99
```

Gitea+pg

```
pi@raspberrypi:~ $ free -m
             total       used       free     shared    buffers     cached
Mem:           925        242        683         21          9        175
-/+ buffers/cache:         57        868
Swap:           99          0         99
```

GitLab

```
pi@raspberrypi:~ $ free -m
             total       used       free     shared    buffers     cached
Mem:           925        820        104         26         27        214
-/+ buffers/cache:        579        346
Swap:           99          0         99
```

### Top page after logged-in

At first, I measured time to just display the top page after logged-in on Chrome on MackBook. Reloaded 5 times for warm-up before testing. Then measure 5 times and took average of them.

![Results of top page after logged-in]({{site.baseurl}}/images/benchmark-of-gitbucket/toppage.png)

GitLab is slow a little, but others looks roughly same.

### User page by number of repositories

Created n repositories (n = 1, 10, 50, 100) by the test account and measured time to display the user page.

Note that GitBucket displays all repositories at once, but Gogs, Gitea and GitLab paginate them.

In Gogs / Gitea, if API calls to create repository and requests from the browser to reference repositories are conflicted, it caused 500 Internal Server Error sometimes.

![Results of user page by number of repositories]({{site.baseurl}}/images/benchmark-of-gitbucket/list-of-repositories.png)

GitBucket is increasing linearly. Probably, a reason of this results is GitBucket is displaying all repositories at once.

### Issue list page by number of issues

Created one repository by the test account and created n issues (n = 1, 10, 50, 100) in that repository. Then measured time to display the issue list page.

![Results of issue list page by number of issues]({{site.baseurl}}/images/benchmark-of-gitbucket/list-of-issues.png)

Although issues are paginated in all products, GitLab looks to be increasing linearly. And GitBucket is slower than Gogs / Gitea.

### Individual issue by number of comments

Created one repository by the test account, and created 1 issue in the repository, and register n cooments (n = 1, 10, 50, 100) to that issue.

In Gogs, the server returned 500 but it's resistered normally.

![Rssults of individual issue by number of comments]({{site.baseurl}}/images/benchmark-of-gitbucket/issue.png)

GitLab was much slower than others. I removed GitLab from the graph because I want like to compare others.

![Rssults exclude GitLab]({{site.baseurl}}/images/benchmark-of-gitbucket/issue-excludes-GitLab.png)

Although GitBucket doesn't good for the issues list, it looks good in the issue page. However Gogs / GitBucket is increasing linearly and Gitea is flat, so they might be slower than Gitea when comments are increased more.

### Clone repository

Measured time to push [this repository](https://github.com/gitbucket/gitbucket) and clone that repository via both HTTP and SSH. This test results was taken from only one execution.

![push-http]({{site.baseurl}}/images/benchmark-of-gitbucket/push-http.png)

![clone-http]({{site.baseurl}}/images/benchmark-of-gitbucket/clone-http.png)

![push-ssh]({{site.baseurl}}/images/benchmark-of-gitbucket/push-ssh.png)

![clone-ssh]({{site.baseurl}}/images/benchmark-of-gitbucket/clone-ssh.png)

In pushing via HTTP, GitLab is much slow, others are side by side. In cloning via HTTP, all products are side by side. In pushing / cloning via SSH, GitLab is slow. Gogs looks better in others, but it might be an error of measurement.

I got error messages in pushing to Gitea, but it looked to be working fine.

## Conclusion

GitLab is slow. I think it's too heavy in even Raspberry Pi 3B.

Couldn't find obvious difference in Gogs and Gitea. But I got errors in calling repository creation API during referencing by web browser. Perhaps I expect SQLite3 is bad.

I expected GitBucket is much slower than Gogs / Gitea before testing. However it was surprisingly good results. I think there is no need to avoid GitBucket for performance reasons.
