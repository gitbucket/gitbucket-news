GitBucket News
========

GitBucket News is hosted by Jekyll on GitHub Pages.

## Setup Jekyll on your machine

After install Ruby environment, you can install jekyll as follows:

```
gem install bundler jekyll jekyll-paginate jemoji jekyll-sitemap jekyll-feed jekyll-seo-tag jekyll-redirect-from
```

Then, you can run jekyll as below at the root directory of this branch and access to http://localhost:4000/ by your web browser.

```
jekyll server --baseurl '' --watch --future
```

You can stop jekyll by CTRL+C.

## Add new entry

You can add a new blog entry by adding a markdown file into `_post` directory.

## Add images

If you want to add image to the entry, put image files into `images` directory and reference them as below from markdown:

```
![alt text]({{site.baseurl}}/images/path/of/file.png)
```
