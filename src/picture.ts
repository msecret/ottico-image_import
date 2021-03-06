///<reference path='../typings/tsd.d.ts' />

import path = require('path');

var mapping = {
  expIso: 'exif:isospeedratings',
  expFs: 'exif:fnumber',
  expSh: 'exif:exposuretime',
  focalLength: 'exif:focallength'
}

export enum Orientation {horizontal, vertical};
export enum Status {active, inactive};
export class Picture {
  metaData: IMetaData;
  name: string;
  description: string;
  image: string;
  private _imageThm: string;
  private _orientation: Orientation;
  rating: number;
  private _expIso: number;
  expFs: number;
  expSh: string;
  focalLength: number;
  albumId: number;
  status: Status;

  constructor(metaData: IMetaData, albumId?: number) {
    this.metaData = metaData;
    this.name = metaData.properties['exif:imagedescription'];
    this.description = this.convertAscii(
        metaData.properties['exif:usercomment']);
    this.image = this.resolveImage(this.metaData);
    this._imageThm = this.createThm(this.image);
    this._orientation = this.calcOrientation(this.metaData);
    this.rating = 2;
    this.expIso = metaData.properties[mapping.expIso];
    this.expFs = this.removeDenominator(metaData.properties[mapping.expFs]);
    this.expSh = metaData.properties[mapping.expSh];
    this.focalLength = this.removeDenominator(
        metaData.properties[mapping.focalLength]);
    this.status = Status.inactive;
    this.albumId = albumId || 0;
  }

  get imageThm(): string {
    return this._imageThm;
  }

  set imageThm(thm: string) {
    this._imageThm = thm;
  }

  get orientation(): Orientation {
    return this._orientation;
  }

  set orientation(newOrientation: Orientation) {
    // TODO possibly add error detection here.
    this._orientation = newOrientation;
  }

  get expIso(): any {
    return this._expIso;
  }

  set expIso(newIso: any) {
    var iso = parseInt(newIso, 10);

    // TODO add error handling.
    if (!isNaN(iso)) {
      this._expIso = iso;
    }
  }

  convertAscii(codes: string): string {
    if (!codes) return '';
    var codesArr = codes.split(', '),
        character: string,
        characters =  '',
        i = 0,
        ilen = codesArr.length;

    for ( ; i < ilen; i++) {
      if (parseInt(codesArr[i], 10) === 0) {
        character = '';
      } else {
        character = String.fromCharCode(parseInt(codesArr[i], 10));
      }
      characters += character;
    }

    return characters;
  }

  resolveImage(metaData: IMetaData): string {
    var fullPath = metaData.artifacts.filename;

    return path.basename(fullPath);
  }

  createThm(name: string): string {
    var thm: string;
    thm = name.replace(/(\.[\w\d_-]+)$/i, '_thm$1');

    return thm;
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

  removeDenominator(fraction: string): number {
    var sep = fraction.split('/');

    return parseInt(sep[0], 10);
  }

  convertCase(text: string): string {
    return text.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
  }

  toJSON() {
    var toReturn = {},
        casedPropName = '',
        propName,
        propVal;

    for (propName in this) {
      if (this.hasOwnProperty(propName) && propName !== 'metaData') {
        propName = propName.replace('_', '');
        propVal = this[propName];
        if (propName === 'orientation') {
          propVal = Orientation[propVal];
        }
        if (propName === 'status') {
          propVal = Status[propVal];
        }
        casedPropName = this.convertCase(propName);
        toReturn[casedPropName] = propVal;
      }
    }

    return toReturn;
  }
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
