//定义全局key
const KEY = 'buyGoods'

//从localStorage中获取到数据
export function getItem() {
  var jsonString = localStorage.getItem(KEY)


  if (!jsonString || jsonString == 'NaN') {
    return {}
  }

  return JSON.parse(jsonString)
}
//设置localStorage中的数据
export function setItem(gobj) {

  var obj = getItem()
  obj[gobj.gid] = obj[gobj.gid] && obj[gobj.gid] + gobj.add || gobj.add
  
  localStorage.setItem(KEY, JSON.stringify(obj));

}
export function setItemes(gobj) {
    var obj = getItem()
    obj[gobj.gid] = gobj.add
    localStorage.setItem(KEY, JSON.stringify(obj));
  
  }
export function delItem(objId) {
  var obj = getItem()
    if (!obj&&obj=='NaN') {
      console.log('删除失败');
      return 
    }

    // localStorage.setItem('btntop',5)
    if (localStorage.getItem('btntop')) {
      var btntopOBj = (obj[objId]-0)
      // console.log(btntopOBj,'delItem');
      localStorage.setItem('btntop', JSON.stringify(btntopOBj))
    }else{
      console.log('删除失败了');
      
    }
    if (obj[objId]) {
      delete obj[objId]
      // console.log(delete obj[objId]);
      localStorage.setItem(KEY, JSON.stringify(obj));
    }
    
  
  
  return btntopOBj
  

}
export function qiuhe(gobj) { //求和
  var obj =getItem()
  if (typeof(gobj)=='object') {
    obj[gobj.gid] = gobj.add
    localStorage.setItem(KEY, JSON.stringify(obj));
  }
  
  var addS =0
  for (var key in obj) {
    addS+=obj[key]
  }
  return addS
  
}