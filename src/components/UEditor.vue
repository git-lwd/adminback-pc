<template>
    <div class="ueditor">

        <script id="editor" type="text/plain" ></script>
        <el-dialog
                :append-to-body="true"
                title="图片上传"
                :visible.sync="showUploadDialog"
                width="30%"
                @close="handleClose"
        >
            <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

        </el-dialog>
    </div>
</template>
<script>

    import '../../public/UEditor/themes/default/css/ueditor.css'
    import  '../../public/UEditor/ueditor.config'
    import  '../../public/UEditor/ueditor.all'
    import  '../../public/UEditor/lang/zh-cn/zh-cn'
    import  '../../public/UEditor/ueditor.parse'

    export default {
        name:'Ueditor',
        data:function () {
            return{
                editor:'',
                content:'',
                showUploadDialog:false,
                uploadUrl:"",
                uploadData:"",
            }
        },
        props: {
            config: {
                type: Object,
                default:function () {
                    return  {
                        initialFrameWidth: null,
                        initialFrameHeight: 350,
                        lang:"zh-cn"
                    }
                }
            },
            value:String

        },
        watch:{
            value:function(new_content) {
                if(new_content!=this.content){
                    this.editor.setContent(this.value);
                }
            }
        },
        created(){
            this.uploadUrl=this.$APIURL.upload;
            // this.uploadData=this.$common.uploadPhotoData;
        },
        mounted:function () {
            var _this=this
            this.editor=UE.getEditor("editor",this.config)
            this.editor.addListener("ready", ()=>{
                this.editor.setContent(this.value); // 确保UE加载完成后，放入内容。
                this.editor.addListener("contentChange",()=>{
                    this.content=this.editor.getContent()
                    this.$emit('input', this.content)
                })
            });

            // document.querySelector('.edui-for-testt').onclick=function () {
            //     _this.showUploadDialog=true
            // }
        },
        methods: {
            getUEContent:function() {
                return this.editor.getContent()
            },
            setUEContent:function (val) {
                this.editor.setContent(val)
            },
            handleClose(){
                this.showUploadDialog=false
            },
            beforeAvatarUpload(file){},
            handleAvatarSuccess(res, file){
                if(res.code==0){
                    this.editor.setContent(this.editor.getContent()+"<img src=\""+res.data.absoluteUrl+"\">")
                    this.showUploadDialog=false
                }else {
                    this.$respone.error(this.$respone.catchMsg)
                }
            }

        },
        destroyed: function() {
            this.editor.destroy();
        },
    }
</script>
<style lang="scss" scoped>
    /deep/.el-form-item__content{
        line-height: 0 !important;
    }
</style>
