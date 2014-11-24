enum Orientation {horizontal, vertical};
enum Status {active, inactive};
export class Picture {
  name: string;
  description: string;
  image: string;
  private imageThm: string;
  private orientation: Orientation;
  rating: number;
  expIso: number;
  expFs: number;
  expSh: number;
  focalLength: number;
  private albumId: number;
  private status: Status;

  constructor(image: string) { this.image = image; }

  convertCase() {}
}
