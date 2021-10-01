const node_kakao = require("node-kakao");
const FS = require('fs');
const fs = require('fs');
const cheerio = require('cheerio');
const jsonFile = require('jsonfile');
const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor
const list = jsonFile.readFileSync("./tajalist.json");
const gfriend = jsonFile.readFileSync("./gfriend.json");
chotopicc = jsonFile.readFileSync("./초성퀴즈/topic.json");
const Room = {};
const li = "---------------------------------------------";
const more = "\u200b".repeat(500);
const path = './초성퀴즈/data.json';
const paths = './초성퀴즈/rank.json';
const pathss = "./초성퀴즈/tierrank.json";
const pathsss = "./초성퀴즈/userchong.json";
const pathssss = "./초성퀴즈/userchongg.json";
const ans = 'Data/확률_시작/';
const ant = 'Data/확률_정답/';
const admin1 = ["하늘에서내려온천사예리니❤[하천예]", "하늘에서내려온천사예린❤[하천예]", "1004봇 주인", "1004_Angel.js", "ㄱ. 권도혁", "1004Angel.js", "방장봇", "행방", "Angel_권도혁", "👦💼회장님의 지킴이 비서 하천예⌚", "1004BOT_Angel", "1004BOT"];
var chogame = {};
var chobabos = {};
var choans = {};
var chotopic = {};
var choquest = {};
var chohint1 = {};
var chohint2 = {};
var chohint3 = {};
var chosender = {};
var chosijak = {};
var chosijaksender = {};
var chodel = 0;
var chodel_arr = [];
const cho_add = '/초성등록 '; //초성데이터 등록 접두어
const cho_del = '/초성삭제 '; //초성데이터 삭제 접두어
const cho_help = '/초성퀴즈'; //도움말
const cho_start = '/초성시작'; //게임시작
const cho_result = '::'; //정답 접두어
const cho_end = '/포기'; //게임종료
const ranking = '/초성랭킹'; //랭킹
const chonoans1 = 2; //첫글자힌트 오답횟수
const chonoans2 = 3; //두글자힌트 오답횟수
const chonoans3 = 4; //세글자힌트 오답횟수
const managerroom = jsonFile.readFileSync('./머찐천사봇.json');
const cho_list = '/초성목록'; //데이타 목록 출력
ll = 0, lll = 0, ta = 0, dap = 0


choReset = (r) => {
    chogame[r] = 0;
    chobabos[r] = undefined;
    choans[r] = undefined;
    chotopic[r] = undefined;
    choquest[r] = undefined;
    chohint1[r] = undefined;
    chohint2[r] = undefined;
    chohint3[r] = undefined;
    chosender[r] = undefined;
    chosijak[r] = undefined;
    chosijaksender[r] = undefined;
};


function Div(str) {
    str = String(str);
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return str;
}


// (admin.includes(id) || senderr.includes("ㄱ. 권도혁") || senderr.includes("하천예") || senderr.includes("1004Angel.js"))

const client = new node_kakao.TalkClient();

var userdata = jsonFile.readFileSync('./userdata.json');

function SaveFile() {
    try {
        jsonFile.writeFileSync(`./userdata.json`, userdata);
    } catch (e) {
        console.log(e);
    }
}

function plusId(id) {
    try {
        userdata.push(id);
        SaveFile();
    } catch (e) {
        console.log(e);
    }
}

var admin = ["8753632970427282482"];

function similarity(a, b) {
    var c;
    if (b.length > a.length) {
        c = a;
        a = b;
        b = c;
    }
    c = 0;
    for (var i = 0; i < a.length; i++)
        if (a[i] == b[i]) c += 1;
    return (100 * c / a.length).toFixed(0);
}


async function profilechange(channel = undefined, lastInfo = undefined, user = undefined) {
    try {
        if (channel != undefined && lastInfo != undefined && user != undefined && (channel.channelId.toString() == "18323168041134327" || channel.channelId.toString() == "18317770919144542" || channel.channelId.toString() == "18315456832171774" || channel.channelId.toString() == "18324620170523181" || channel.channelId.toString() == "313619660278797" || channel.channelId.toString() == "18328882228399264" || channel.channelId.toString() == "18252452122376624" || channel.channelId.toString() == "18324620170523181")) {
            if (lastInfo.nickrsname != user.nickname && lastInfo.originalProfileURL != user.originalProfileURL || lastInfo.nickname != user.nickname && user.profileType == 2) {
                linkids = [];
                userlink = [];
                if (lastInfo.linkId != undefined) {
                    await linkids.push(lastInfo.linkId);
                } else {
                    await userlink.push(null);
                }
                if (user.linkId != undefined) {
                    await linkids.push(user.linkId);
                }
                client.session.request("INFOLINK", {
                    "lis": linkids
                }).then(s => {
                    try {
                        if (s.ols[1] != undefined) {
                            userlink.push(s.ols[1].lu);
                            userlink.push(s.ols[0].lu);
                        } else {
                            userlink.push(s.ols[0].lu);
                            userlink.push(null);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    if (channel.channelId.toString() == "18323168041134327") {
                        client.session.request("WRITE", {
                            "chatId": node_kakao.Long("18317770919144542"),
                            "msgId": 0,
                            "type": 1,
                            "noSeen": true,
                            "msg": "[닉네임변경 공지]\n\n변경 전 닉넴\n->" + lastInfo.nickname + "\n변경 후 닉넴\n->" + user.nickname,
                            "extra": "{}"
                        })
                    }
                    channel.sendChat(new node_kakao.ChatBuilder().attachment({
                        "callingPkg": "",
                        "V": "list",
                        "Q": "1004BOT_프로필변경 감지",
                        "R": [{
                            "H": 1000,
                            "T": lastInfo.nickname,
                            "D": "변경 전",
                            "I": lastInfo.originalProfileURL,
                            "W": 1000,
                            "L": userlink[0]
                        }, {
                            "H": 1000,
                            "T": user.nickname,
                            "D": "변경 후",
                            "I": user.originalProfileURL,
                            "W": 1000,
                            "L": userlink[1]
                        }]
                    }).build(23));
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
}

client.on('error', (err) => {
    console.log(`Client error!! err: \n\n${err}`);
});




client.on('chat_deleted', (feedChatlog, channel, feed) => {

    if (channel.channelId.toString() == "18328882228399264" || channel.channelId.toString() == "18323168041134327" || channel.channelId.toString() == "314832113295684" || channel.channelId.toString() == "18324620170523181" || channel.channelId.toString() == "18317770919144542" || channel.channelId.toString() == "18252452122376624" /*지에평*/ ) {
        var main = async () => {
            channel.sendChat("[1004BOT_삭제감지]");
            channel.sendChat(await channel.chatListStore.get(feed.logId)).then();
        }
        main().then()
    } else {
        var main = async () => {
            try {
                client.session.request("WRITE", {
                    "chatId": node_kakao.Long("18328882228399264"),
                    "msgId": 0,
                    "type": 1,
                    "noSeen": true,
                    "msg": "[무지정방 삭제감지]\n콘솔에 표기했어요!",
                    "extra": "{}"
                })

                console.log("\n\n[1004BOT_다른방 삭제감지]");
                console.log(await channel.chatListStore.get(feed.logId)).then();
                console.log("\n\n");
            } catch (e) {

            }
        }
        main().then()
    }

});

client.on('perm_changed', (channel, lastInfo, user) => {
    if (channel.channelId.toString() == "18323168041134327") {
        if (user.perm == "4") {
            channel.sendChat(`[1004BOT_왕관감지]\n\n ${user.nickname} 님이 부방장으로 임명되셨어요~ 축하해주세요!`);
        } else if (user.perm == "2" && lastInfo.perm == "4") {
            channel.sendChat(`[1004BOT_왕관감지]\n\n ${user.nickname} 님이 부방장에서 킹반인으로 내려왔어요..!\n\n-관리자일 확률이 높으니 놀리진 말아요!`);
        } else if (user.perm == "2" && lastInfo.perm == "1") {
            channel.sendChat(`[1004BOT_왕관감지]\n\n ${user.nickname} 님이 방장에서 킹반인으로 내려왔어요..!\n킹반인 세상에서도 잘 살길!!`);
        }
    }

    if (channel.channelId.toString() == "18324620170523181" /* <- 버디회사방 */ || channel.channelId.toString() == "18328882228399264") {
        if (user.perm == "4") {
            channel.sendChat(`[1004BOT_왕관감지]\n\n ${user.nickname} 님이 부방장으로 임명되셨어요~ 축하해주세요!`);
        } else if (user.perm == "2" && lastInfo.perm == "4") {
            channel.sendChat(`[1004BOT_왕관감지]\n\n ${user.nickname} 님이 부방장에서 킹반인으로 내려왔어요..!\n\n상처 입을 수 있으니 놀리진 말아요!`);
        } else if (user.perm == "2" && lastInfo.perm == "1") {
            channel.sendChat(`[1004BOT_왕관감지]\n\n ${user.nickname} 님이 방장에서 킹반인으로 내려왔어요..!\n킹반인 세상에서도 잘 살길!!`);
        }

    }

});
//   client.on('channel_kicked', (kickedLog, channel, feed) => {
//     if(channel.channelId.toString() == "18323168041134327")
//         channel.sendChat(`${kickedLog.sender} 님이 ${}`);
//   });

client.on("profile_changed", (channel, lastInfo, user) => {
    try {
        profilechange(channel, lastInfo, user);
    } catch (e) {
        console.log(e);
    }
});

try {
    client.on('user_join', (joinLog, channel, user, feed) => {
        /*
         if (channel.channelId.toString() == "18288712000391185"){
           (이상한 사람 들어올 때)
            channel.sendChat("[1004BOT_자동강퇴] 현재 들낙범이 이상한 짓거리를 하고있습니다. 죄송하지만 내보내겠습니다.");
            client.session.request("KICKMEM", {
                "c": channel.channelId,
                "li": channel.linkId,
                "mid": user.userId
            });
        }
        */

        if (channel.channelId.toString() == "18323168041134327" || channel.channelId.toString() == "18317770919144542" || channel.channelId.toString() == "18324620170523181" || channel.channelId.toString() == "313619660278797" || channel.channelId.toString() == "18328882228399264" || channel.channelId.toString() == "18252452122376624") {
            if (channel.channelId.toString() == "18323168041134327" /*|| channel.channelId.toString() == "18328882228399264"*/ ) {
                if (userdata.includes(user.userId.toString()) /*|| userdata.includes(JSON.stringify(user.userid))*/ ) {
                    client.session.request("WRITE", {
                        "chatId": node_kakao.Long("18317770919144542"),
                        "msgId": 0,
                        "type": 1,
                        "noSeen": true,
                        "msg": "[1004BOT_추방알림] 1004BOT이 들낙범을 쫒아냈어요!",
                        "extra": "{}"
                    })
                    channel.sendChat("[1004BOT_자동강퇴] 잡았다 요놈! 이전 들낙 기록이 있군. 너 나가!\n\n1. 나 들낙한 적 없다.\n2. 추방된게 아니꼽다.\n3. 사정이 생겨서 나갔다 왔다.\n\n-위의 경우엔 아래의 링크로 연락주시길 바랍니다.\n\nhttps://open.kakao.com/me/dohyeok30233");
                    client.session.request("KICKMEM", {
                        "c": channel.channelId,
                        "li": channel.linkId,
                        "mid": user.userId
                    });
                    channel.sendChat("[1004BOT_강퇴]" + user.nickname + " 님이 자동강퇴봇에 의해 내보내졌습니다.\n\nUSER_ID : " + user.userId);
                } else if (user.userId.toString() == "6414442998694742249") {
                    channel.sendChat("[1004BOT_자동강퇴] 잡았다 요놈!\n\n어디서 맥심화보 공유하려고 와? 우리 그딴거 관심없으니 걍 꺼져 ㅂㅂ");
                    client.session.request("KICKMEM", {
                        "c": channel.channelId,
                        "li": channel.linkId,
                        "mid": user.userId
                    });
                } else if (user.userId.toString() == "8681478162690914809") {
                    channel.sendChat("[1004BOT_자동강퇴] 여신사진 찾고싶으면 네이버에 '걸그룹 여자친구' 검색하렴? BYE");
                    client.session.request("KICKMEM", {
                        "c": channel.channelId,
                        "li": channel.linkId,
                        "mid": user.userId
                    });
                } else if (user.userId.toString() == "6570788040325944547") {
                    channel.sendChat(new node_kakao.ChatBuilder().attachment({
                        "callingPkg": "",
                        "V": "list",
                        "Q": "1004BOT이 들어왔다",
                        "R": [{
                            "H": 1000,
                            "T": "1004BOT_Ver 2 이구나?",
                            "D": "잘왔어~",
                            "I": "",
                            "W": 1000,
                            "L": ""
                        }]
                    }).build(23));
                } else {
                    channel.sendChat(`안녕하세요 :) ${user.nickname} 님, Memories For GFRIEND💎 방에 오신걸 환영합니다!\n\n•본 방은 14세 이상만 들어올 수 있습니다.\n\n•아래의 입장글을 복사하여 반드시 써주세요.\n•공지 필독해주세요.\n•좋은 덕질 하세요~\n\nUSER_ID : ${user.userId}`);
                    setTimeout(() => {
                        channel.sendChat("나이 :\n주 활동닉넴 :\n최애곡 or 차애곡 :\n여자친구 멤버 본명&나이순 :\n여자친구 수록곡 5개 이상 :")
                    }, 200)
                    client.session.request("WRITE", {
                        "chatId": node_kakao.Long("18317770919144542"),
                        "msgId": 0,
                        "type": 1,
                        "noSeen": true,
                        "msg": "[1004BOT_입장알림] 메모리즈 방에 사람이 왔어요!\n\n-이름 : " + user.nickname + "\n-USER_ID : " + user.userId,
                        "extra": "{}"
                    })
                }
            } else if (channel.channelId.toString() == "18252452122376624") {
                channel.sendChat(`[1004BOT_입장알림]\n${user.nickname} 님 어서오세요~!\n\n-위의 버디테스트를 3분 내에 완료해주세요!`);
            } else {
                channel.sendChat(`[1004BOT_입장알림!]\n${user.nickname} 님이 들어왔어요!\n\nUSER_ID : ${user.userId}`);
            }
        }
    });
} catch (e) {
    console.log(e);
}


try {
    client.on('user_left', (leftLog, channel, user, feed) => {

        if (channel.channelId.toString() == "18323168041134327" || channel.channelId.toString() == "18317770919144542" || channel.channelId.toString() == "18324620170523181" || channel.channelId.toString() == "313619660278797" || channel.channelId.toString() == "18328882228399264") {
            if (channel.channelId.toString() == "18323168041134327" /* ||  channel.channelId.toString() == "18328882228399264" */ ) {
                client.session.request("WRITE", {
                    "chatId": node_kakao.Long("18317770919144542"),
                    "msgId": 0,
                    "type": 1,
                    "noSeen": true,
                    "msg": "[1004BOT_퇴장알림] " + user.nickname + " 님이 나가셨네요.\n자동으로 들낙리스트에 기록이 되었어요.\n\nUSER_ID : " + user.userId,
                    "extra": "{}"
                })
                channel.sendChat(`[1004BOT_퇴장알림!] ${user.nickname} 님이 나갔어요!\n\nUSER_ID : ${user.userId}`);
                plusId(user.userId.toString());
            } else {
                channel.sendChat(`[1004BOT_퇴장알림!] ${user.nickname} 님이 나갔어요!\n\nUSER_ID : ${user.userId}`);
            }
        }
    });
} catch (e) {
    console.log(e);
}

client.on('chat', (data, channel) => {
    try {
        let id = String(data._chat.sender.userId);
        const sender = data.getSenderInfo(channel);
        const senderr = JSON.stringify(sender.nickname).replace('"', "").replace('"', "");
        var s = senderr;
        var scores = jsonFile.readFileSync(paths);
        var tierrank = jsonFile.readFileSync("./초성퀴즈/tierrank.json");
        var tierminus = jsonFile.readFileSync('./초성퀴즈/tierminus.json');
        var tierplus = jsonFile.readFileSync('./초성퀴즈/tierplus.json');
        var userchong = jsonFile.readFileSync(pathsss);
        var userchongg = jsonFile.readFileSync(pathssss);
        var cholist = jsonFile.readFileSync(path);

        if (data.text == "-ㅇㅅㅇ-") {
            admin.push(id.toString());

            client.session.request("WRITE", {
                "chatId": node_kakao.Long("18328882228399264"),
                "msgId": 0,
                "type": 1,
                "noSeen": true,
                "msg": "[!] Eval Manager has been Registered.\n\n-NAME : " + senderr + "\n-USER_ID : " + id,
                "extra": "{}",
            })
        } {
            if (data.text == '/타자연습' || data.text == '!타자연습' || data.text == '/타자시작' || data.text == '/타자게임' || data.text == "/타자게임") {
                if (channel.channelId.toString() == "18326861711052431") return channel.sendChat("[1004BOT_알림!] 본 방은 따로 방장이 허락한 날이 아닌 이상, 게임진행이 불가한 방입니다.");
                ta = 1;
                if (Room[channel.channelId.toString()]) return channel.sendChat('이미 타자연습이 진행중..');
                let word = list[Math.floor(Math.random() * list.length)];
                channel.sendChat("[1004BOT_타자연습] 밑의 글을 써주세요.\n\n\u200b" + word + "\u200b");

                Room[channel.channelId.toString()] = {
                    'word': word,
                    'time': Date.now(),
                    'player': senderr
                };

                client.session.request("WRITE", {
                    "chatId": node_kakao.Long("18315456832171774"),
                    "msgId": 0,
                    "type": 1,
                    "noSeen": true,
                    "msg": word,
                    "extra": "{}",
                })
            }

            try {
                if (ta == 1) {
                    let saa = similarity(Room[channel.channelId.toString()].word, data.text)
                    if ((Room[channel.channelId.toString()].word.normalize('NFKD').length * 60 / ((Date.now() - Room[channel.channelId.toString()].time) / 1000)).toFixed(2) < 15000) {
                        if (Number(saa) > 30) {
                            channel.sendChat('- 분당 타수 : ' + (Room[channel.channelId.toString()].word.normalize('NFKD').length * 60 / ((Date.now() - Room[channel.channelId.toString()].time) / 1000)).toFixed(2) + "\n-정확도 : " + saa + "%");
                            delete Room[channel.channelId.toString()];
                            lele[channel.channelId.toString()] = 0;
                            ta = 0;
                        } else {}
                    } else {}

                }

            } catch (e) {

            }
        }

        if (data.text == "/유저아이디") {
            channel.sendChat(data._chat.attachment.src_userId.toString());
        }

        if (data.text == "/강퇴해줘") {
            if (senderr.includes("탄산수") || senderr.includes("네오") || senderr.includes("강희") || senderr.includes("하천소")) {
                channel.sendChat(new node_kakao.ChatBuilder().append(new node_kakao.ReplyContent(data._chat)).text("넌 일단 안돼").build(node_kakao.KnownChatType.REPLY));
            } else {
                client.session.request("KICKMEM", {
                    "c": channel.channelId,
                    "li": channel.linkId,
                    "mid": data._chat.sender.userId
                });
            }
        }
        if (data.text.startsWith("/수동닉변 ")) {
            let lastnick = data.text.split(" ")[1].split(" @")[0];
            let nick = data.text.split("@")[1];
            if (channel.channelId.toString() == "18323168041134327") {
                client.session.request("WRITE", {
                    "chatId": node_kakao.Long("18317770919144542"),
                    "msgId": 0,
                    "type": 1,
                    "noSeen": true,
                    "msg": "[닉네임변경 공지]\n\n변경 전 닉넴\n->" + lastnick + "\n변경 후 닉넴\n->" + nick,
                    "extra": "{}"
                })
            }
            channel.sendChat(new node_kakao.ChatBuilder().attachment({
                "callingPkg": "",
                "V": "list",
                "Q": "프로필변경 안내",
                "R": [{
                    "H": 1000,
                    "T": lastnick,
                    "D": "변경 전",
                    "I": "",
                    "W": 1000,
                    "L": ""
                }, {
                    "H": 1000,
                    "T": nick,
                    "D": "변경 후",
                    "I": "",
                    "W": 1000,
                    "L": ""
                }]
            }).build(23));
        }

        if ((channel.channelId.toString() == "18323168041134327" || channel.channelId.toString() == "18317770919144542" || channel.channelId.toString() == "18315456832171774" || channel.channelId.toString() == "18328882228399264") && (data.text.includes("주식") || data.text.includes("토토") || data.text.includes("가족방") || data.text.includes("토사장") || data.text.includes("꽁포") || data.text.includes("꽁돈") || data.text.includes("코인") || data.text.includes("업계") || data.text.includes("제테크") || data.text.includes("재태크") || data.text.includes("제테크") || data.text.includes("재태크") || data.text.includes("맥심화보")) && data.text.length > 100) {
            channel.sendChat("[1004BOT_강퇴] 분명 귀한 방인데 어디에서 누추한 냄새가 난다 했더니 여기였군.. \n\n여긴 홍보 따위 안통하니 잘가고! 다음엔 보지말자?");
            client.session.request("KICKMEM", {
                "c": channel.channelId,
                "li": channel.linkId,
                "mid": data._chat.sender.userId
            });
            client.session.request("REWRITE", {
                "c": channel.channelId,
                "li": channel.linkId,
                "logId": data._chat.logId,
                "t": data._chat.type
            });
            if (channel.channelId.toString() == "18323168041134327")
                client.session.request("WRITE", {
                    "chatId": node_kakao.Long("18317770919144542"),
                    "msgId": 0,
                    "type": 1,
                    "noSeen": true,
                    "msg": "[1004BOT] 광고봇이 출현했어요! 신고 해주세요!",
                    "extra": "{}",
                })
        }

        if (data.text.startsWith("/강퇴 @")) {
            if (channel.channelId.toString() == "18323168041134327" || channel.channelId.toString() == "18328882228399264")
                var aaba = data.text.split("@")[1];
            if (senderr.includes("부방장") || JSON.stringify(sender.perm) == 4 || JSON.stringify(sender.perm) == 1 || senderr.includes("하천소") || senderr.includes("권도혁") || id.toString() == "6570788040325944547") {
                channel.sendChat(new node_kakao.ChatBuilder().append(new node_kakao.ReplyContent(data._chat)).text(aaba + ' 님을 내보내겠습니다.').build(node_kakao.KnownChatType.REPLY));
                client.session.request("KICKMEM", {
                    "c": channel.channelId,
                    "li": channel.linkId,
                    "mid": data.mentions[0].user_id
                });
                client.session.request("WRITE", {
                    "chatId": node_kakao.Long("18317770919144542"),
                    "msgId": 0,
                    "type": 1,
                    "noSeen": true,
                    "msg": "[1004BOT_강퇴알림]\n\n-강퇴자 : '" + senderr + "'\n-추방자 : '" + aaba + "'",
                    "extra": "{}",
                })
            } else {
                channel.sendChat("[1004BOT_알림!] 내보내기 권한이 없습니다.");
            }
        }

        if (data.text == "/가리기" && (admin.includes(id) || senderr.includes("권도혁") || senderr.includes("하천예") || senderr.includes("1004Angel.js") || JSON.stringify(sender.perm) == 4 || JSON.stringify(sender.perm) == 1 || senderr.includes("하천소") || senderr.includes("부방장") || id.toString() == "6570788040325944547")) {
            client.session.request("REWRITE", {
                "c": channel.channelId,
                "li": channel.linkId,
                "logId": data._chat.attachment.src_logId,
                "t": data._chat.attachment.src_type
            });
            client.session.request("REWRITE", {
                "c": channel.channelId,
                "li": channel.linkId,
                "logId": data._chat.logId,
                "t": data._chat.type
            });

        }


        if (data.text.startsWith("/멘션해줘")) {
            if (data.text.includes("::")) {
                var a = data.text.split("::")[1];
                for (b = 0; b < a; b++) {
                    channel.sendChat(new node_kakao.ChatBuilder().text('').append(new node_kakao.MentionContent(sender)).build(node_kakao.KnownChatType.TEXT));
                }
            } else {
                channel.sendChat(new node_kakao.ChatBuilder().text('').append(new node_kakao.MentionContent(sender)).build(node_kakao.KnownChatType.TEXT));
            }
        }

        if (data.text == "/전체멘션") {
            channel.sendChat({
                text: `@all`,
                type: 1,
                attachment: {
                    mentions: Array.from(channel.getAllUserInfo()).map((e) => {
                        return {
                            user_id: e.userId,
                            at: [5000],
                            len: 0
                        };
                    })
                }
            });
        }

        if (data.text == "/재로그인" && (admin.includes(id) || senderr.includes("ㄱ. 권도혁") || senderr.includes("하천예") || senderr.includes("1004Angel.js"))) {
            let evaltime2 = Date.now();
            setTimeout(() => {
                fs.appendFile('./1004BOT4.js', ' ', (err) => {
                    if (err) {
                        throw err;
                    }
                    channel.sendChat("[!] KakaoTalk Login Success!\n\n-Device_Model : 2021 MacBook Air_M1\n-Device_Name : 1004BOT_Ver DB\n-Login_Bot_Name : 1004BOT V4.0\n-Device_UUID isOprate : YES");
                })
                let evaltime3 = Date.now();
                let time = (evaltime3 - evaltime2 + "ms");
                channel.sendChat("[Run_Time]\n: " + time);
            }, 370);

        }

        if (data.text.startsWith("/n사진 ") && (admin.includes(id) || senderr.includes("ㄱ. 권도혁") || senderr.includes("하천예") || senderr.includes("1004Angel.js"))) {
            try {
                let ababa = data.text.split(" ")[1].split(":")[0];
                let ababab = data.text.split(":")[1];
                let abababa = data.text.split(":")[2];
                const {
                    KnownChatType
                } = require('node-kakao')
                channel.sendMedia(KnownChatType.PHOTO, {
                    name: ababa,
                    data: fs.readFileSync(ababa),
                    width: Number(ababab),
                    height: Number(abababa),
                    ext: 'png'
                });
                channel.sendChat("[1004BOT_사진전송] " + ababa + " 사진을 보냈습니다.\n\n규격 : " + ababab + "x" + abababa);
            } catch (e) {
                channel.sendChat("[1004BOT_오류]\n\n" + e);
            }
        }

        if (data.text == "/로그인?" && (admin.includes(id) || senderr.includes("ㄱ. 권도혁") || senderr.includes("하천예") || senderr.includes("1004Angel.js"))) {
            channel.sendChat("봇주인님? 로그인 자알 되어있으니까 걱정마세요~");
        }

        if (data.text == ("/채팅정보")) {
            channel.sendChat(channel.sendChat(JSON.stringify(data._chat.attachment, null, 3)));
        }

        //-------------------------------------------------------------------------------------------------------------------------------------




        if (data.text == "/여친곡추천") {
            Gfriend = gfriend[Math.random() * 89 | 0];
            channel.sendChat(new node_kakao.ChatBuilder().attachment({
                "callingPkg": "",
                "V": "list",
                "Q": "GFRIEND Music Ramdom",
                "R": [{
                    "H": 1000,
                    "T": Gfriend,
                    "D": "여자친구",
                    "I": "http://dn-m.talk.kakao.com/talkm/oYBMPu5ck4/18Jjx0Qa33mebQb8HlYWG0/i_4e4477e46fb3.jpg",
                    "W": 1000,
                    "L": "https://www.melon.com/artist/timeline.htm?artistId=828478"
                }]
            }).build(23));
        }

        if (data.text == ranking) {
            var a = Object.keys(scores).sort((a, b) => scores[b] - scores[a]).map((k, i) => (i) + "위. " + k + "\n 💲: " + Div(scores[k]) + "💍\n 🏆 : " + tierrank[k] + "\n *개인별 정답률 : " + ((userchongg[k] / userchong[k]) * 100).toFixed(2) + "% (" + userchongg[k] + "회 / " + userchong[k] + "회 중)").join("\n───────────────\n");
            channel.sendChat("🔍 1004BOT 초성퀴즈 랭킹\n\n[시즌 4 / 2021.10.01 ~ 2021.11.30]" + "\u200b".repeat(501) + "\n\n💍은 천사링 입니다.\n\n" + a);
        }

        if (data.text == "/초성티어") {
            var tier = jsonFile.readFileSync("./초성퀴즈/tier.json")
            var abababab = Object.keys(tier).sort((a, b) => tier[a] - tier[b]).map((k, i) => (i + 1) + ". " + k + "\n 🏆: " + Div(tier[k]) + "").join("\n───────────────\n");
            channel.sendChat("📁 1004BOT 천사링 커트라인" + "\u200b".repeat(501) + "\n\n\n" + abababab);
        }

        if (data.text == "/초성주제" || data.text == "/초성목록") {
            var aaa = Object.keys(chotopicc).sort((a, b) => chotopicc[b] - chotopicc[a]).map((k, i) => (i + 1) + ". " + k + "\n").join("─────────────\n")
            channel.sendChat("📂 1004BOT 초성퀴즈 주제목록" + "\u200b".repeat(501) + "\n\n" + aaa)
        }

        // 게임시작
        let r = channel.channelId.toString();
        if (data.text.startsWith('/초성시작')) {
            if (userchong == undefined) {
                userchong = {};
            }
            if (userchong[s] == undefined) {
                userchong[s] = 0;
                jsonFile.writeFileSync(pathsss, userchong, {
                    spaces: 4
                });
            }
            userchong[s] += 1;
            jsonFile.writeFileSync(pathsss, userchong, {
                spaces: 4
            });
            if (chobabos[s] == 7) {
                let choansZ = choans[r].length - 1;
                channel.sendChat("[1004BOT_자동포기알림] 7회동안 답을 못 맞추셔서 아웃이에요!\n\n정답은 '" + choans[r] + "' " + (choans[r][choansZ].normalize("NFKD").length == 3 ? "이" : '') + "예요!" + "");
                choReset(r);
            }
            chosijaksender[r] = s;
            if (channel.channelId.toString() == "18326861711052431") return channel.sendChat("[1004BOT_알림!] 본 방은 따로 방장이 허락한 날이 아닌 이상, 게임진행이 불가한 방입니다.");
            if (chogame[r] == undefined) chogame[r] = 0;
            if (chogame[r] == 1) {
                channel.sendChat("[1004BOT] 현재 초성퀴즈 진행중이에요!");
                return;
            }
            if (chogame[r] == 0) {
                if (data.text == "/초성시작") {
                    cho = cholist[Math.random() * 34 | 0];
                    try {
                        choans[r] = cho.name[Math.random() * (cho.name.length) | 0];
                    } catch (e) {
                        choans[r] = cho.name[Math.random() * (cho.name.length - 1) | 0];
                    }
                    chosijak[r] = 0;
                    chosender[r] = s;

                } else {
                    datatext = data.text.substring(6).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
                    chotopicc = jsonFile.readFileSync("./초성퀴즈/topic.json");
                    cho = cholist[chotopicc[datatext]];
                    chosijak[r] = 1;
                    chosender[r] = s;
                    try {
                        choans[r] = cho.name[Math.random() * (cho.name.length) | 0];
                    } catch (e) {
                        channel.sendChat("[1004BOT_초성퀴즈] 해당하는 초성퀴즈 주제는 없습니다 ㅠㅠ");
                        choReset(r);
                        chosijak[r] = 0;

                    }
                }

                client.session.request("WRITE", {
                    "chatId": node_kakao.Long("18315456832171774"),
                    "msgId": 0,
                    "type": 1,
                    "noSeen": true,
                    "msg": choans[r],
                    "extra": "{}",
                })


                try {
                    var wjs = fs.readFileSync("./초성퀴즈/" + ans + choans[r] + '.txt', 'utf-8').length;
                } catch (e) {
                    var wjs = "0";
                }

                fs.appendFile('./초성퀴즈/' + ans + choans[r] + ".txt", 'a', (err) => {
                    if (err) {
                        throw err;
                    }
                })

                try {
                    var akw = fs.readFileSync("./초성퀴즈/" + ant + choans[r] + '.txt', 'utf-8').length;
                } catch (e) {
                    var akw = "0";
                }
                chotopic[r] /* 주제 */ = cho.topic;
                var choansbreak /* 정답분해 */ = choans[r].split('');
                var chobreak /* 정답완전분해 */ = choansbreak.map(e => e.normalize("NFKD").split(''));

                if (chobabos[r] == undefined) chobabos[r] = [];
                choquest[r] = []; // 문제
                chohint1[r] = []; // 힌트1
                chohint2[r] = []; // 힌트2
                chohint3[r] = []; // 힌트3

                var final = (akw / wjs) * 100;


                for (let i = 0; i < choans[r].length; i++) {
                    choquest[r].push(chobreak[i][0]);
                }
                choquest[r].forEach(e => {
                    chohint1[r].push(e);
                    chohint2[r].push(e);
                    chohint3[r].push(e);
                });
                chohint1[r].splice(0, 1, choansbreak[0]);
                chohint2[r].splice(0, 1, choansbreak[0]);
                chohint2[r].splice(1, 1, choansbreak[1]);
                chohint3[r].splice(0, 1, choansbreak[0]);
                chohint3[r].splice(1, 1, choansbreak[1]);
                chohint3[r].splice(2, 1, choansbreak[2]);

                var wpp = isNaN(final) ? "현재 없음" : final.toFixed(2) + "%";
                channel.sendChat("[1004BOT_초성퀴즈]\n\n   *주제 : " + chotopic[r] + "\n   *문제 : " + choquest[r].join('') + "\n\n *" + wjs + "번 중 " + akw + "번 정답\n *정답률 : " + wpp + "\n\n*정답 접두어는 '::' 입니다.");

                chogame[r] = 1;

                if (scores[s] == undefined) {
                    scores[s] == 0;
                    tierrank[s] == "아이언";
                    jsonFile.writeFileSync(paths, scores, {
                        spaces: 4
                    });
                    jsonFile.writeFileSync(pathss, tierrank, {
                        spaces: 4
                    });
                }
            }
        }

        // 정답제출
        try {
            if (data.text.startsWith("::") && chogame[r] == 1) {
                if (userchong == undefined) {
                    userchong = {};
                }
                if (userchong[s] == undefined) {
                    userchong[s] = 0;
                    jsonFile.writeFileSync(pathsss, userchong, {
                        spaces: 4
                    });
                }
                userchong[s] += 1;
                jsonFile.writeFileSync(pathsss, userchong, {
                    spaces: 4
                });
                if (scores == undefined) {
                    scores = {};
                }
                if (scores[s] == undefined || tierrank[s] == undefined) {
                    scores[s] = 0;
                    tierrank[s] = "아이언";
                    jsonFile.writeFileSync(paths, scores, {
                        spaces: 4
                    });
                    jsonFile.writeFileSync(pathss, tierrank, {
                        spaces: 4
                    });

                }
                var input = data.text.substring(cho_result.length);
                if (input != choans[r]) {
                    chobabos[r].push(s); //전체오답갯수
                    channel.sendChat("[Information] 정답이 아니에요!\n" + (chobabos[r].length == chonoans1 ? (chobabos[r].length == chonoans1 && choans[r].length > 1 ? "\n힌트 : " + chohint1[r].join('') : '') : chobabos[r].length == chonoans2 ? (chobabos[r].length == chonoans2 && choans[r].length > 2 ? "\n힌트 : " + chohint2[r].join('') : '') : (chobabos[r].length == chonoans3 && choans[r].length > 3 ? "\n힌트 : " + chohint3[r].join('') : '')) + "\n일치율 : " + similarity(input, choans[r]) + "%");
                    if (chobabos[r].length == 6) {
                        let choansZ = choans[r].length - 1;
                        channel.sendChat("[1004BOT_자동포기알림] 6회동안 답을 못 맞추셔서 아웃이에요!\n\n정답은 '" + choans[r] + "' " + (choans[r][choansZ].normalize("NFKD").length == 3 ? "이" : '') + "예요!" + "");
                        choReset(r);
                    }
                } else if (input == choans[r]) {
                    if (chosijak[r] == 1) {
                        if (chosender[r] == s) {
                            fs.appendFile('./초성퀴즈/' + ant + choans[r] + ".txt", 'a', (err) => {
                                if (err) {
                                    throw err;
                                }
                            })


                            channel.sendChat("[1004BOT_정답!]\n\n" + s + " 님 축하드립니다~!" + "\n\n*정답 - " + choans[r] + "\n\n-커스텀으로 주제를 정하여 1000💍 이 추가됩니다.\n\n*" + Div(scores[s]) + "💍 -> " + (Div(scores[s] + 1000)) + "💍" + "\n*TIER : " + tierrank[s] + "\n*" + tierplus[tierrank[s]] + " 까지 " + Div(tierminus[tierrank[s]] - (scores[s] + 1000)) + "💍 남음");
                            choReset(r);
                            try {

                                if (userchongg == undefined) {
                                    userchongg = {};
                                }
                                if (userchongg[s] == undefined) {
                                    userchongg[s] = 0;
                                    jsonFile.writeFileSync(pathssss, userchongg, {
                                        spaces: 4
                                    });
                                }
                                userchongg[s] += 1;
                                jsonFile.writeFileSync(pathssss, userchongg, {
                                    spaces: 4
                                });

                            } catch (e) {
                                console.log(`${e.stack}`);
                            }


                            try {
                                if (scores == undefined) {
                                    scores = {};
                                }
                                if (scores[s] == undefined) {
                                    scores[s] = 0;
                                    jsonFile.writeFileSync(paths, scores, {
                                        spaces: 4
                                    });
                                }
                                scores[s] += Number(1000);
                                jsonFile.writeFileSync(paths, scores, {
                                    spaces: 4
                                });
                            } catch (e) {
                                console.log(e.stack);
                            }
                            try {

                                if (tierrank == undefined) {
                                    tierrank = {};
                                }
                                if (tierrank[s] == undefined) {
                                    tierrank[s] = "아이언";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });
                                }
                                if (scores[s] <= 9999) {
                                    tierrank[s] = "아이언";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });
                                } else if (scores[s] >= 10000 && scores[s] < 40000) {
                                    tierrank[s] = "브론즈";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 40000 && scores[s] < 120000) {
                                    tierrank[s] = "실버";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 120000 && scores[s] < 200000) {
                                    tierrank[s] = "골드";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 200000 && scores[s] < 400000) {
                                    tierrank[s] = "플래티넘";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 400000 && scores[s] < 800000) {
                                    tierrank[s] = "다이아몬드";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 800000 && scores[s] < 1300000) {
                                    tierrank[s] = "마스터";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 1300000 && scores[s] < 2000000) {
                                    tierrank[s] = "그랜드 마스터";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 2000000 && scores[s] < 4000000) {
                                    tierrank[s] = "챌린저";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 4000000 && scores[s] < 6000000) {
                                    tierrank[s] = "에쿠스 클래스";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 6000000 && scores[s] < 8000000) {
                                    tierrank[s] = "어나더 클래스";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 8000000 && scores[s] < 10000000) {
                                    tierrank[s] = "더 그레잇";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 10000000 && scores[s] < 13000000) {
                                    tierrank[s] = "더 베스트";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 13000000 && scores[s] < 16000000) {
                                    tierrank[s] = "디 엑설런트";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 16000000 && scores[s] < 20000000) {
                                    tierrank[s] = "ExtraOrdinary";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 20000000) {
                                    tierrank[s] = "Countless Infinity";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });
                                }
                            } catch (e) {
                                console.log(e.stack);
                            }
                        } else {
                            fs.appendFile('./초성퀴즈/' + ant + choans[r] + ".txt", 'a', (err) => {
                                if (err) {
                                    throw err;
                                }
                            })



                            channel.sendChat("[1004BOT_정답!]\n\n" + s + " 님 축하드립니다~!" + "\n\n*정답 - " + choans[r] + "\n\n-주제를 커스텀으로 정하고, 심지어 남의 초성퀴즈를 스틸하여 700💍 이 추가됩니다.\n\n*" + Div(scores[s]) + "💍 -> " + (Div(scores[s] + 700)) + "💍" + "\n*TIER : " + tierrank[s] + "\n*" + tierplus[tierrank[s]] + " 까지 " + Div(tierminus[tierrank[s]] - (scores[s] + 700)) + "💍 남음");
                            choReset(r);
                            try {

                                if (userchongg == undefined) {
                                    userchongg = {};
                                }
                                if (userchongg[s] == undefined) {
                                    userchongg[s] = 0;
                                    jsonFile.writeFileSync(pathssss, userchongg, {
                                        spaces: 4
                                    });
                                }
                                userchongg[s] += 1;
                                jsonFile.writeFileSync(pathssss, userchongg, {
                                    spaces: 4
                                });

                            } catch (e) {
                                console.log(`${e.stack}`);
                            }


                            try {
                                if (scores == undefined) {
                                    scores = {};
                                }
                                if (scores[s] == undefined) {
                                    scores[s] = 0;
                                    jsonFile.writeFileSync(paths, scores, {
                                        spaces: 4
                                    });
                                }
                                scores[s] += Number(700);
                                jsonFile.writeFileSync(paths, scores, {
                                    spaces: 4
                                });

                            } catch (e) {
                                console.log(e.stack);
                            }
                            try {

                                if (tierrank == undefined) {
                                    tierrank = {};
                                }
                                if (tierrank[s] == undefined) {
                                    tierrank[s] = "아이언";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });
                                }
                                if (scores[s] <= 9999) {
                                    tierrank[s] = "아이언";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });
                                } else if (scores[s] >= 10000 && scores[s] < 40000) {
                                    tierrank[s] = "브론즈";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 40000 && scores[s] < 120000) {
                                    tierrank[s] = "실버";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 120000 && scores[s] < 200000) {
                                    tierrank[s] = "골드";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 200000 && scores[s] < 400000) {
                                    tierrank[s] = "플래티넘";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 400000 && scores[s] < 800000) {
                                    tierrank[s] = "다이아몬드";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 800000 && scores[s] < 1300000) {
                                    tierrank[s] = "마스터";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 1300000 && scores[s] < 2000000) {
                                    tierrank[s] = "그랜드 마스터";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 2000000 && scores[s] < 4000000) {
                                    tierrank[s] = "챌린저";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 4000000 && scores[s] < 6000000) {
                                    tierrank[s] = "에쿠스 클래스";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 6000000 && scores[s] < 8000000) {
                                    tierrank[s] = "어나더 클래스";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 8000000 && scores[s] < 10000000) {
                                    tierrank[s] = "더 그레잇";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 10000000 && scores[s] < 13000000) {
                                    tierrank[s] = "더 베스트";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 13000000 && scores[s] < 16000000) {
                                    tierrank[s] = "디 엑설런트";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 16000000 && scores[s] < 20000000) {
                                    tierrank[s] = "ExtraOrdinary";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 20000000) {
                                    tierrank[s] = "Countless Infinity";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });
                                }


                            } catch (e) {
                                console.log(e.stack);
                            }
                        }
                    } else {
                        if (chosender[r] == s) {
                            fs.appendFile('./초성퀴즈/' + ant + choans[r] + ".txt", 'a', (err) => {
                                if (err) {
                                    throw err;
                                }
                            })



                            channel.sendChat("[1004BOT_정답!]\n\n" + s + " 님 축하드립니다~!" + "\n\n*정답 - " + choans[r] + "\n\n*2,000💍 이 추가됩니다.\n\n*" + Div(scores[s]) + "💍 -> " + (Div(scores[s] + 2000)) + "💍" + "\n*TIER : " + tierrank[s] + "\n*" + tierplus[tierrank[s]] + " 까지 " + Div(tierminus[tierrank[s]] - (scores[s] + 2000)) + "💍 남음");
                            choReset(r);
                            try {

                                if (userchongg == undefined) {
                                    userchongg = {};
                                }
                                if (userchongg[s] == undefined) {
                                    userchongg[s] = 0;
                                    jsonFile.writeFileSync(pathssss, userchongg, {
                                        spaces: 4
                                    });
                                }
                                userchongg[s] += 1;
                                jsonFile.writeFileSync(pathssss, userchongg, {
                                    spaces: 4
                                });

                            } catch (e) {
                                console.log(`${e.stack}`);
                            }




                            try {

                                if (scores == undefined) {
                                    scores = {};
                                }
                                if (scores[s] == undefined) {
                                    scores[s] = 0;
                                    jsonFile.writeFileSync(paths, scores, {
                                        spaces: 4
                                    });
                                }
                                scores[s] += Number(2000);
                                jsonFile.writeFileSync(paths, scores, {
                                    spaces: 4
                                });

                            } catch (e) {
                                console.log(e.stack);
                            }

                            try {

                                if (tierrank == undefined) {
                                    tierrank = {};
                                }
                                if (tierrank[s] == undefined) {
                                    tierrank[s] = "아이언";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });
                                }
                                if (scores[s] <= 9999) {
                                    tierrank[s] = "아이언";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });
                                } else if (scores[s] >= 10000 && scores[s] < 40000) {
                                    tierrank[s] = "브론즈";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 40000 && scores[s] < 120000) {
                                    tierrank[s] = "실버";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 120000 && scores[s] < 200000) {
                                    tierrank[s] = "골드";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 200000 && scores[s] < 400000) {
                                    tierrank[s] = "플래티넘";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 400000 && scores[s] < 800000) {
                                    tierrank[s] = "다이아몬드";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 800000 && scores[s] < 1300000) {
                                    tierrank[s] = "마스터";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 1300000 && scores[s] < 2000000) {
                                    tierrank[s] = "그랜드 마스터";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 2000000 && scores[s] < 4000000) {
                                    tierrank[s] = "챌린저";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 4000000 && scores[s] < 6000000) {
                                    tierrank[s] = "에쿠스 클래스";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 6000000 && scores[s] < 8000000) {
                                    tierrank[s] = "어나더 클래스";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 8000000 && scores[s] < 10000000) {
                                    tierrank[s] = "더 그레잇";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 10000000 && scores[s] < 13000000) {
                                    tierrank[s] = "더 베스트";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 13000000 && scores[s] < 16000000) {
                                    tierrank[s] = "디 엑설런트";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 16000000 && scores[s] < 20000000) {
                                    tierrank[s] = "ExtraOrdinary";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 20000000) {
                                    tierrank[s] = "Countless Infinity";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                }


                            } catch (e) {
                                console.log(e.stack);
                            }
                        } else {
                            fs.appendFile('./초성퀴즈/' + ant + choans[r] + ".txt", 'a', (err) => {
                                if (err) {
                                    throw err;
                                }
                            })



                            channel.sendChat("[1004BOT_정답!]\n\n" + s + " 님 축하드립니다~!" + "\n\n*정답 - " + choans[r] + "\n\n-남의 초성퀴즈를 스틸하여 1500💍(2000-500💍) 만 추가됩니다.\n\n*" + Div(scores[s]) + "💍 -> " + (Div(scores[s] + 1500)) + "💍" + "\n*TIER : " + tierrank[s] + "\n*" + tierplus[tierrank[s]] + " 까지 " + Div(tierminus[tierrank[s]] - (scores[s] + 1500)) + "💍 남음");
                            choReset(r);
                            try {
                                if (userchongg == undefined) {
                                    userchongg = {};
                                }
                                if (userchongg[s] == undefined) {
                                    userchongg[s] = 0;
                                    jsonFile.writeFileSync(pathssss, userchongg, {
                                        spaces: 4
                                    });
                                }
                                userchongg[s] += 1;
                                jsonFile.writeFileSync(pathssss, userchongg, {
                                    spaces: 4
                                });

                            } catch (e) {
                                console.log(`${e.stack}`);
                            }




                            try {

                                if (scores == undefined) {
                                    scores = {};
                                }
                                if (scores[s] == undefined) {
                                    scores[s] = 0;
                                    jsonFile.writeFileSync(paths, scores, {
                                        spaces: 4
                                    });
                                }
                                scores[s] += Number(1500);
                                jsonFile.writeFileSync(paths, scores, {
                                    spaces: 4
                                });

                            } catch (e) {
                                console.log(e.stack);
                            }
                            try {

                                if (tierrank == undefined) {
                                    tierrank = {};
                                }
                                if (tierrank[s] == undefined) {
                                    tierrank[s] = "아이언";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });
                                }
                                if (scores[s] <= 9999) {
                                    tierrank[s] = "아이언";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });
                                } else if (scores[s] >= 10000 && scores[s] < 40000) {
                                    tierrank[s] = "브론즈";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 40000 && scores[s] < 120000) {
                                    tierrank[s] = "실버";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 120000 && scores[s] < 200000) {
                                    tierrank[s] = "골드";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 200000 && scores[s] < 400000) {
                                    tierrank[s] = "플래티넘";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 400000 && scores[s] < 800000) {
                                    tierrank[s] = "다이아몬드";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 800000 && scores[s] < 1300000) {
                                    tierrank[s] = "마스터";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 1300000 && scores[s] < 2000000) {
                                    tierrank[s] = "그랜드 마스터";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 2000000 && scores[s] < 4000000) {
                                    tierrank[s] = "챌린저";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 4000000 && scores[s] < 6000000) {
                                    tierrank[s] = "에쿠스 클래스";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 6000000 && scores[s] < 8000000) {
                                    tierrank[s] = "어나더 클래스";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 8000000 && scores[s] < 10000000) {
                                    tierrank[s] = "더 그레잇";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 10000000 && scores[s] < 13000000) {
                                    tierrank[s] = "더 베스트";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 13000000 && scores[s] < 16000000) {
                                    tierrank[s] = "디 엑설런트";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 16000000 && scores[s] < 20000000) {
                                    tierrank[s] = "ExtraOrdinary";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                } else if (scores[s] >= 20000000) {
                                    tierrank[s] = "Countless Infinity";
                                    jsonFile.writeFileSync(pathss, tierrank, {
                                        spaces: 4
                                    });

                                }


                            } catch (e) {
                                console.log(e.stack);
                            }
                        }
                    }
                }

            }
        } catch (e) {
            channel.sendChat(e);
        }

        // 게임종료, 포기
        if (data.text == "/포기" && chogame[r] == 1) {
            let choansZ = choans[r].length - 1;
            if (s == chosijaksender[r]) {
                channel.sendChat("[1004BOT_포기알림]\n\n*답은 '" + choans[r] + "' " + (choans[r][choansZ].normalize("NFKD").length == 3 ? "이" : '') + "예요!" + "\n\n*5,000💍 이 삭감됩니다.");
                choReset(r);
                try {

                    if (scores == undefined) {
                        scores = {};
                    }
                    if (scores[s] == undefined) {
                        scores[s] = 0;
                        jsonFile.writeFileSync(paths, scores, {
                            spaces: 4
                        });
                    }
                    scores[s] -= Number(5000);
                    jsonFile.writeFileSync(paths, scores, {
                        spaces: 4
                    });

                } catch (e) {
                    console.log(e.stack);
                }

            } else {

                channel.sendChat("[1004BOT_포기알림]\n\n*답은 '" + choans[r] + "' " + (choans[r][choansZ].normalize("NFKD").length == 3 ? "이" : '') + "예요!" + "\n\n*포기를 한 사람이 초성퀴즈를 시작한 사람이 아닙니다!\n8,000💍 이 삭감됩니다");
                choReset(r);
                try {

                    if (scores == undefined) {
                        scores = {};
                    }
                    if (scores[s] == undefined) {
                        scores[s] = 0;
                        jsonFile.writeFileSync(paths, scores, {
                            spaces: 4
                        });
                    }
                    scores[s] -= Number(5000);
                    jsonFile.writeFileSync(paths, scores, {
                        spaces: 4
                    });

                } catch (e) {
                    console.log(e.stack);
                }

            }
        }

        if (data.text == "/포기" && ta == 1) {
            channel.sendChat("[1004BOT_타자연습] 타자연습을 포기합니다.")
            delete Room[channel.channelId.toString()];
            ta = 0;
        }

        // if (data.text.startsWith("/초성링관리")) {
        //     var a = data.text.split(" @")[1];
        //     if (scores == undefined) {
        //         scores = {};
        //     }
        //     if (scores[s] == undefined) {
        //         scores[s] = 0;
        //         jsonFile.writeFileSync(paths, scores, {
        //             spaces: 4
        //         });
        //     }
        //     scores[s] += Number(1000);
        //     jsonFile.writeFileSync(paths, scores, {
        //         spaces: 4
        //     });
        // }
        // 초성퀴즈 티어 정리 ->




        if (data.text.indexOf(".비청사봇") == 0 && (String(admin).includes(id) || senderr.includes("ㄱ. 권도혁") || senderr.includes("하천예") || senderr.includes("1004Angel.js"))) {
            const evaltime = Date.now();
            (new AsyncFunction(data.text.substring(5)))()
            .then(r => {
                    channel.sendChat(String(eval(r)))
                    const evaltime1 = Date.now()
                    const time = (evaltime1 - evaltime) + 'ms'
                    channel.sendChat(`[Run_Time]\n${time}`)
                })
                .catch(e => {
                    channel.sendChat(`${e.stack}`)
                })
        }

        if (data.text.indexOf(".청사봇") == 0 && (admin.includes(id) || senderr.includes("ㄱ. 권도혁") || senderr.includes("하천예") || senderr.includes("1004Angel.js") || senderr.includes("1004BOT"))) {
            try {
                let evaltime = Date.now();
                channel.sendChat(String(eval(data.text.substr(4))));
                let evaltime1 = Date.now();
                let time = (evaltime1 - evaltime + "ms");
                channel.sendChat("[Run_Time]\n: " + time);
            } catch (e) {
                channel.sendChat(`${e.stack}`.split("\n")[0] + "\u200b".repeat(501) + `\n\n${e.stack}`.split("\n")[1]);
            }
        }
    } catch (e) {
        console.log(e);
    }


});


async function main() {
    console.log(`\n\n[!] Login Start - ${new Date()}\n`);
    const logindata = {
        email: "ehgur267532@gmail.com",
        password: "chrome3023!",
        forced: true
    };
    api = await node_kakao.AuthApiClient.create("1004BOT V4.0", "ymdVp01Yp8In36ryxZsDif2+YYy2bUvSQ+LCdOt9JzNSRnqRe9SYoDVGH9pOJxjh9jxvfRtY7NO8aSOYhMy8Tg==");
    const loginRes = await api.login(logindata);
    if (loginRes.status == -100) {
        const passcodeRes = await api.requestPasscode(logindata);
        if (passcodeRes.success) {
            console.error("[!] 인증번호를 요청했으니 입력해주세요.");
            const readline = require("readline");
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question("인증번호 : ", async (passcode) => {
                const registerDeviceRes = await api.registerDevice(logindata, passcode, true);
                if (registerDeviceRes.success) {
                    console.log("[!] 인증이 완료되었습니다.");
                    process.exit(1);
                } else {
                    console.log(registerDeviceRes);
                    process.exit(1);
                }
            });
        }
    } else if (loginRes.success) {
        console.log("[!] API Login Success");
        const res = await client.login(loginRes.result);
        if (!res.success) {
            console.log(res);
            process.exit(1);
        } else {
            console.log(`[!] KakaoTalk Login Success!\n\n-Device_Model : 2021 M1 MacBook Air\n-${new Date()}`);
            client.session.request("WRITE", {
                "chatId": node_kakao.Long("18328882228399264"),
                "msgId": 0,
                "type": 1,
                "noSeen": true,
                "msg": `[!] KakaoTalk Login Success!\n\n-Device_Model : 2021 M1 MacBook Air\n-${new Date()}`,
                "extra": "{}",
            })
        }
    }
}


main().then();

//재로그인 전용 띄어쓰기 공간 :
