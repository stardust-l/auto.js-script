var i = 0 ;
keyword_view=['去浏览','去逛逛'] //浏览任务包含关键词，中间用逗号隔开，几个是或者的关系，满足任意一个即可
keyword_back=['任务完成','任务已完成','返回领取'] //浏览界面返回的关键词，两者是或者的关系
n_time=5 //在浏览界面循环滑动次数上限（再多就返回了），一次大概5到7秒

//主函数开始
main() 
function main(){
    //主函数
    console.show()
    while(true) {
        rsleep(1) 
        
        if (find_btn(keyword_view)!= null) {
            //浏览任务
            view_main(keyword_view,keyword_back)
        }else {
            //找不到满足条件的按键，返回
            toastLog("\n脚本运行完毕\n模拟浏览任务全部完成（大概）")
            sleep(5000)
            console.hide()
            exit()
        }
    }
}
//模拟浏览（浏览会场任务），存在按键返回1，否则返回0,judge_back为是否在浏览后返回
function view_main(keyword_view,keyword_back,judge_back){
    judge_back=arguments[2] ? arguments[2] : 1//judge_back默认为1，即默认在浏览后返回
    let btn=find_btn(keyword_view,1)
        btn.click()
        view(n_time)
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

