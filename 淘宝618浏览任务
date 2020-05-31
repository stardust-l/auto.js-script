var i = 0;
//主函数开始
main()
function main(){
    console.show()
    while(true) {
        rsleep(1)
        let btn=find_btn(['去浏览']);
        if (btn != null) {
            if(btn.click()){
                view();
                toastLog('返回任务界面')
                back()
            }else{
                view()
            };
            
        }else {
            toastLog("\n脚本运行完毕\n模拟浏览任务全部完成（大概）");
            sleep(5000)
            console.hide()
            exit();
        }
    }
}
//找到text或者desc包含文本s的按钮并返回，找不到返回null
function find_btn(s){
    
    let j=0;
    let btn=null;
    for(let j=0;j<s.length;j++){

        if(textContains(s[j]).exists() ){
            btn = textContains(s[j]).findOnce(i);
            toastLog('找到了'+btn.parent().child(0).text()+' ，任务为'+btn.text())
            return btn
        }else if(descContains(s[j]).exists() ){
            btn = descContains(s[j]).findOnce(i);
            toastLog('找到了'+btn.parent().child(0).text()+' ，任务为'+btn.text())
            return btn
        }        
    }
    return btn
}
//随机延时
function rsleep(s) {
    while (s--) {
        sleep(random(900, 1200));
    }
}

//随机划屏
function rslide(i) {
    while (i--) {
        let x1 = random(device.width*0.2, device.width*0.9);
        let y1 = random(device.height*0.6, device.height*0.9);
        let x2 = random(device.width*0.2, device.width*0.9);
        let y2 = random(device.height*0.4, device.height*0.6);
        swipe(x1, y1, x2, y2, 400);
        rsleep(1);
    }
}
//随机划屏，反向
function rslideR(i) {
    while (i--) {
        let x1 = random(device.width*0.2, device.width*0.9);
        let y1 = random(device.height*0.6, device.height*0.9);
        let x2 = random(device.width*0.2, device.width*0.9);
        let y2 = random(device.height*0.4, device.height*0.6);
        swipe(x1, y1, x2, y2, 300);
        rsleep(1);
    }
}
//模拟浏览（浏览会场任务）
function view() {
    let j=0
    while(j<4){
        if(find_btn(['任务完成'])!=null || find_btn(['任务已完成'])!=null){
            rsleep(1)
            return 0
        }
        rsleep(1);
        rslide(2);
        if(find_btn(['任务完成'])!=null || find_btn(['任务已完成'])!=null){
            return 0
            rsleep(1)
        }
        rslideR(2);
        rsleep(1);
        j++
    }
}
