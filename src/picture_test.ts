///<reference path='../typings/tsd.d.ts' />

import tape = require('tape');

import fixtures = require('./fixtures');
import p = require('./picture');

var testMetaData = fixtures.createTestMetaData();

tape('exists', (t: tape.Test) => {
  t.ok(p.Picture, 'Picture exists');
  t.end();
});

tape('constructor should set name', (t: tape.Test) => {
  var testPicture: p.Picture,
      expected = 'A Nice Name',
      actual: string;

  testMetaData.properties['exif:imagedescription'] = expected;
  testPicture = new p.Picture(testMetaData);
  actual = testPicture.name;
  t.equals(expected, actual, 'Sets the name attr on construction');
  t.end();
});
tape('constructor should set description', (t: tape.Test) => {
  var testPicture: p.Picture,
      expected = 'me',
      actual: string;

  testMetaData.properties['exif:usercomment'] = '109, 101';
  testPicture = new p.Picture(testMetaData);
  actual = testPicture.description;
  t.equals(actual, expected, 'Sets the description attr on construction');
  t.end();
});
tape('constructor should set the image', (t: tape.Test) => {
  var testPicture: p.Picture,
      expected = 'thing.jpg',
      actual: string;

  testMetaData.artifacts.filename = expected;
  testPicture = new p.Picture(testMetaData);
  actual = testPicture.image;

  t.equals(expected, actual, 'Sets the image attr on construction');
  t.end();
});
tape('constructor should set the imageThm', (t: tape.Test) => {
  var testPicture: p.Picture,
      testName = '/path/to/thing.jpg',
      expected = 'thing_thm.jpg',
      actual: string;

  testMetaData.artifacts.filename = testName;
  testPicture = new p.Picture(testMetaData);
  actual = testPicture.imageThm;

  t.equals(expected, actual, 'Sets the imageThm attr on construction');
  t.end();
});
tape('constructor should set the orientation', (t: tape.Test) => {
  var testPicture: p.Picture,
      actual: p.Orientation,
      expected: p.Orientation;

  testMetaData.width = 800;
  testMetaData.height = 600;

  testPicture = new p.Picture(testMetaData);
  expected = p.Orientation.horizontal;
  actual = testPicture.orientation;

  t.equals(expected, actual, 'Orientation is set correctly to horizontal when '+
    'constucted');
  t.end();
});
tape('constructor should set the expFs', (t: tape.Test) => {
  var testPicture: p.Picture,
      actual: number,
      expected = 10;

  testMetaData.properties['exif:fnumber'] = '10/1';
  testPicture = new p.Picture(testMetaData);
  actual = testPicture.expFs;
  t.equals(actual, expected, 'The expFs is set correctly as a number')
  t.end();
});
tape('constructor should set the expSh', (t: tape.Test) => {
  var testPicture: p.Picture,
      actual: string,
      expected = '1/125';

  testMetaData.properties['exif:exposuretime'] = expected;
  testPicture = new p.Picture(testMetaData);
  actual = testPicture.expSh;
  t.equals(actual, expected, 'The expSh is set correctly as a number')
  t.end();
});
tape('constructor should set the focalLength', (t: tape.Test) => {
  var testPicture: p.Picture,
      actual: number,
      expected = 18;

  testMetaData.properties['exif:focallength'] = '18/1';
  testPicture = new p.Picture(testMetaData);
  actual = testPicture.focalLength;
  t.equals(actual, expected, 'The focalLength is set correctly as a number')
  t.end();
});
tape('constructor should set the expIso', (t: tape.Test) => {
  var testPicture: p.Picture,
      actual: number,
      expected = 100;

  testMetaData.properties['exif:isospeedratings'] = '100';
  testPicture = new p.Picture(testMetaData);
  actual = testPicture.expIso;
  t.equals(actual, expected, 'The expIso is set correctly as a number')
  t.end();
});
tape('constructor should set status to inactive', (t: tape.Test) => {
  var testPicture: p.Picture,
      actual: p.Status,
      expected = p.Status.inactive;

  testPicture = new p.Picture(testMetaData);
  actual = testPicture.status;
  t.equals(actual, expected, 'The status is set to inactive')
  t.end();
});
tape('constructor should set rating to 2', (t: tape.Test) => {
  var testPicture: p.Picture,
      actual: number,
      expected = 2;

  testPicture = new p.Picture(testMetaData);
  actual = testPicture.rating;
  t.equals(actual, expected, 'The rating is set to 2');
  t.end();
});
tape('constructor should set albumId to one passed in, or 0 if none',
    (t: tape.Test) => {
  var testPicture: p.Picture,
      actual: number;

  testPicture = new p.Picture(testMetaData);
  actual = testPicture.albumId;
  t.equals(actual, 0, 'When album id not passed in, set to 0')

  testPicture = new p.Picture(testMetaData, 8);
  actual = testPicture.albumId;
  t.equals(actual, 8, 'Album id set to number passed in')
  t.end();
});

tape('calcDimensions returns orientation from width and height metadata',
    (t: tape.Test) => {
  var testPicture: p.Picture,
      actual: p.Orientation;

  testMetaData.width = 800;
  testMetaData.height = 600;

  testPicture = new p.Picture(testMetaData);
  actual = testPicture.calcOrientation(testMetaData);

  t.equals(actual, p.Orientation.horizontal,
    'Should be horizontal orientation');

  testMetaData.height = 900;
  actual = testPicture.calcOrientation(testMetaData);
  t.equals(actual, p.Orientation.vertical, 'Should be vertical orientation');
  t.end();
});

tape('resolveImage will return just the filename and extension from path',
    (t: tape.Test) => {
  var testPicture: p.Picture,
      expected = 'thing.jpg',
      actual: string;

  testMetaData.artifacts.filename = '/path/to/' + expected;
  testPicture = new p.Picture(testMetaData);
  actual = testPicture.resolveImage(testMetaData);
  t.equals(expected, actual, 'Returns just the filename from full path');
  t.end();
});

tape('createThm returns the name with thm attached', (t: tape.Test) => {
  var testPicture: p.Picture,
      testName = 'thing.jpg',
      expected = 'thing_thm.jpg',
      actual: string;

  testPicture = new p.Picture(testMetaData);
  actual = testPicture.createThm(testName);
  t.equals(expected, actual, 'Sets thm string on name');
  t.end();
});

tape('convertAscii will convert an array of ascii codes to a string',
    (t: tape.Test) => {
  var testPicture: p.Picture,
      expected = 'me',
      actual: string;

  testPicture = new p.Picture(testMetaData);
  actual = testPicture.convertAscii('109, 101')
  t.equals(actual, expected, 'Converts a string of ascii codes to string');
  t.end();
});

tape('removeDenominator should return a number for the numerator',
    (t: tape.Test) => {
  var testPicture: p.Picture,
      expected = 18,
      actual: number;

  testPicture = new p.Picture(testMetaData);
  actual = testPicture.removeDenominator('18/1');
  t.equals(actual, expected, 'Removes the denominator and returns a number');
  t.end();
});

tape('convertCase should take a camelCase and convert to underscore',
    (t: tape.Test) => {
  var testPicture: p.Picture,
      actual: string;

  testPicture = new p.Picture(testMetaData);
  actual = testPicture.convertCase('imageThm');
  t.equals(actual, 'image_thm', 'Result is underscore cased');
  t.end();
});

tape('toJSON should return a json represnation of the object',(t: tape.Test) => {
  var testPicture: p.Picture,
      actual,
      expected;

  expected = {
    name: 'Test Name',
    description: 'me',
    image: 'tester.jpg',
    image_thm: 'tester_thm.jpg',
    orientation: 'horizontal',
    rating: 2,
    exp_iso: 200,
    exp_fs: 8,
    exp_sh: '1/100',
    focal_length: 18,
    status: 'inactive',
    album_id: 9
  };

  testMetaData.properties['exif:imagedescription'] = expected.name;
  testMetaData.properties['exif:usercomment'] = '109, 101';
  testMetaData.artifacts.filename = expected.image;
  testMetaData.width = 800;
  testMetaData.height = 600;
  testMetaData.properties['exif:fnumber'] = '8/1';
  testMetaData.properties['exif:isospeedratings'] = '200';
  testMetaData.properties['exif:exposuretime'] = '1/100';
  testMetaData.properties['exif:focallength'] = '18/1';
  testPicture = new p.Picture(testMetaData, expected.album_id);
  actual = testPicture.toJSON();
  t.deepEquals(actual, expected, 'A correct JSON representation ' +
      'the object');

  t.end();
});
