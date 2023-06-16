// create editor 1
const  editor1 = new JSONEditor(document.getElementById('jsoneditor1'), {
    mode: 'code',
    onChangeText: function (jsonString) {
        editor2.updateText(jsonString)
        editor2.expandAll()
    }
})

// create editor 2
const  editor2 = new JSONEditor(document.getElementById('jsoneditor2'), {
    mode: 'tree',
    modes: ['code', 'form', 'text', 'tree', 'view', 'preview'],
    onChangeText: function (jsonString) {
        editor1.updateText(jsonString)
    },
    timestampFormat: function ({ field, value, path }) {
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss.SSS")
    },
    onEvent: function(node, event) {
        if (node.value !== undefined) {
            console.log(event.type + ' event ' +
                'on value ' + JSON.stringify(node.value) + ' ' +
                'at path ' + JSON.stringify(node.path)
            )
            // console.log(event)
            if (event.type === "mouseover" && node.value.startsWith && node.value.startsWith("http")) {
                document.getElementById("previewImage").src = event.target.innerHTML;
                document.getElementById("previewImage").style.top = Math.min(Math.max(0, window.innerHeight - 400), event.clientY + 50) + "px";
                document.getElementById("previewImage").style.left = (event.clientX + 50) + "px";
                document.getElementById("previewImage").style.display = '';

                event.target.style.cursor = "pointer";
            }
            if (event.type === "mouseout"){
                document.getElementById("previewImage").style.display = 'none';
                event.target.style.cursor = "default";
            }
            if (event.type === "click" && typeof node.value === 'string' && node.value.startsWith("http")) {
                if (event.ctrlKey || event.metaKey) {
                    window.open(node.value);
                }
            }
        } else {
            console.log(event.type + ' event ' +
                'on field ' + JSON.stringify(node.field) + ' ' +
                'at path ' + JSON.stringify(node.path)
            )
        }
    }
})

const defaultJson = {
    "name": "json例子",
    "features": [
        {
            "name": "时间戳格式化",
            "demo": 1672887903000
        },
        {
            "name": "鼠标hover图片预览",
            "demo": "https://avatars.githubusercontent.com/u/6925885?v=4"
        }
    ]
};

editor1.updateText('');
editor2.update(defaultJson);
editor2.expandAll();