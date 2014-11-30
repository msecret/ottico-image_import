ottico-image-import
===================

An import script to process image data and export it to a sql file to add to ottico.miceover.com

use
---
Call the node oip.js file with arguments to process images. Currently will
ignore all files expect for jpg.

Args:
* albumId {number}: The album id to assign to each picture.
* dir {string}: The directory where all the images are.

```bash
node build/js/oip.js 2 /~/Pictures/folder/
```

Note: Currently the script is taking very long to run possibly due to
imagemagick. I'm unsure why imagemagick is taking so long to query meta data.


development
-----------

Install typescript globally:
```bash
npm install -g typescript
```

Then install required dependencies:
```bash
npm install
```

build:
```bash
npm run build
```

test:
```bash
npm run test
```
