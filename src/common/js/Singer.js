/**
 * Singer 对象
 */
export default class Singer{
   constructor({id,avatarId,name}){
     this.id=id;
     this.name=name;
     this.avatar=`https://y.gtimg.cn/music/photo_new/T001R150x150M000${avatarId}.jpg?max_age=2592000`;
   }
}
