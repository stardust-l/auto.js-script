var packagename='com.bbk.appstore';
var btn
var search_time=1000
var wait_time=3000
var n_time=2
var keyword_back=['已签']

main()


function main(){
    let i=3
    console.show()
    enter_sign_in()
    while(btn=text('去签到').findOne(search_time*5)){
        let i=3
        enter_sign_in()
        rclick_by_btn(btn)
        sleep(2000)
        while(i--){                
            if(btn=find_btn(['签到','我的礼品'])){
                toastLog('开始签到,'+btn.text())
                rclick_by_btn(btn)
                rsleep(2)
                i=0
                enter_sign_in()
                break
            }
            rsleep(1)
            view(1)
        }
        enter_sign_in()
    }
    toastLog('已完成，退出中')
    sleep(2000)
    console.hide()
}

function enter_sign_in(){
    //进入签到界面
    let btn,k=6
    
    while(k--){
        open_app(packagename)
        if(!text('做任务赚积分').findOne(search_time*0.2)){
            if(btn=className('android.widget.ListView').depth(9).findOne(search_time*0.2)){
                toastLog('进入赚积分界面')
                btn.child(1).click()
                sleep(wait_time)
            }else if(btn=text('管理').findOne(search_time*0.2)){
                toastLog('进入管理界面')
                btn.parent().click()
                btn=text('积分商城').findOne(search_time*0.2)
                toastLog('进入积分商城')
                sleep(3000)
                btn.parent().click()
            }
        }
    }
    if(!k){
        toastLog('找不到人物界面，退出')
        exit()
    }


}
function open_app(packagename){
    //打开软件
    let k=0
    while(currentPackage() != packagename){
        //还没打开的话，退出脚本
        sleep(3000)
        launch(packagename)
        
        k++
        if(k>5){
            toast('请手动打开应用'+getAppName(packageName)+'，然后重新启动程序')
            rexit()
        }

    }
}
function view(n,keyword){
    n=arguments[0] ? arguments[0] :n_time
    keyword=arguments[1] ? arguments[1] :keyword_back
    let j=0
    while(j<n){
        if(find_btn(keyword)!=null){
            rsleep(1)
            return 0
        }
        rsleep(1) 
        rslide(1) 
        rsleep(1) 
        rslideR(1)         
        j++
    } 
}
function find_btn(s){
    //找到拥有完全相同text或desc的按钮
    var btn
    for(let j=0 ;j<s.length; j++){
        if(btn=text(s[j]).findOne(search_time*0.2)||desc(s[j]).findOne(search_time*0.2)){
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
function rclick_by_btn(btn){
    //点击按钮
    if(!btn){
        return -1
    }
    if(btn.clickable()){
        btn.click()
    }else{
        click(btn.bounds().centerX(),btn.bounds().centerY())
    }
}
