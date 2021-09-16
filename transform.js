const industry_list = [
  {
     "parent_ind" : "1",
     "name" : "连衣裙",
     id: '1-1'
  },
  {
    "parent_ind": "0",
     "name": "女装",
     id: '1'
  },
  {
     "parent_ind" : "1",
     "name" : "半身裙",
     id: '1-2'
  },
  {
     "parent_ind" : "1",
     "name" : "A字裙",
     id: '1-3'
  },
  {
    "parent_ind": "0",
     "name": "数码",
     id: '2'
  },
  {
    "parent_ind" : "2",
     "name": "电脑配件",
     id: '2-1'
  },
  {
    "parent_ind" : "2-1",
     "name": "内存",
     id: '2-1-1'
  },
]

function insterTree(tmp, node) {
  console.log(tmp.id === node.parent_ind, tmp, node);
  if (tmp.id === node.parent_ind) {
    return tmp;
  }
  if (tmp && Array.isArray(tmp) && tmp.length) {
    for (let index = 0; index < tmp.length; index++) {
      // console.log(tmp[index])
      return insterTree(tmp[index], node)
    }
  }
  // if (tmp.children && Array.isArray(tmp.children) && tmp.children.length) {
  //   for (let index = 0; index < tmp.children.length; index++) {
  //     return insterTree(tmp.children[index], node)
  //   }
  // }
  
}

function toTree(arr) {
  let tmp = arr.filter(t => t.parent_ind === '0').map(t => ({...t, children: []}));
  let index = 0;
  while(arr[index]) {
    let node = arr[index]
    let tmpItem = insterTree(tmp, node)
    if (tmpItem) {
      tmpItem.children.push({...node, children: []})
    }
    
    ++index;
  }
  console.log(tmp, 'tmp');
}

toTree(industry_list);


