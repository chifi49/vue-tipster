<template>
    <div id="app" style="min-height:400px">
        <table width="100%" height="100%" style="min-height:100%" cellpadding="5" border="0" >
            <tr valign="top">
                <td>
                    <vuepopper title="persist on me!" content="mouse hover me and i won't hide" :keep_on_over="popup_keep_on_over">
                        <button >hover with persistence</button>
                    </vuepopper>
                </td>

                <td>
                    <br /><br /><br />
                    <vuepopper title="simple" :content="popup_content">
                        <button >i have a tooltip</button>
                    </vuepopper>
                </td>
                <td>
                    <vuepopper ref="manual_popper" :title="popup_title" :content="popup_content_html" :manual="popup_manual">
                        <button >manual - someone else controls me</button>
                    </vuepopper>
                    &nbsp;
                    <button @click="$refs['manual_popper'].show()">show</button>
                    &nbsp;
                    <button @click="$refs['manual_popper'].hide()">hide</button>
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
                <td>
                    </td>
            </tr>
            <tr valign="bottom">
                <td>
                        <br /><br /><br /><br /><br /><br />
                    <vuepopper :title="popup_title" :content="popup_content">
                        <button name="hithere">i have a tooltip</button>
                    </vuepopper>
                </td>
                <td>
                    <button id="target_button">with target</button>

                    <vuepopper ref="popup-program" :title="popup_title" :content="popup_content_html" target="#target_button"></vuepopper>
                    &nbsp;
                    <button @click="showPopup">show</button>
                    &nbsp;
                    <button @click="hidePopup">hide</button>
                </td>
                <td>
                    <button id="target_button1" >1st target</button>    
                    &nbsp;
                    <button @click="popup_target='#target_button1'">choose me</button>
                    <br /><br />
                    <button id="target_button2" >2nd target</button>    
                    &nbsp;
                    <button @click="popup_target='#target_button2'">choose me</button>

                    <vuepopper :target="popup_target" title="dynamic" content="i change buttons as i wish"></vuepopper>
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
            popup_keep_on_over:true,
            popup_manual:true,
            popup_target:'#target_button1',
            popup_title:"ninja title",
            popup_content:"i am the popup content",
            popup_content_html:"<h3>i have <strong>html</strong> very very <i>strong</i><br/>Let's what we are going to do</h3>"
        }
    },
    methods:{
        showPopup(){
            this.$refs['popup-program'].show();
        },
        hidePopup(){
            this.$refs['popup-program'].hide();
        }
    },
    mounted(){

    }
}
</script>
<style >
h1, h2, h3{
    margin:0;padding:0;
}
</style>