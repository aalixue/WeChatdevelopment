const gohttp=require("gohttp");
const wxkey=require("./wxkey");

var token_api=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxkey.appid}&secret=${wxkey.secret}`;
var menu_data={
    button:[
        {
            name:"发图",
            type:"pic_weixin",
            key:"my-image"
        },
        {
            name:"小游戏",
            sub_button:[
                {
                    name:"消消乐",
                    type:"click",
                    key:"little-game1"
                },
                {
                    name:"连连看",
                    type:"click",
                    key:"little-game2"
                },
                {
                    name:"跑酷",
                    type:"click",
                    key:"little-game3"
                }
            ]
        },
        {
            name:"send",
            type:"click",
            key:"send-msg"
        }
    ]
};
(async()=>{
    let ret = await gohttp.get(token_api);
    let t = JSON.parse(ret);
    if(t.access_token===undefined){
        console.log(ret);
        process.exit(-1);
    }

    let creat_menu_api = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${t.access_token}`;
    ret = await gohttp.post(creat_menu_api,{
        body:menu_data,
        headers:{
            'content-type':'text/plain'
        }
    });
    console.log(ret);
})();