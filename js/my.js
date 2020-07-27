// 使用idea本地加载
function IdeaLocalLoad() {
    $.ajax({
        url: './md/NodeJs/NodeJs.md'
        ,success:function (res) {
            console.log(res)
            res = res.replace(/]\(images/g,'](./md/NodeJs/images')
            console.log('正则表达式翻译之后')
            console.log(res)
            document.getElementById('content').innerHTML = marked(res)
        }
    })
}

// 使用github远程加载
function GitHubRemoteLoad() {
    $.ajax({
        url: './md/NodeJs/NodeJs.md'
        ,success:function (res) {
            console.log(res)
            res = res.replace(/]\(images/g,'](./md/NodeJs/images')
            console.log('正则表达式翻译之后')
            console.log(res)
            document.getElementById('content').innerHTML = marked(res)
        }
    })
}

// 使用github远程加载
function GitHubRemoteLoad(filename) {
    $.ajax({
        url: './md/'+filename+'/'+filename+'.md'
        ,success:function (res) {
            console.log(res)
            res = res.replace(/]\(images/g,'](./md/'+filename+'/images')
            console.log('正则表达式翻译之后')
            console.log(res)
            document.getElementById('content').innerHTML = marked(res)
        }
    })
}