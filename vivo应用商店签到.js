var packagename='com.bbk.appstore';
var btn
var search_time=1000
var wait_time=3000
var n_time=2
var keyword_back=['已签']

main()


function main(){
    console.show()
    sign_in()//签到
    browser_task()//浏览器任务

    toastLog('已完成，退出中')
    sleep(2000)
    console.hide()
}
function sign_in(){
    //签到
    toastLog('开始签到任务')
    enter_sign_in()
    var btn
    while(btn=text('去签到').findOne(search_time*2)){
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
    toastLog('完成签到任务')
}
function browser_task(){
    //浏览器任务
    toastLog('开始浏览器任务')   
    var btn

    enter_browser_task()
    if(btn=textStartsWith('用搜索框').findOne(search_time*5)){
        //搜索任务
        toastLog(btn.text())
        while(btn.parent().child(1).text()!='已完成'){
            //若搜索任务未完成，继续完成
            rclick_by_btn(btn.parent().parent().child(2))
            rsleep(2)
            if(btn=className('android.widget.EditText').findOne(search_time*0.5)){
                //开始搜索
                btn.setText("积分")
                sleep(1000)
                btn=id('search_btn_wrapper').clickable(true)
                btn.click()
                sleep(3000)//等待10s进入活动界面
            } 
            enter_browser_task()
        }
        rclick_by_btn(btn.parent().parent().child(2))

    }
    toastLog('完成浏览器任务')
}
function enter_browser_task(){
    var btn,k=6,packagename='com.vivo.browser'
    toastLog('开始进入任务界面')
    while(k--){
        open_app(packagename)
        if(!text('每日任务').exists()){
            if(btn=text('做任务赚积分').findOne(search_time*0.2)){            
                toastLog('text'+btn.text())
                btn.parent().click()
                break
            }else{
                if(btn=id('btn_text').text('我的').findOne(search_time*0.2)){
                    toastLog('进入浏览器我的界面')
                    rclick_by_btn(btn)
                    rsleep(3)
                }else if(btn=id('tool_bar_btn_home').findOne(search_time*0.2)){
                    toastLog('进入浏览器主界面')
                    btn.click()
                    rsleep(3)
                }
            }
        }

    }
    if(!k){
        toastLog('找不到任务界面，退出')
        exit()
    }  
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
        toastLog('找不到任务界面，退出')
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
            exit()
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
