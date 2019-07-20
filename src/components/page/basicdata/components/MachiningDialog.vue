<template>
    <div>
        <!-- 制造工艺 -->
        <el-dialog 
            :visible.sync="MachiningVisible"
            width="95%">
            <table class="machiningTableHeader">
                <tr>
                    <td colspan="8"><h1>产 品 机 械 加 工 工 艺 卡</h1></td>
                    <td>编号</td>
                    <td colspan="4"><input type="text" v-model="machiningTableHeader.hendNumber"></td>
                    <td></td>
                </tr>
                <tr>
                    <td>产品名称</td>
                    <td><input v-model="machiningTableHeader.productName"/></td>
                    <td>所属部件名称</td>
                    <td><input v-model="machiningTableHeader.ownPartName"/></td>
                    <td colspan="4">零件名称</td>
                    <td><input v-model="machiningTableHeader.partsName"/></td>
                    <td colspan="4">材料</td>
                    <td><input v-model="machiningTableHeader.workpieceNumber"/></td>
                </tr>
                <tr>
                    <td>产品图号</td>
                    <td><input v-model="machiningTableHeader.productDrawingNumber"/></td>
                    <td>所属部件图号</td>
                    <td><input v-model="machiningTableHeader.ownPartDrawingNumber"/></td>
                    <td colspan="4">零件图号</td>
                    <td><input v-model="machiningTableHeader.partsDrawingNumber"/></td>
                    <td colspan="4">数量</td>
                    <td><input v-model="machiningTableHeader.quantity"/></td>
                </tr>
            </table>
            <table class="machiningTableBody">
                <tr>
                <td class="serialNumber">序号</td>
                <td>工序</td>
                <td>车间</td>
                <td>工序内容</td>
                <td>设备</td>
                <td>工艺示意图</td>
                </tr>
                <tr  v-for="(item,index) in machiningTableBody.rowsData">
                <td class="serialNumber"><input v-model="item.serialNumber" /></td>
                <td><input v-model="item.processFlow" /></td>
                <td><input v-model="item.workshop" /></td>
                <td><input v-model="item.skillsRequirement" /></td>
                <td><input v-model="item.equipment" /></td>
                <td rowspan="20" v-if="index==0"></td>
                </tr>  
                <tr>
                    <td colspan="5" class="machiningTableBody_1_img" @drop="drop($event,'1')" @dragover="allowDrop($event)" v-html="machiningTableBody.imgHtmlOne">&nbsp;</td>
                </tr>
            </table>
            <table class="machiningTableFooter">
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2">编制（日期）</td>
                <td colspan="2">审核（日期）</td>
                <td colspan="5" rowspan="3"><h1>中山市金马科技娱乐设备股份有限公司</h1></td>
                </tr>
                <tr>
                <td>&nbsp;</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2" rowspan="2"><input v-model="machiningTableFooter.name1"/></td>
                <td colspan="2" rowspan="2"><input v-model="machiningTableFooter.name2"/></td>
                </tr>
                <tr>
                <td>标记</td>
                <td>处数</td>
                <td>更改文件号</td>
                <td>签名</td>
                <td>日期</td>
                </tr>
            </table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="MachiningVisible = false">取 消</el-button>
                <el-button type="primary" @click="machiningSaveData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "MachiningDialog",
    props: {

    },
    data() {
        return {
            selectedTreeNode : {//左边树选中的节点（表类型，对应的id）
                tableFlag : "",
                relateId : ""
            },
            MachiningVisible: false,//机加工dialog
            machiningTableHeader: {
                "contactId" : "",//保存记录后返回的id
                "hendNumber": "",
                "productName": "",
                "ownPartName": "",
                "partsName": "",
                "workpieceNumber": "",
                "productDrawingNumber": "",
                "ownPartDrawingNumber": "",
                "partsDrawingNumber": "",
                "quantity": ""
            },
            machiningTableBody: {
                rowsData:[
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""}
                ],
                fileOne:"",
                imgHtmlOne:""
            },   
            machiningTableFooter: {
                "name1":"",
                "name2":""
            }
        }
    },
    methods: {
        //重置焊接模态框的输入框
        resetInputMachining() {            
            this.machiningTableHeader = {
                "contactId" : "",//保存记录后返回的id
                "hendNumber": "",
                "productName": "",
                "ownPartName": "",
                "partsName": "",
                "workpieceNumber": "",
                "productDrawingNumber": "",
                "ownPartDrawingNumber": "",
                "partsDrawingNumber": "",
                "quantity": ""            },
            this.machiningTableBody = {
                rowsData:[
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""},
                {"serialNumber":"","processFlow":"","workshop":"","skillsRequirement":"","equipment":""}
                ],
                fileOne:"",
                imgHtmlOne:""
            },    
            this.machiningTableFooter = {
                "name1":"",
                "name2":""
            }
        },
        //打开新建焊接模态框
        openMachiningDialog(selectedTreeNode){
            this.selectedTreeNode = selectedTreeNode
             console.log(selectedTreeNode)
            this.MachiningVisible = true
            if(this.machiningTableHeader.contactId){
                this.resetInputMachining()
            } 
        },
        //阻止默认行为
        allowDrop(ev){
            ev.preventDefault()
        },
        //接收拖曳对象
		drop(ev,imgflag){
            ev.preventDefault()//阻止浏览器默认行为
            var files = ev.dataTransfer.files
            if(files.length){
                var file_img = files[0]
                switch(imgflag){
                case "1":
                    this.machiningTableBody.fileOne = file_img
                    break;
                }
                
                var reader = new FileReader();
                //判断文件类型
                if (file_img.type.match(/image*/)){
                    reader.onload = function (e){
                    // var imageBox = document.getElementById("imageBox")
                    // var temp_html = '<img src="'+ e.target.result +'" />'
                    var img = document.createElement('img')//创建标签img
                    img.src = e.target.result
                    // img.style.width = '100%'
                    // img.style.height = '100%'
                    img.style.maxWidth = '100%'
                    img.style.maxHeight = '100%'
                    img.style.pointerEvents = 'none'//事件无效化，穿透底层
                    var tdDoc = ev.toElement
                    tdDoc.innerHTML = ""
                    tdDoc.appendChild(img)
                    };
                    reader.readAsDataURL(file_img);
                }else{
                    console.log("此" + file_img.name + "不是图片文件！");
                }
            }
        },
        //制造信息保存
        machiningSaveData(){
            let fd = new FormData()
            if(this.machiningTableHeader.contactId){//更新保存
                    fd.append("flag","machiningUpdateData")
                    fd.append("machiningTableHeader",JSON.stringify(this.machiningTableHeader))//头部信息
                    fd.append("machiningTableBody",JSON.stringify(this.machiningTableBody.rowsData))//可遍历信息
                    fd.append("machiningTableFooter",JSON.stringify(this.machiningTableFooter))//尾部信息
                    if(typeof(this.machiningTableBody.fileOne) != 'string' && this.machiningTableBody.fileOne != ''){
                        fd.append('myfileone',this.machiningTableBody.fileOne)//装载图片一
                    }
                    
                    axios.post(`${this.baseURL}/basicdata/maching.php`,fd)
                    .then((response) => {
                        if(response.data.state == "success"){
                            this.$message({
                                showClose: true,
                                message: '更改成功',
                                type: 'success'
                            })
                        }else{                            
                            this.$message({
                                showClose: true,
                                message: '更改失败',
                                type: 'error'
                            })
                        }
                        this.$emit("refreshTable",this.selectedTreeNode)
                        this.MachiningVisible = false          
                    })
                    .catch(function (error){
                        console.log(error)
                    })
                    return
                
            }else{//新建保存
                fd.append("flag","machingInserData")
                fd.append("treeId",this.selectedTreeNode.relateId)//选中树的id
                fd.append("machiningTableHeader",JSON.stringify(this.machiningTableHeader))//头部信息
                fd.append("machiningTableBody",JSON.stringify(this.machiningTableBody.rowsData))//可遍历信息
                fd.append("machiningTableFooter",JSON.stringify(this.machiningTableFooter))//尾部信息
                fd.append('myfileone',this.machiningTableBody.fileOne)//装载图片一
                
                axios.post(`${this.baseURL}/basicdata/maching.php`,fd)
                .then((response) => {
                    console.log(response)
                    if(response.data.state == "success"){
                        this.$message({
                            showClose: true,
                            message: '新建成功',
                            type: 'success'
                        })
                    }else{                            
                        this.$message({
                            showClose: true,
                            message: '新建失败',
                            type: 'error'
                        })
                    }
                    
                    this.$emit("refreshTable",this.selectedTreeNode)
                    this.MachiningVisible = false          
                })
                .catch(function (error){
                    console.log(error)
                })
                return
                
            } 
        },
        //查看及编辑焊接信息
        Handlealter(contactId,selectedTreeNode){
            this.selectedTreeNode = selectedTreeNode
            axios.get(`${this.baseURL}/basicdata/maching.php?flag=getMachiningInfoData&contactID=${contactId}`)
            .then((response) => {     
                if(response.data.state == "success"){
                    this.MachiningVisible = true
                    this.machiningTableHeader = response.data.data.machiningTableHeader
                    this.machiningTableFooter = response.data.data.machiningTableFooter    
                    this.machiningTableBody = response.data.data.machiningTableBody          
                                            
                    //显示图片
                    if(this.machiningTableBody.fileOne){//图片一
                        let imgsrc = `${this.baseURL}`+'/'+this.machiningTableBody.fileOne
                        this.machiningTableBody.imgHtmlOne = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                    }          
                }
            })
            .catch(function(error){
                console.log(error)
            })          
        }
    }
}
</script>

<style scoped>
input {
    border: none;
    height: 30px;
    width: 100%;
}
  .tableOne,.tableTwo,.tableThree,.tableFour,.machiningTableHeader,.craftsmanshipTableBody_1,.machiningTableFooter{
    border-collapse: collapse;
    text-align: center;
    width: 100%;
  }
  .tableOne tr,td,th,.tableTwo tr,td,th,.tableThree tr,td,th,.tableFour tr,td,th,.machiningTableHeader tr,td,th,.craftsmanshipTableBody_1 tr,td,th,.machiningTableFooter tr,td,th{
    border: 1px solid black;
    padding: 2px;
  }
  .machiningTableBody{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }
  .machiningTableBody tr,td,th{
    border: 1px solid black;
    padding: 2px;
  }
  .craftsmanshipTableBody_3{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    height: 500px;
  }
  .machiningTableBody_1_img{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    height: 350px;
  }
  .weldingsequence{
    height: 25px;
    width: 10%
  }
  .tableFour{
    width: 100%;
    height: 500px;
  }
  .machiningTableBody_2_img{
    width: 33%;
    height: 500px;
  }
  .serialNumber{
    width: 50px;
  }
</style>
