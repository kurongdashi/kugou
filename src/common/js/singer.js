/**
 * Created by Administrator on 2018/1/8.
 */
import axios from 'axios'
import jsonp from 'jsonp'

export function getSingerList() {
  console.log('zou------')
  jsonp('/api/singerlist', {
    params: 'aa'
  }, (err, data) => {
      console.log(data);
  })
}

