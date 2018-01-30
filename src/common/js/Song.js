/**
 * Created by Administrator on 2018/1/12.
 */
import jsonp from './promiseJsonp'
import axios from 'axios'
import {Base64} from 'js-base64'

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
  //获取音乐播放地址
  getAudioUrl(mid){
   return getSongUrl(mid)
  }
  //获取音乐歌词
  getLyric(mid){
    return getSingerLyric(mid).then(res=>{
      return Base64.decode(res.data.lyric);
    });
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

function getSongUrl(mid) {

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
  let opt = {
    param:'callback',
    name:'callback'
  };
  return jsonp(url,data,opt).then(res=>{
    let obj=res.data;
    obj=obj.items[0];
    let url=`http://dl.stream.qqmusic.qq.com/${obj.filename}?vkey=${obj.vkey}&guid=${guid}&uin=0&fromtag=66`;
     // console.log(url);
    return url;
  });

}
function _getGuid() {
  var t = (new Date).getUTCMilliseconds();
  return Math.round(2147483647 * Math.random()) * t % 1e10;
}


function getSingerLyric(mid) {
  let url = '/api/lyric';
  let data = {
    jsonpCallback:'callback',
    pcachetime:1516777506937,
    songmid: mid,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
  };
  return axios.get(url,{
    params:data
  });

}
export  function getNormalSong(list){
  let songs=[];

  list.forEach((musicData)=>{
    if(musicData.songmid && musicData.albummid){
      let song=createSong(musicData);
      songs.push(song);
    }

  })
  return songs

}
