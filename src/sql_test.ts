///<reference path='../typings/tsd.d.ts' />

import tape = require('tape');

import fixtures = require('./fixtures');
import p = require('./picture');
import sql = require('./sql');

var testMetaData = fixtures.createTestMetaData();

tape('exists', (t: tape.Test) => {
  t.ok(sql, 'sql exists');
  t.end();
});

tape('insertPicture should return sql to insert picture', (t: tape.Test) => {
  var testPicture: p.Picture,
      expected: string,
      actual: string;

  expected = 'INSERT INTO pictures (name, description, image, image_thm, ' +
  'orientation, rating, exp_iso, exp_fs, exp_sh, focal_length, status, ' +
  'album_id) VALUES ("Name", "me", "name.jpg", "name_thm.jpg", "horizontal", ' +
  '2, 200, 8, "1/100", 18, "inactive", 7);';

  testMetaData.properties['exif:imagedescription'] = 'Name';
  testMetaData.properties['exif:usercomment'] = '109, 101';
  testMetaData.artifacts.filename = 'name.jpg';
  testMetaData.width = 800;
  testMetaData.height = 600;
  testMetaData.properties['exif:fnumber'] = '8/1';
  testMetaData.properties['exif:isospeedratings'] = '200';
  testMetaData.properties['exif:exposuretime'] = '1/100';
  testMetaData.properties['exif:focallength'] = '18/1';
  testPicture = new p.Picture(testMetaData, 7);
  actual = sql.insertPicture(testPicture);

  t.equals(actual, expected, 'The sql');
  t.end();
});
