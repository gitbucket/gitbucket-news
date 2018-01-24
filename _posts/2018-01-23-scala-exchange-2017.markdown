---
layout: post
title: "GitBucket at Scala eXchange 2017"
date: 2017-12-23 00:00:00
image: /images/scala-exchange-2017/scala-exchange-2017.jpg
categories: gitbucket
---

![Merge strategy]({{site.baseurl}}/images/scala-exchange-2017/scala-exchange-2017.jpg)

I attended Scala eXchange 2017 in London at 14th - 15th Dec 2017 as a lightning talk speaker! I talked about GitBucket in 10 minutes. The slides is here:

<iframe src="//www.slideshare.net/slideshow/embed_code/key/FZHnaiKyPHpOX3" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/takezoe/gitbucket-git-centric-software-development-platform-by-scala" title="GitBucket: Git Centric Software Development Platform by Scala" target="_blank">GitBucket: Git Centric Software Development Platform by Scala</a> </strong> from <strong><a href="https://www.slideshare.net/takezoe" target="_blank">takezoe</a></strong> </div>

I introduced GitBucket and its techinology background in my talk. GitBucket uses Scalatra, not Play Framework which is a de facto standard of web framework in Scala. Scalatra is a web framework for Scala based on the traditional Java servlet, so it's not so efficient compare to non-blocking web framework like Play. But it makes possible to integrate existing servlet based resources such as GitServlet which is provided by JGit. It's an important thing for GitBucket. GitBucket is also based on a lot of existing Java middlewares and libraries such as Jetty, H2 and Apache MINA. It was impossible to make GitBucket without them.

I heard a lot of interesting talks maily about functional programming in the conference. It was very exciting 2 days. Thanks for great speakers, kind staffs and all attendees!