/**
 * Created by Administrator on 2018/1/12.
 */
import jsonp from './promiseJsonp'

 class Song{
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
    url:''
  })
}
function filterSinger(singer) {
    let res=[];
    singer.forEach((item)=>{
          res.push(item.name);
    })
    return res.join('/');

}

export function getSongUrl(mid) {

  let url='https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  let guid=_getGuid();

  let data={
    g_tk:5381,
    jsonpCallback:'callback',
    loginUin:0,
    hostUin:0,
    format:'json',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0,
    cid:205361747,
    callback:'callback',
    uin:0,
    songmid:mid,
    filename:`C400${mid}.m4a`,
    guid:guid,
  }
  let p= jsonp(url,data,{param:'callback',name:'callback'}).then(res=>{
    let obj=res.data;
    obj=obj.items[0];
    let url=`http://dl.stream.qqmusic.qq.com/${obj.filename}?vkey=${obj.vkey}&guid=${guid}&uin=0&fromtag=66`;
     console.log(url);
    return url;
  })
  return p;

}
function _getGuid() {
  var t = (new Date).getUTCMilliseconds();
  return Math.round(2147483647 * Math.random()) * t % 1e10;
}

