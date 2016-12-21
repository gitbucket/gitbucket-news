GitBucket News
========

GitBucket News is hosted by Jekyll on GitHub Pages.

## Add new entry

You can add a new blog entry by adding a markdown file into `_post` directory.

To confirm actual presentation, run jekyll as below at the root directory of this branch and access to http://localhost:4000/ by your web browser.

```
jekyll server --baseurl '' --watch --future
```

You can stop jekyll by CTRL+C.

## Add images

If you want to add image to the entry, put image files into `images` directory and reference them as below from markdown:

```
![alt text]({{site.baseurl}}/images/path/of/file.png)
```
