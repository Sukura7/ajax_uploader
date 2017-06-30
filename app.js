const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
// formidable 处理表单提交 文件上传图片视频
const formidable=require('formidable')
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.get('/',(req,res)=>{
  res.render('index');
});
// 接收到对应的post请求做出的处理
app.post('/formupload',(req,res)=>{
  // 创建表单
  let form=new formidable.IncomingForm();
  // 设置上传文件的临时位置
  let uploadDir=path.normalize(__dirname+'/images');
  form.uploadDir=uploadDir;
  // parse()解析request请求中表单提交的数据
  form.parse(req,(err,fields,files)=>{

    for(let item in files){
      // 前端通过xhr将文件传过来，文件写入文件夹内
    
      console.log(files[item])
      let oldname=files[item].path;
      console.log(oldname)
      let newname=oldname+'.'+files[item].name.split('.')[1];
      console.log(newname)
      fs.rename(oldname,newname,(err)=>{
        if(err){
          console.log(err);
        }else{
          console.log('修改成功');
        }
      })

    }
    res.send('2');
  })
})
app.listen(3000);
