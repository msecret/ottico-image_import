///<reference path='../typings/tsd.d.ts' />

import tape = require('tape');

import p = require('./picture');

var testMetaData = {
  format: 'JPEG',
  class: 'DirectClass',
  geometry: '1200x799+0+0',
  resolution: '72x72',
  'print size': '16.6667x11.0972',
  units: 'Undefined',
  type: 'TrueColor',
  endianess: 'Undefined',
  colorspace: 'sRGB',
  depth: 8,
  'channel depth': { red: '8-bit', green: '8-bit', blue: '8-bit' },
  'channel statistics':
   { red:
      { min: '0 (0)',
        max: '255 (1)',
        mean: '123.619 (0.484779)',
        'standard deviation': '59.3961 (0.232926)',
        kurtosis: '-1.16809',
        skewness: '-0.106853' },
     green:
      { min: '0 (0)',
        max: '255 (1)',
        mean: '133.811 (0.524748)',
        'standard deviation': '65.4047 (0.256489)',
        kurtosis: '-1.38303',
        skewness: '-0.140975' },
     blue:
      { min: '0 (0)',
        max: '255 (1)',
        mean: '132.169 (0.518309)',
        'standard deviation': '76.9062 (0.301593)',
        kurtosis: '-1.5219',
        skewness: '0.171814' } },
  'image statistics':
   { overall:
      { min: '0 (0)',
        max: '255 (1)',
        mean: '129.866 (0.509279)',
        'standard deviation': '67.627 (0.265204)',
        kurtosis: '-1.30802',
        skewness: '0.0447373' } },
  'rendering intent': 'Perceptual',
  gamma: '0.454545',
  chromaticity:
   { 'red primary': '(0.64,0.33)',
     'green primary': '(0.3,0.6)',
     'blue primary': '(0.15,0.06)',
     'white point': '(0.3127,0.329)' },
  interlace: 'None',
  'background color': 'white',
  'border color': 'srgb(223,223,223)',
  'matte color': 'grey74',
  'transparent color': 'black',
  compose: 'Over',
  'page geometry': '1200x799+0+0',
  dispose: 'Undefined',
  iterations: '0',
  compression: 'JPEG',
  quality: 0.9,
  orientation: 'TopLeft',
  properties:
   { 'date:create': '2014-11-22T19:00:27-08:00',
     'date:modify': '2014-11-22T18:58:00-08:00',
     'exif:aperturevalue': '393216/65536',
     'exif:artist': 'Marco Segreto',
     'exif:colorspace': '65535',
     'exif:componentsconfiguration': '1, 2, 3, 0',
     'exif:customrendered': '0',
     'exif:datetime': '2014:11:22 18:58:00',
     'exif:datetimedigitized': '2014:09:30 10:33:36',
     'exif:datetimeoriginal': '2014:09:30 10:33:36',
     'exif:exifimagelength': '799',
     'exif:exifimagewidth': '1200',
     'exif:exifoffset': '268',
     'exif:exifversion': '48, 50, 50, 49',
     'exif:exposurebiasvalue': '0/1',
     'exif:exposuremode': '1',
     'exif:exposureprogram': '1',
     'exif:exposuretime': '1/125',
     'exif:flash': '16',
     'exif:flashpixversion': '48, 49, 48, 48',
     'exif:fnumber': '8/1',
     'exif:focallength': '18/1',
     'exif:focalplaneresolutionunit': '2',
     'exif:focalplanexresolution': '3888000/876',
     'exif:focalplaneyresolution': '2592000/583',
     'exif:imagedescription': 'Colosseum & Arch of Constantine',
     'exif:interoperabilityindex': 'R98',
     'exif:interoperabilityoffset': '37150',
     'exif:interoperabilityversion': '48, 49, 48, 48',
     'exif:isospeedratings': '100',
     'exif:make': 'Canon',
     'exif:makernote': '0, 34',
     'exif:meteringmode': '5',
     'exif:model': 'Canon EOS 1000D',
     'exif:orientation': '1',
     'exif:scenecapturetype': '0',
     'exif:shutterspeedvalue': '458752/65536',
     'exif:software': 'darktable 1.4',
     'exif:subsectime': '57',
     'exif:subsectimedigitized': '57',
     'exif:subsectimeoriginal': '57',
     'exif:usercomment': '0, 0',
     'exif:whitebalance': '1',
     'jpeg:colorspace': '2',
     'jpeg:sampling-factor': '2x2,1x1,1x1',
     'rdf:alt': '',
     signature: '49f121ff59561317d4dd1d016990890d7034406df01ca106a7b10524539d2dd0',
     unknown: '3' },
  profiles:
   { 'profile-exif': '37186 bytes',
     'profile-icc': '836 bytes',
     description: 'Adobe RGB (compatible)',
     manufacturer: 'Darktable',
     model: 'Adobe RGB',
     copyright: 'Public Domain' },
  'profile-xmp': '5121 bytes',
  artifacts:
   { filename: '/home/msecret/Insync/Pictures/europe2014-raw/ottico/europe_lg-0001.jpg',
     verbose: 'true' },
  tainted: 'False',
  filesize: '350KB',
  'number pixels': '959K',
  'pixels per second': '47.94MB',
  'user time': '0.010u',
  'elapsed time': '0:01.019',
  version: 'ImageMagick 6.7.7-10 2014-03-06 Q16 http://www.imagemagick.org',
  width: 1200,
  height: 799 };

tape('exists', (t: tape.Test) => {
  t.ok(p.Picture, 'Picture exists');
  t.end();
});

tape('setDimensions sets orientation property from width and height metadata',
    (t: tape.Test) => {
  var testPicture: p.Picture,
      expected: p.Orientation;

  testMetaData.width = 800;
  testMetaData.height = 600;

  testPicture = new p.Picture(testMetaData);
  expected = testPicture.setOrientation(testMetaData);

  t.equals(expected, p.Orientation.horizontal,
    'Should be horizontal orientation');

  testMetaData.height = 900;
  expected = testPicture.setOrientation(testMetaData);
  t.equals(expected, p.Orientation.vertical, 'Should be vertical orientation');
  t.end();
});