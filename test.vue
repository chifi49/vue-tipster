<template>
    <div id="app" style="position:absolute;top:0px;bottom:0px;right:0px;left:0px;">
        <table width="100%" height="100%" cellpadding="5" border="0" >
            <tr valign="top">
                <td>
        <vuepopper :title="popup_title" :content="popup_content">
            <button name="hithere">i have a tooltip</button>
        </vuepopper>
                </td>
                <td>
                    <vuepopper :title="popup_title" :content="popup_content">
            <button name="hithere">i have a tooltip</button>
        </vuepopper>
                    </td>
            </tr>
            <tr valign="middle">
                <td>
<vuepopper :title="popup_title" :content="popup_content">
            <button name="hithere">i have a tooltip</button>
        </vuepopper>
                </td>
                <td>

                </td>
            </tr>
            <tr valign="bottom">
                    <td>
<vuepopper :title="popup_title" :content="popup_content">
            <button name="hithere">i have a tooltip</button>
        </vuepopper>
                </td>
                <td>

                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import vuepopper from './vue-popper.vue'
export default{
    components:{
        'vuepopper':vuepopper
    },
    data(){
        return {
            popup_title:"ninja title",
            popup_content:"i am the popup content"
        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>