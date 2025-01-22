import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = '9FVTBUmz5dm62XnFINHbYkPIgX6zfdxY'; //api key giphy
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeTagsHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag); // Add tag to the beginning of the array
    this._tagsHistory = this._tagsHistory.splice(0, 10); // Keep only the last 10 tags
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeTagsHistory(tag);
    //'https://api.giphy.com/v1/gifs/search?api_key=9FVTBUmz5dm62XnFINHbYkPIgX6zfdxY&q=riverplate&limit=5'

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '5')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((response) => {
        this.gifList = response.data;
        //console.log({ gifs: this.gifList });
      });
  }
}
