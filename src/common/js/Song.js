/**
 * Created by Administrator on 2018/1/12.
 */
export  class Song{
  constructor({id,mid,name,singer,duration,album,image,url}){
      this.id=id;
      this.mid=mid;
      this.name=name;
      this.singer=singer;
      this.duration=duration;
      this.album=album;
      this.image=image;
      this.url=url;
  }
}
export function createSong(musicData) {
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid,
    name:musicData.songname,
    singer:filterSinger(musicData.singer),
    duration:musicData.interval,
    album:musicData.albumname,
    image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}
function filterSinger(singer) {
    let res=[];

    singer.forEach((item)=>{
          res.push(item.name);

    })
    return res.join('/');

}
