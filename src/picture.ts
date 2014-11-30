///<reference path='../typings/tsd.d.ts' />

import path = require('path');

export enum Orientation {horizontal, vertical};
enum Status {active, inactive};
export class Picture {
  metaData: IMetaData;
  name: string;
  description: string;
  image: string;
  private imageThm: string;
  private _orientation: Orientation;
  rating: number;
  expIso: number;
  expFs: number;
  expSh: number;
  focalLength: number;
  private albumId: number;
  private status: Status;

  constructor(metaData: IMetaData) {
    this.metaData = metaData;
    this._orientation = this.calcOrientation(this.metaData);
  }

  get orientation(): Orientation {
    return this._orientation;
  }

  set orientation(newOrientation: Orientation) {
    // TODO possibly add error detection here.
    this._orientation = newOrientation;
  }

  resolveName(metaData: IMetaData): string {
    var fullPath = metaData.artifacts.filename;

    return path.basename(fullPath);
  }

  calcOrientation(metaData: IMetaData): Orientation {
    var width = metaData.width,
        height = metaData.height;

    if (width >= height) {
      return Orientation.horizontal;

    } else {
      return Orientation.vertical;
    }
  }
  convertCase() {}
  createThm(image: string) {}
}

interface ChannelDepth {
    red: string;
    green: string;
    blue: string;
}
interface Red {
    min: string;
    max: string;
    mean: string;
    'standard deviation': string;
    kurtosis: string;
    skewness: string;
}
interface Green {
    min: string;
    max: string;
    mean: string;
    'standard deviation': string;
    kurtosis: string;
    skewness: string;
}
interface Blue {
    min: string;
    max: string;
    mean: string;
    'standard deviation': string;
    kurtosis: string;
    skewness: string;
}
interface ChannelStatistics {
    red: Red;
    green: Green;
    blue: Blue;
}
interface Overall {
    min: string;
    max: string;
    mean: string;
    'standard deviation': string;
    kurtosis: string;
    skewness: string;
}

interface ImageStatistics {
    overall: Overall;
}
interface Chromaticity {
    'red primary': string;
    'green primary': string;
    'blue primary': string;
    'white point': string;
}
interface Properties {
    'date:create': string;
    'date:modify': string;
    'exif:aperturevalue': string;
    'exif:artist': string;
    'exif:colorspace': string;
    'exif:componentsconfiguration': string;
    'exif:customrendered': string;
    'exif:datetime': string;
    'exif:datetimedigitized': string;
    'exif:datetimeoriginal': string;
    'exif:exifimagelength': string;
    'exif:exifimagewidth': string;
    'exif:exifoffset': string;
    'exif:exifversion': string;
    'exif:exposurebiasvalue': string;
    'exif:exposuremode': string;
    'exif:exposureprogram': string;
    'exif:exposuretime': string;
    'exif:flash': string;
    'exif:flashpixversion': string;
    'exif:fnumber': string;
    'exif:focallength': string;
    'exif:focalplaneresolutionunit': string;
    'exif:focalplanexresolution': string;
    'exif:focalplaneyresolution': string;
    'exif:imagedescription': string;
    'exif:interoperabilityindex': string;
    'exif:interoperabilityoffset': string;
    'exif:interoperabilityversion': string;
    'exif:isospeedratings': string;
    'exif:make': string;
    'exif:makernote': string;
    'exif:meteringmode': string;
    'exif:model': string;
    'exif:orientation': string;
    'exif:scenecapturetype': string;
    'exif:shutterspeedvalue': string;
    'exif:software': string;
    'exif:subsectime': string;
    'exif:subsectimedigitized': string;
    'exif:subsectimeoriginal': string;
    'exif:usercomment': string;
    'exif:whitebalance': string;
    'jpeg:colorspace': string;
    'jpeg:sampling-factor': string;
    'rdf:alt': string;
    'signature': string;
    'unknown': string;
}
interface Profiles {
    'profile-exif': string;
    'profile-icc': string;
    description: string;
    manufacturer: string;
    model: string;
    copyright: string;
}
interface Artifacts {
    filename: string;
    verbose: string;
}
export interface IMetaData {
    format: string;
    class: string;
    geometry: string;
    resolution: string;
    'print size': string;
    units: string;
    type: string;
    endianess: string;
    colorspace: string;
    depth: number;
    'channel depth': ChannelDepth;
    'channel statistics': ChannelStatistics;
    'image statistics': ImageStatistics;
    'rendering intent': string;
    gamma: string;
    chromaticity: Chromaticity;
    interlace: string;
    'background color': string;
    'border color': string;
    'matte color': string;
    'transparent color': string;
    compose: string;
    'page geometry': string;
    dispose: string;
    iterations: string;
    compression: string;
    quality: number;
    orientation: string;
    properties: Properties;
    profiles: Profiles;
    'profile-xmp': string;
    artifacts: Artifacts;
    tainted: string;
    filesize: string;
    'number pixels': string;
    'pixels per second': string;
    'user time': string;
    'elapsed time': string;
    version: string;
    width: number;
    height: number;
}

/*
export interface IMetaData {
  format: string;
  class: string;
  geometry: string;
  resolution: string;
  'print size': string;
  units: void;
  type: string;
  endianess: string;
  colorspace: string;
  depth: number;
  'channel depth': { red: string; green: string; blue: string };
  'channel statistics':
   { red:
      { min: string;
        max: string;
        mean: string;
        'standard deviation': string;
        kurtosis: string;
        skewness: string; }
     green:
      { min: string;
        max: string;
        mean: string;
        'standard deviation': string;
        kurtosis: string;
        skewness: string; }
     blue:
      { min: string;
        max: string;
        mean: string;
        'standard deviation': string;
        kurtosis: string;
        skewness: string; }
  'image statistics':
   { overall:
      { min: string;
        max: string;
        mean: string;
        'standard deviation': string;
        kurtosis: string;
        skewness: string; } };
  'rendering intent': string;
  gamma: string;
  chromaticity:
   { 'red primary': string;
     'green primary': string;
     'blue primary': string;
     'white point': string;
  interlace: string;
  'background color': string;
  'border color': string;
  'matte color': string;
  'transparent color': string;
  compose: string;
  'page geometry': string;
  dispose: string;
  iterations: string;
  compression: string;
  quality: number;
  orientation: string;
  properties:
   { 'date:create': string;
     'date:modify': string;
     'exif:aperturevalue': string;
     'exif:artist': string;
     'exif:colorspace': string;
     'exif:componentsconfiguration': string;
     'exif:customrendered': string;
     'exif:datetime': string;
     'exif:datetimedigitized': string;
     'exif:datetimeoriginal': string;
     'exif:exifimagelength': string;
     'exif:exifimagewidth': string;
     'exif:exifoffset': string;
     'exif:exifversion': string;
     'exif:exposurebiasvalue': string;
     'exif:exposuremode': string;
     'exif:exposureprogram': string;
     'exif:exposuretime': string;
     'exif:flash': string;
     'exif:flashpixversion': string;
     'exif:fnumber': string;
     'exif:focallength': string;
     'exif:focalplaneresolutionunit': string;
     'exif:focalplanexresolution': string;
     'exif:focalplaneyresolution': string;
     'exif:imagedescription': string;
     'exif:interoperabilityindex': string;
     'exif:interoperabilityoffset': string;
     'exif:interoperabilityversion': string;
     'exif:isospeedratings': string;
     'exif:make': string;
     'exif:makernote': string;
     'exif:meteringmode': string;
     'exif:model': string;
     'exif:orientation': string;
     'exif:scenecapturetype': string;
     'exif:shutterspeedvalue': string;
     'exif:software': string;
     'exif:subsectime': string;
     'exif:subsectimedigitized': string;
     'exif:subsectimeoriginal': string;
     'exif:usercomment': string;
     'exif:whitebalance': string;
     'jpeg:colorspace': string;
     'jpeg:sampling-factor': string;
     'rdf:alt': string;
     signature: string;
     unknown: string; };
  profiles:
   { 'profile-exif': string;
     'profile-icc': string;
     description: string;
     manufacturer: string;
     model: string;
     copyright: string; };
  'profile-xmp': string;
  artifacts:
   { filename: string;
     verbose: string; };
  tainted: string;
  filesize: string;
  'number pixels': string;
  'pixels per second': string;
  'user time': string;
  'elapsed time': string;
  version: string;
  width: number;
  height: number; }};
};
*/
