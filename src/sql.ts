///<reference path='../typings/tsd.d.ts' />

import p = require('./picture');

export function insertPicture(pic: p.Picture): string {
  var serial = pic.toJSON(),
      sqls = '',
      sqlsProps = '',
      sqlsVals = '',
      propName: string,
      propNames: string[],
      propValue: any,
      propValues: any[];

  sqlsProps += 'INSERT INTO pictures (';
  sqlsVals += ' VALUES (';
  for (propName in serial) {
    if (serial.hasOwnProperty(propName)) {
      sqlsProps += writeProp(propName);
      propValue = serial[propName];
      sqlsVals += writeValue(propValue);
    }
  }
  sqlsProps = sqlsProps.substring(0, sqlsProps.length - 2);
  sqlsProps += ')';
  sqlsVals = sqlsVals.substring(0, sqlsVals.length - 2);
  sqlsVals += ');';

  return sqlsProps + sqlsVals;
}

function writeProp(prop: string): string {
  var sql = '';
  sql += prop;
  sql += ', ';
  return sql;
}

function writeValue(value: any): string {
  var sql = '';
  if (typeof value === 'number') {
    sql += value;
  } else {
    sql += '"' + value + '"';
  }
  sql += ', ';
  return sql;
}
