Page({
  data: {
    result: ''
  },
  num1: 0,
  num2: 0,
  num1change: function (e) {
    this.num1 = Number(e.detail.value)
    console.log("第一个数为" + this.num1)
  },
  num2change: function (e) {
    this.num2 = Number(e.detail.value)
    console.log("第二个数为" + this.num2)
  },
  compare: function (e) {
    var st=""
    if(this.num2 == "" && this.num1 == "") { st= '请输入两数' }
    else if (this.num1 == "") { st= '请输入第1个数'}
    else if (this.num2 == "") { st= '请输入第2个数' }
    else {
      st = ""
      var str = "相等"
      if (this.num1 > this.num2) {  
        str = '第1个数大'
      } else if (this.num1 < this.num2) {
        str = '第2个数大'
      } 
    }
    this.setData({ b: st })
    this.setData({ a: str })
  }
})
