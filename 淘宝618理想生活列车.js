var i = 0 ;
var keyword_view=['去浏览','去逛逛','+50'] //浏览任务包含关键词，中间用逗号隔开，几个是或者的关系，满足任意一个即可
var keyword_back=['任务完成','任务已完成','返回领取'] //浏览界面返回的关键词，两者是或者的关系
var n_time=5 //在浏览界面循环滑动次数上限（再多就返回了），一次大概5到7秒
var search_time=2000 //寻找按键的最长时间 ms
var app=[['com.taobao.taobao','淘宝'],['com.tmall.wireless','天猫'],['com.eg.android.AlipayGphone','支付宝']]
//'com.taobao.taobao','淘宝'
//'com.tmall.wireless','天猫'
//'com.eg.android.AlipayGphone','支付宝'
var n_app=0 //从几号任务开始,从零开始计数
var n_app_end=app.length-1//到几号停止，,从零开始计数
var btn
//主函数开始
main() 
function main(){
    //主函数
    auto.waitFor()
    console.show()

    while(true) {
        rsleep(1) 
        enter_task(app[n_app][0],app[n_app][1])
   
        if (find_btn(keyword_view)!= null) {
            //浏览任务
            view_main(keyword_view,keyword_back)
        }else if(n_app<n_app_end){
            //如果不是所有的app都结束了，继续下一个
            n_app++
        }else {
            //找不到满足条件的按键，返回
            toastLog("\n脚本运行完毕\n模拟浏览任务全部完成（大概）")
            sleep(5000)
            rexit()
        }
    }
}
function enter_task(packagename,appname){
    //进入618活动的任务界面,并领取自动产生的喵币
    if(currentPackage() != packagename){
        //没有打开应用的话，打开应用
        open_app(packagename,appname)
        sleep(5000)
    }

    
    if(!(text("关闭").exists() && text("做任务，领喵币").exists())){
        //不是任务界面的话，打开任务界面
        if(!text("做任务，领喵币").exists()){
            //不是活动界面的话，进入活动界面
            if(btn=descContains('搜索').findOne(search_time*10) ){
                btn.click()
                className('android.widget.EditText').findOne(search_time).setText("618列车")
                var btn2=text('搜索').clickable(true).findOne(search_time) || desc('搜索').clickable(true).findOne(search_time)
                btn2.click()
                sleep(10000)//等待10s进入活动界面
            }else{
                toast('请自己进入任务界面并重新运行脚本')
                rexit()
            }

        }
        if(btn=text('打开图鉴').findOne(search_time)){
            //领取自动产生的喵币
            click(device.width*0.5,btn.bounds().centerY())
            toastLog('已领取自动产生的喵币')
            rsleep(2)
        }

        text("做任务，领喵币").findOne(search_time*10).click()
        sleep(3000)
    } 
    toastLog('已进入'+app[n_app][1]+'的任务界面')
    return true
}

function open_app(packagename,name){
    name=arguments[1] ? arguments[1] : ''
    launch(packagename)
    sleep(5000)
    if(currentPackage() != packagename){
        //还没打开的话，退出脚本
        toast('请手动打开应用'+name+'，然后重新启动程序')
        rexit()
    }
}
function enter_tianmao(){
    toastLog('待完成')
}   
//模拟浏览（浏览会场任务），存在按键返回1，否则返回0,judge_back为是否在浏览后返回
function view_main(keyword_view,keyword_back,judge_back,n){
    judge_back=arguments[2] ? arguments[2] : 1//judge_back默认为1，即默认在浏览后返回
    n=arguments[3] ? arguments[3] : n_time
    let btn=find_btn(keyword_view,1)
        btn.click()
        view(n)
        if(judge_back){
            toastLog('返回任务界面')
            back()
        }
}
//浏览
function view(n){
    n==arguments[0] ? arguments[0] :n_time
    let j=0
    while(j<n){
        if(find_btn(keyword_back)!=null){
            rsleep(1)
            return 0
        }
        rsleep(1) 
        rslide(2) 
        rsleep(1) 
        rslideR(1)         
        j++
    } 
}

//找到text或者desc包含文本s的按钮并返回，找不到返回null
function find_btn(s,judge_print){
    judge_print=arguments[1] ? arguments[1] :  0//判断是否输出日志
    let j=0 
    let btn=null 
    for(let j=0 ;j<s.length; j++){

        if(textContains(s[j]).exists() ){
            btn = textContains(s[j]).findOnce(i) 
            if(judge_print){
                toastLog('找到了'+btn.parent().child(0).text()+' ，text为'+btn.text())
            }
            return btn
        }else if(descContains(s[j]).exists() ){
            btn = descContains(s[j]).findOnce(i) 
            if(judge_print){
                toastLog('找到了'+btn.parent().child(0).text()+' ，text为'+btn.text())
            }
            
            return btn
        }        
    }
    return btn
}
//随机延时
function rsleep(n) {
    while (n--) {
        sleep(random(900, 1200)) 
    }
}

//随机向下划屏，持续1.2s-1.5s
function rslide(i) {
    while (i--) {
        let x1 = random(device.width*0.4, device.width*0.6) 
        let y1 = random(device.height*0.7, device.height*0.9) 
        let x2 = random(device.width*0.4, device.width*0.6) 
        let y2 = random(device.height*0.4, device.height*0.6) 
        swipe(x1, y1, x2, y2, 400) 
        rsleep(1) 
    }
}
//随机向上划屏，持续1.2s-1.5s
function rslideR(i) {
    while (i--) {
        let x1 = random(device.width*0.4, device.width*0.6) 
        let y1 = random(device.height*0.4, device.height*0.6) 
        let x2 = random(device.width*0.4, device.width*0.6) 
        let y2 = random(device.height*0.7, device.height*0.9) 

        swipe(x1, y1, x2, y2, 300) 
        rsleep(1) 
    }
}
//退出脚本
function rexit(){
    console.hide()
    exit()
}
