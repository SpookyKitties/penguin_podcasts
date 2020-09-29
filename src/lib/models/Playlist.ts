export class Playlist {
  _id: string;
  _rev?: string;
  episodeIDS: string[];
  tags: string[] = ["playlist", "podcast"];
}
